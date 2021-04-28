/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: update_username.js. This screen is for changing the username for an account.
 * User enters new username into text field
 * Checks that the username doesn't already exist
 */
import React, { useState, useEffect, Component } from 'react';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { Button, Text, Input} from 'galio-framework';
import { StatusBar } from "expo-status-bar";

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
  TextInput,
  KeyboardAvoidingView,
  ScrollView, Alert
} from "react-native";

const styles = require('../styles/global');

export function Transaction(props) {
    return (
        <View style={styles.aboutText}>
            <Text>{props.transactor} {props.recipient} ${props.amount}</Text>
        </View>
    )
}

export default function pastTransactions({route, navigation}) {
    //states here
    const { session_cookie } = route.params;
    var currentUser = firebase.auth().currentUser;
    var emailVar = currentUser.email;
    const [transactionList, setTransactionList] = useState([]);
    //const [username, setUsername] = useState("");

    /*
   function used to navigate back to the settings page
   using the type of account to determine if customer or merchant settings page
   */
    function navToMenu() {
        fetch("http://192.168.99.181:8080/api/v1/account/get?email="+emailVar,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Cookie': session_cookie // used to identify user session
            },
        })
        .then(response=>response.json())
        .then(data=>{ 
            if (data.type == "CUSTOMER") {
                navigation.navigate("User_Dash", {
                session_cookie: session_cookie
                });
            } else if (data.type == "MERCHANT") {
                navigation.navigate("Merchant_Dash", {
                session_cookie: session_cookie
                });
            }
        })
        .catch((error) => console.log(error));
    }

    function getPastTransactions() {
        fetch("http://192.168.99.181:8080/api/v1/transaction/getAllFromUser?email="+emailVar, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              'Cookie': session_cookie // used to identify user session
            },
        })
        .then(response=>response.json())
        .then(data=>{
                 for (var transaction in data){
                    var t = {
                        amount: data[transaction].amount,
                        recipient: data[transaction].recipientEmail,
                        transactor: data[transaction].transactorEmail,
                        id: data[transaction].id
                    };
                    if (t.recipient == null) {
                        t.recipient = "BANK"
                    }
                    setTransactionList(transactionList => 
                        [...transactionList, <Transaction transactor={t.transactor} recipient={t.recipient} amount={t.amount/100} key={t.id}/>])
                 }
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {getPastTransactions()}, []);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <StatusBar style="auto" />
          <TouchableOpacity onPress={() => navToMenu()}>
            <Image style={styles.backButton} source={require("../assets/backArrow.png")} />
          </TouchableOpacity>
          <View>
            <Text style={styles.signupHeader}>Past Transactions</Text>
            <Text style={styles.aboutText}>User     Recipient   Amount</Text>
          </View>
          <ScrollView>
            {transactionList}
          </ScrollView>
        </KeyboardAvoidingView>
    );

}