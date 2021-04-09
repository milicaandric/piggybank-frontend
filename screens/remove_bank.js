/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: add_bank.js. This screen is for removing a bank account to the customer account. Restricted access
 *                    if the customer doesn't have a bank to remove.
 */
import React from 'react';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { Button, Text } from 'galio-framework';
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from '@react-navigation/drawer';
 
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
 } from "react-native";
 
 const styles = require('../styles/global');
 const Drawer = createDrawerNavigator();

 //This is the main funciton, which takes route and navigation. Allows the past screen to send session cookie
export default function removeBank({ route, navigation }) {
  
  const {session_cookie} = route.params;
  
  function navToSettings(){
    navigation.navigate("Settings_Customer", {
      session_cookie: session_cookie
    });
  }

  // this function is called when the user presses submit
  function removeBankAccount() {
    let user = firebase.auth().currentUser; // retrieves current user 
    let email = user.email; // sets email var to user's email for 'update' api call
    console.log(email);
      // removes bank via http request to bankend
      fetch("http://192.168.99.173:8080/api/v1/bank/remove?email=" + email, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': session_cookie // used to identify user session
        },
      })
      .then(response => {
        if(response.ok == true){
          //success, nav back to settings
          navigation.navigate("Settings_Customer", {
            session_cookie: session_cookie
          });
        }
        else{
          throw Error("Failed to remove bank account");
        }
      })
      .catch(error=>{
        console.log(error.toString());
      });
  }

  //UI
    return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => navToSettings()}>
        <Image style={styles.backButtonRemoveBank} source={require("../assets/backArrow.png")} />
      </TouchableOpacity>
      <View>
        <Text style={styles.signupHeader}>Remove Your Bank Account</Text>
      </View>
      <Button style={{ marginBottom: 200 }} color="#23cc8c"
        onPress={() => removeBankAccount()}>
        <Text>Remove</Text>
      </Button>
    </KeyboardAvoidingView>
  );
}