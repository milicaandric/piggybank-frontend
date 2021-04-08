/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: add_bank: this file is used by the customer when they want to add a bank account.
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
 
 export default function addBank({ route, navigation }) {
   const [routingNumber, setRountingNumber] = useState("");
   const [accountNumber, setAccountNumber] = useState("");
   const [nameOnAccount, setNameOnAccount] = useState("");
 
   const { session_cookie } = route.params;

   function navToMenu(){
    navigation.navigate("User_Dash", {
        session_cookie: session_cookie
      });
   }
 
   function addBankAccount(routingNumber, accountNumber, nameOnAccount) {
     // first check that user has filled out all neccessary fields
     if (routingNumber != undefined && routingNumber != "" && accountNumber != undefined && accountNumber != "" && nameOnAccount != undefined && nameOnAccount != "") {
       let user = firebase.auth().currentUser; // retrieves current user 
       let email = user.email; // sets email var to user's email
       let data = {
         bankAccount:{
           nameOnAccount: nameOnAccount,
           accountNumber: accountNumber,
           routingNumber: routingNumber
         },
       };
       fetch("http://192.168.1.3:8080/api/v1/bank/update?email="+email, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           'Cookie': session_cookie
         },
         body: JSON.stringify(data),
       }).then(response=>{
         if(response.ok == true){
           navigation.navigate("User_Dash", {
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
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <StatusBar style="auto" />
          <TouchableOpacity onPress={() => navToMenu()}>
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
                placeholder="Bank Account Number"
                onChangeText={(accountNumber) => setAccountNumber({ accountNumber })}
              />
            </View>
            <View style={{ paddingBottom: 25 }}>
              <Input style={{ borderRadius: 30, height: 50, padding: 10 }}
                placeholder="Name on account"
                onChangeText={(nameOnAccount) => setNameOnAccount({ nameOnAccount })}
              />
            </View>
          </ScrollView>
          <Button style={{marginBottom: 30}} color ="#23cc8c" 
            onPress={() => addBankAccount(routingNumber.routingNumber, accountNumber.accountNumber, nameOnAccount.nameOnAccount)}>
            <Text>Add</Text>
          </Button>
        </KeyboardAvoidingView>
    );
 }