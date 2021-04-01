/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: add_bank.js. This screen allows a customer to add a bank to their account.
 */
import React, { useState, Component } from 'react';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import SideMenu from 'react-native-side-menu-updated'

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

// TODO: 
// 1.) eventually add nav to new screen upon successful addiiton of bank
export default function addBank({ route, navigation }) {
  const [routingNumber, setRountingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // TODO:
  // 1.) undefined is not an object -> evaluating route.params.session_cookie
  // 2.) testing
  const { session_cookie } = route.params;
  console.log(session_cookie);

  // this function is called when the user presses "add"
  // @param routingNumber, accountNumber
  // TODO:
  // 1.) retrieve cookie session id via route.params -- cannot recognize params 
  // 2.) testing
  function addBankAccount(routingNumber, accountNumber) {
    // first check that user has filled out all neccessary fields
    if (routingNumber != undefined && routingNumber != "" && accountNumber != undefined && accountNumber != "") {
      let user = firebase.auth().currentUser; // retrieves current user 
      let email = user.email; // sets email var to user's email
      user.getIdToken(true).then(token => {
        let data = {
          //username: null,
          //password: null,
          //email: email,
          routingNumber: routingNumber,
          accountNumber: accountNumber,
          //type: "CUSTOMER"
        };
        // returns account object associated with email
        fetch("http://192.168.4.34:8080/api/v1/account/get?email=" + email, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': session_cookie
          },
        })
          .then(response => {
            var account = response.headers.map['account'];
            //console.log(account);
            fetch("http://192.168.4.34:8080/api/v1/account/update?token=" + token, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Cookie': session_cookie // used to identify user session
              },
              body: JSON.stringify(data),
            })
              .then(response => response.json())
          })
      }
      )
    }
    else {
      // user did not fill out all fields
      alert("Please fill out all fields.");
    }
  }

  // user interface
  // TODO : 
  // 1) check add button functionality
  // 2) have back button nav to settings screen (when settings screen is made)
  //      - navToSettings function does not exist yet for back arrow
  // 3) handler for if bank account is already active (nav to new screen for that)
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => navToSettings()}>
        <Image style={styles.backButton} source={require("../assets/backArrow.png")} />
      </TouchableOpacity>
      <View>
        <Text style={styles.signupHeader}>Add Bank</Text>
      </View>
      <ScrollView>
        <View style={{ paddingBottom: 25 }}>
          <Input style={{ borderRadius: 30, height: 50, padding: 10 }}
            placeholder="Bank Routing Number"
            onChangeText={(routingNumber) => setRountingNumber({ routingNumber })}
          />
        </View>
        <View style={{ paddingBottom: 25 }}>
          <Input style={{ borderRadius: 30, height: 50, padding: 10 }}
            placeholder="Name on Account"
            secureTextEntry={true}
            onChangeText={(accountNumber) => setAccountNumber({ accountNumber })}
          />
        </View>
      </ScrollView>
      <Button style={{ marginBottom: 200 }} color="#23cc8c"
        onPress={() => addBankAccount(routingNumber.routingNumber, accountNumber.accountNumber)}>
        <Text>Add</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}