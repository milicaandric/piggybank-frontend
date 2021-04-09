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
    
    navToSettings(props){
      props.navigation.navigate("Settings_Customer", {
          session_cookie: this.props.cookie
      });
    }

    render(){
        const menu = <Menu onItemSelected={this.onMenuItemSelected} cookie={this.props.cookie} navigation={this.props.navigation}/>
        return(
            <SideMenu menu={menu}
            isOpen={this.state.isOpen}
            onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.pageBack}>
                        <TouchableOpacity style={styles.topLeft} onPress={() => {this.toggle()}}>
                                <FontAwesomeIcon icon="bars" size={32}/>
                        </TouchableOpacity>
                        <View style={styles.mainCircle}>
                            <Balance cookie={this.props.cookie}/>
                        </View>
                        <Text style={styles.dashText}>
                            Current Balance
                        </Text>
                        <View style={styles.lowerHold}>
                            <View>
                                <Input style={styles.genInput}
                                    placeholder="Recipient"
                                />
                                <Input style={styles.genInput}
                                    placeholder="Amount"
                                />
                            </View>
                            <TouchableOpacity style={styles.sendButton}>
                                <Text style={styles.sendText}>
                                    Send
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.lineBreak}/>
                            <TouchableOpacity style={styles.sendButton} onPress={() => {this.toggle()}}>
                                <Text style={styles.sendText}>
                                    Transactions
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.navToSettings(this.props)}}>
                                <View style={styles.bottomRight}>
                                    <FontAwesomeIcon icon="cog" size={32}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SideMenu>
        );
    }
}
  
function Balance(props){
    const [balance, setBalance] = useState();
    const [amount, setAmount] = useState(0);
    let user = firebase.auth().currentUser;
    let email = user.email;
    
    useEffect(() => {
        fetch("http://192.168.1.3:8080/api/v1/account/get?email="+email,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': props.cookie // used to identify user session
        },
       })
       .then(response=>response.json())
       .then(data=>{
           setBalance(data.balance);
       });
    }, []);
    return(
        <Text style={styles.circleText}>
          {
            (balance == undefined)?balance:(balance - amount.amount <= 0)?("$0.00"): ((isNaN(balance - amount.amount))? "$"+String(balance/100.0): "$"+String((balance-amount.amount)/100.0))
          }
        </Text>
    );
}

function Balance2(props){
    const [balance, setBalance] = useState();
    const [amount, setAmount] = useState(0);
    let user = firebase.auth().currentUser;
    let email = user.email;
    
    useEffect(() => {
        fetch("http://192.168.1.3:8080/api/v1/account/get?email="+email,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': props.cookie // used to identify user session
        },
       })
       .then(response=>response.json())
       .then(data=>{
           setBalance(data.balance);
       });
    }, []);
    return(
        <Text style={styles.sideMenuText}>
          {
            (balance == undefined)?balance:(balance - amount.amount <= 0)?("$0.00"): ((isNaN(balance - amount.amount))? "$"+String(balance/100.0): "$"+String((balance-amount.amount)/100.0))
          }
        </Text>
    );
}

function Menu(props){
    function navToTransfer(){
      props.navigation.navigate("Transfer_To_Bank", {
        session_cookie: props.cookie
      });
    }
    return(
        <View style={styles.sideBack}>
            <View style={{marginTop: 25}}/>
            <View style={styles.mainCircle}>
                <Text style={styles.circleText}>
                    Profile Pic
                </Text>
            </View>
            <View style={styles.sideMenuFields}>
                <Text style={styles.sideMenuText}>
                    Username
                </Text>
            </View>
            <View style={styles.sideMenuFields}>
                <Balance2 cookie={props.cookie}/>
            </View>
            <TouchableOpacity style={styles.sendButton} onPress={()=>{navToTransfer()}}>
                <Text style={styles.sendText}>
                    Transfer
                </Text>
            </TouchableOpacity>
            <View style={styles.lineBreak}/>
            <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendText}>
                    Transactions
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default function User_Dash({route, navigation}) {
  const {session_cookie} = route.params;

  //const navigation = useNavigation();
  // loginUser wrapper class placeholder
  // firebase auth
  
  return (
    <Outer cookie={session_cookie} navigation = {navigation}/>
  );
}