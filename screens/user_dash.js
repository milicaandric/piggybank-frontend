/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: user_dash.js. This screen is for checking balance, navigating to other menus via the side menu or setting button,
 * and transfering money to other users.
 */

 import React, { useState, useEffect, Component } from 'react';
 import 'react-native-gesture-handler';
 import * as firebase from 'firebase';
 import { Text, Input } from 'galio-framework';
 import { createDrawerNavigator} from '@react-navigation/drawer';
 import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
 import SideMenu from 'react-native-side-menu-updated'
 
 const firebaseConfig = {
   apiKey: "AIzaSyAg-KUJ--2nDiMDJnzSt_sNYO8y_eZI5Bo",
   authDomain: "piggybank-104d3.firebaseapp.com",
   projectId: "piggybank-104d3",
   storageBucket: "piggybank-104d3.appspot.com",
 };
 if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
 }
 else {
   firebase.app();
 }
 import {
   View,
   TouchableOpacity,
   KeyboardAvoidingView,
   TextInput,
   Keyboard,
   TouchableWithoutFeedback
 } from "react-native";
 
 const styles = require('../styles/global');
 
 export class Outer extends Component{
     
     constructor(props) {
       super(props);
     
       this.toggle = this.toggle.bind(this);
     
       this.state = {
         isOpen: false,
         selectedItem: 'About',
       };
     }
     
     toggle() {
       this.setState({
         isOpen: !this.state.isOpen,
       });
     }
     
     updateMenuState(isOpen) {
       this.setState({ isOpen });
     }
     onMenuItemSelected = item =>
     this.setState({
       isOpen: false,
       selectedItem: item,
     });
     
 
     render(){
         const menu = <Menu onItemSelected={this.onMenuItemSelected} balance={this.props.balance} cookie={this.props.cookie} username={this.props.username} navigation={this.props.navigation}/>
         return(
             <SideMenu menu={menu}
             isOpen={this.state.isOpen}
             onChange={(isOpen) => this.updateMenuState(isOpen)}>
                 <KeyboardAvoidingView style={styles.container}>
                     <View style={styles.pageBack}>
                         <TouchableOpacity style={styles.topLeft} onPress={() => {this.toggle()}}>
                                 <FontAwesomeIcon icon="bars" size={32}/>
                         </TouchableOpacity>
                         <Balance balance= {this.props.balance} cookie={this.props.cookie} navigation={this.props.navigation}/>
                     </View>
                 </KeyboardAvoidingView>
             </SideMenu>
         );
     }
 }
 
 function navToSettings(props){
   props.navigation.navigate("Settings_Customer", {
       session_cookie: props.cookie
   });
 }
 
 function sendToCustomer(recip, amount, session_cookie, balance, navigation){
   let user = firebase.auth().currentUser; // retrieves current user 
   let email = user.email; // sets email var to user's email for 'update' api call
   if(amount == 0 || recip == '' || amount == undefined){
     alert("please fill out recipient and amount");
   }
   else if(recip == email){
     alert("You cannot send money to yourself");
   }
   else{
     if(Number(amount) > 0 && amount <= balance){
       if(countDecimals(amount) <= 2){
           let data = {
               transactorEmail: email,
               recipientEmail: recip,
               amount: Number(amount) * 100.00,
               type: 'PEER_TO_PEER'
           };
           console.log(JSON.stringify(data));
           fetch("http://192.168.99.181:8080/api/v1/transaction/peer",{
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'Cookie': session_cookie // used to identify user session
           },
           body: JSON.stringify(data)
           })
           .then(response=>{
               if(response.ok == true){
                 alert("Transaction Successful");
                 navigation.navigate("User_Dash", {
                   session_cookie: session_cookie,
                   new_balance: (Number(balance)-Number(amount))*100
               });
               }
               else if(response.status == 400){
                 alert("No email was found for the recipient");
               }
           })
           .catch((error) =>{
               console.log(error.toString());
           });
       }
    }
   }
 }
 
 //https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
 function countDecimals(number) {
     if(number == undefined) return 0;
     if(Math.floor(Number(number)) === Number(number)) return 0;
     return String(number).split(".")[1].length || 0; 
 }
 function Balance(props){
     const [amount, setAmount] = useState(0);
     const [recip, setRecip] = useState("");
     return(
       <View>
         <View style={styles.mainCircle}>
           <Text style={styles.circleText}>
           {
             (props.balance == undefined)?props.balance: (props.balance == 0)?"$0.00":(countDecimals(amount.amount) > 2)?"$"+(Math.round((props.balance)*100)/100).toFixed(2): (props.balance - amount.amount <= 0)?("$0.00"): ((isNaN(props.balance - amount.amount))? "$"+String((Math.round((props.balance)*100)/100).toFixed(2)): "$"+String((Math.round((props.balance-amount.amount)*100)/100).toFixed(2)))
           }
           </Text>
         </View>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
         <View>
           <Text style={styles.dashText}>
               Current Balance
           </Text>
           <View style={styles.lowerHold}>
               <View>
               <TextInput style={styles.merchantDashTransfer}
                 placeholder="Recipient Email"
                 onChangeText={(recip) => setRecip({recip})}
               />
               <TextInput style={styles.merchantDashTransfer}
                   numeric
                   keyboardType={'numeric'}
                   placeholder="Amount"
                   onChangeText={(amount) => setAmount({ amount })}
               />
               {
                   (amount.amount > props.balance)?<Text style={{color: 'red'}}>You have exceeded your balance</Text>: ((isNaN(amount.amount) && amount != 0) || ( countDecimals(amount.amount) > 2))?<Text style={{color: 'red'}}>Invalid Amount</Text>:null
               }
               </View>
               <TouchableOpacity style={styles.sendButton} onPress={() => sendToCustomer(recip.recip, amount.amount, props.cookie, props.balance, props.navigation)}>
                   <Text style={styles.sendText}>
                       Send
                   </Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navToSettings(props)}>
                   <View style={styles.bottomRight}>
                       <FontAwesomeIcon icon="cog" size={32}/>
                   </View>
               </TouchableOpacity>
           </View>
         </View>
         </TouchableWithoutFeedback>
       </View>
     );
 }
 
 function Balance2(props){
     const [amount, setAmount] = useState(0);
     return(
         <Text style={styles.sideMenuText}>
           {
             (props.balance == undefined)?props.balance: (props.balance == 0)?"$0.00":(props.balance - amount.amount <= 0)?("$0.00"): ((isNaN(props.balance - amount.amount))? "$"+String((Math.round((props.balance)*100)/100).toFixed(2)): "$"+String((Math.round((props.balance-amount.amount)*100)/100).toFixed(2)))
           }
         </Text>
     );
 }
 
 function Menu(props){
     let user = firebase.auth().currentUser; // retrieves current user 
     let email = user.email; // sets email var to user's email for 'update' api call
     const [username, setUsername] = useState("");
     function navToTransfer(){
       fetch("http://192.168.99.181:8080/api/v1/bank/get?email="+email,{
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
             'Cookie': props.cookie // used to identify user session
       },
       })
       .then(response=>response.json())
       .then(data=>{
         props.navigation.navigate("Transfer_To_Bank", {
           session_cookie: props.cookie
         });
       })
       .catch((error) =>{
           //no bank found. Do not proceed
           alert("You do not have a bank to transfer to");
       });
     }

     function navToTransactions() {
      props.navigation.navigate("Past_Transactions", {
        session_cookie: props.cookie
      });
    }
     return(
         <View style={styles.sideBack}>
             <View style={{marginTop: 40}}/>
             <View style={styles.sideMenuFields}>
                 <Text style={styles.sideMenuText}>
                     {props.username}
                 </Text>
             </View>
             <View style={styles.sideMenuFields}>
                 <Balance2 balance={props.balance} cookie={props.cookie}/>
             </View>
             <TouchableOpacity style={styles.sendButton} onPress={()=>{navToTransfer()}}>
                 <Text style={styles.sendText}>
                     Transfer
                 </Text>
             </TouchableOpacity>
             <View style={styles.lineBreak}/>
             <TouchableOpacity style={styles.sendButton} onPress={()=>{navToTransactions()}}>
                 <Text style={styles.sendText}>
                     Transactions
                 </Text>
             </TouchableOpacity>
         </View>
     );
 }
 
 export default function User_Dash({route, navigation}) {
   const {session_cookie, new_balance, newUsername} = route.params;
   console.log("New Balance: " + new_balance);
   console.log("New Username: "+ newUsername);
   const [balance, setBalance] = useState();
   const [username, setUsername] = useState("");
   let user = firebase.auth().currentUser;
   let email = user.email;
   useEffect(() => {
       fetch("http://192.168.99.181:8080/api/v1/account/get?email="+email,{
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'Cookie': session_cookie // used to identify user session
       },
      })
      .then(response=>response.json())
      .then(data=>{
         setBalance(data.balance/100);
         setUsername(data.username);
      });
   }, []);
 
   //const navigation = useNavigation();
   // loginUser wrapper class placeholder
   // firebase auth
   
   return (
     <Outer cookie={session_cookie} balance={(new_balance != undefined)?new_balance/100: balance}  username={(newUsername != undefined)?newUsername: username} navigation = {navigation}/>
   );
 }