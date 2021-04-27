/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: swap_bank: Allows merchant account to swap a bank account out. Basically add/remove at the same time
 *                  since the merchant must have an account linked at all times
 */
 import React, { useState } from 'react';
 import 'react-native-gesture-handler';
 import * as firebase from 'firebase';
 import { Button, Text, Input} from 'galio-framework';
 import { StatusBar } from "expo-status-bar";
 import { createDrawerNavigator} from '@react-navigation/drawer';
 
 const firebaseConfig = {
   apiKey: "AIzaSyAg-KUJ--2nDiMDJnzSt_sNYO8y_eZI5Bo",
   authDomain: "piggybank-104d3.firebaseapp.com",
   databaseURL: "https://piggybank-104d3-default-rtdb.firebaseio.com",
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
   Image,
   TouchableOpacity,
   KeyboardAvoidingView,
   ScrollView
 } from "react-native";
 
 const styles = require('../styles/global');
 const Drawer = createDrawerNavigator();
 
  //This is the main funciton, which takes route and navigation. Allows the past screen to send session cookie
 export default function SwapBank({ route, navigation }) {
   const [routingNumber, setRountingNumber] = useState("");
   const [accountNumber, setAccountNumber] = useState("");
   const [nameOnAccount, setNameOnAccount] = useState("");
 
   const { session_cookie } = route.params;
 
   function navToSettings(){
     navigation.navigate("Settings_Merchant", {
       session_cookie: session_cookie
     });
   }
 
   //function is entered when the user presses submit
   //@param routingNumber, accountNumber, nameOnAccount
   function swapBankAccount(routingNumber, accountNumber, nameOnAccount) {
     // first check that user has filled out all neccessary fields
     if (routingNumber != undefined && routingNumber != "" && accountNumber != undefined && accountNumber != "" && nameOnAccount != undefined && nameOnAccount != "") {
       routingNumber = Number(routingNumber);
       accountNumber = Number(accountNumber);
       let user = firebase.auth().currentUser; // retrieves current user 
       let email = user.email; // sets email var to user's email
       let data = {
         nameOnAccount: nameOnAccount,
         accountNumber: accountNumber,
         routingNumber: routingNumber
       };
       //backend HTTP request to update the bank account
       fetch("http://192.168.1.95:8080/api/v1/bank/update?email="+email, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           'Cookie': session_cookie
         },
         body: JSON.stringify(data),
       }).then(response=>{
         if(response.ok == true){
           //success, send merchant to settings
           navigation.navigate("Settings_Merchant", {
             session_cookie: session_cookie
           });
         }
         else{
           throw Error("Authentication for adding the bank account is invalid");
         }
       })
       .catch((error)=>{
         console.log(error.toString());
       });
     }
     else {
       alert("Please fill out all fields.");
     }
   }
 
   //UI
   return (
     <KeyboardAvoidingView style={styles.container} behavior="padding">
       <StatusBar style="auto" />
       <TouchableOpacity onPress={() => navToSettings()}>
         <Image style={styles.backButton} source={require("../assets/backArrow.png")} />
       </TouchableOpacity>
       <View>
         <Text style={styles.signupHeader}>About</Text>
       </View>
       <ScrollView>
         <View style={{ paddingBottom: 25 }}>
             <Text style={styles.aboutText}>PiggyBank is an application that transforms the use of physical coins in retail transactions from merchant to customer. Customers will have the choice after a cash payment to either take the physical coins in change (if any), or get this balance added to their PiggyBank. There, the user may take action in peer-to-peer transactions, or transfer their balance to their optional linked bank account. The merchant will have the role of strictly making change transactions to the customer from their required linked bank account.</Text>
         </View>
         <View style={{ paddingBottom: 25 }}>
         </View>
         <View style={{ paddingBottom: 25 }}>
         </View>
       </ScrollView>
     </KeyboardAvoidingView>
   );
 }