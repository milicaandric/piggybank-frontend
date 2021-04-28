/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: merchant_dash.js. This screen allows a merchant to send change from a transaction to users.
 */
import React, { useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { Text, Input } from 'galio-framework';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

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
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  AppRegistry,
  Dimensions
} from "react-native";

const styles = require('../styles/global');

export default function Merchant_dash({route, navigation}) {
  const [amount, setAmount] = useState(0);
  const [recip, setRecip] = useState("");
  const {session_cookie} = route.params;
  let user = firebase.auth().currentUser; // retrieves current user 
  let email = user.email; // sets email var to user's email for 'update' api call

  function navToSettings(){
    navigation.navigate("Settings_Merchant", {
      session_cookie: session_cookie
    });
  }

  function navToTransactions() {
    navigation.navigate("Past_Transactions", {
      session_cookie: session_cookie
    });
  }

  //https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
  function countDecimals(number) {
    if(number == undefined) return 0;
    if(Math.floor(Number(number)) === Number(number)) return 0;
    return String(number).split(".")[1].length || 0; 
  }

  function sendToCustomer(recip, amount){
    if(amount == 0 || recip == '' || amount == undefined){
      alert("please fill out recipient and amount");
    }
    else if(recip.toLowerCase() == email){
      alert("You can not send money to yourself");
    }
    else{
      if(Number(amount) > 0){
        if(countDecimals(amount) <= 2){
            recip = recip.toLowerCase();
            fetch("http://192.168.99.181:8080/api/v1/account/get?email="+recip,{
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Cookie': session_cookie // used to identify user session
              },
            })
            .then(res=>res.json())
            .then(data=>{
              if(data.type == 'MERCHANT'){
                alert("You cannot send money to merchant accounts");
              }
              else{
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
                console.log(session_cookie);
                  console.log(JSON.stringify(response))
                  if(response.ok == true){
                    alert("transaction successful");
                  }
              })
              .catch((error) =>{
                  console.log(error.toString());
              });
              }
            })
            .catch((error)=>{
              alert("No account found with email specified");
            });
        }
    }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.pageBack}>
            <Text style={styles.dashText}>
                Merchant Account
            </Text>
            <View style={{marginBottom: 20}}/>
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
                      (amount.amount * 100 >= 100)?<Text style={{color: 'red'}}>You can only trasfer less than a dollar</Text>: ((isNaN(amount.amount) && amount != 0) || ( countDecimals(amount.amount) > 2))?<Text style={{color: 'red'}}>Invalid Amount</Text>:null
                    }
                </View>
                <TouchableOpacity style={styles.sendButton} onPress={() => sendToCustomer(recip.recip, amount.amount)}>
                    <Text style={styles.sendText}>
                        Send
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendButton} onPress={() => navToTransactions()}>
                    <Text style={styles.sendText}>
                        Past Transactions
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navToSettings()}}>
                  <View style={styles.bottomRight}>
                    <FontAwesomeIcon icon="cog" size={32}/>
                  </View>
                </TouchableOpacity>
            </View>
        </View>
    </KeyboardAvoidingView>
  );
}