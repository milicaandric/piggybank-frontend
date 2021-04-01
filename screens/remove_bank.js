/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: remove_bank.js. This screen allows a customer to remove a bank from their account.
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
   ScrollView,
 } from "react-native";
 
 const styles = require('../styles/global');
 const Drawer = createDrawerNavigator();

// TODO: 
// 1.) eventually add nav to new screen upon successful addiiton of bank
export default function removeBank({ route, navigation }) {
  const [routingNumber, setRountingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  
  // session cookie constant retrieval
  // TODO:
  // 1.) undefined is not an object -> evaluating route.params.session_cookie
  const {session_cookie} = route.params;
  console.log(session_cookie);
  //navigation = useNavigation();

  // this function is called when the user presses "add"
  // @param routingNumber, accountNumber
  // TODO:
  // 1.) retrieve cookie session id via route.params -- cannot recognize params 
  function removeBankAccount(routingNumber, accountNumber) {
    // first check that user has filled out all neccessary fields
    if (routingNumber != undefined && routingNumber != "" && accountNumber != undefined && accountNumber != "") {
      let user = firebase.auth().currentUser; // retrieves current user 
      let email = user.email; // sets email var to user's email for 'update' api call
      console.log(email);
        // data should contain all request body content (?)
        // setting data to null
        let data = {
          routingNumber: "",
          accountNumber: "",
        };
        // updates specific user information in firestore
        fetch("http://192.168.4.34:8080/api/v1/account/update?email=" + email + "&sessionCookieId=" + session_cookie, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })
        // firebase method to update user profile information (might only work with docs tho, so delete)
        user.updateProfile({
          accountNumber: accountNumber,
          routingNumber: routingNumber
        }).then(function () {
          console.log(routingNumber); // successfully prints info that is being passed 
          // if update is successful
        }).catch(function (error) {
          // if an error happened
        });
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
        <Text style={styles.signupHeader}>Remove Bank</Text>
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
        onPress={() => removeBankAccount(routingNumber.routingNumber, accountNumber.accountNumber)}>
        <Text>Remove</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}