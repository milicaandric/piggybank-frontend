/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: swap_bank: Allows merchant account to swap a bank account out. Basically add/remove at the same time
 *                  since the merchant must have an account linked at all times
 */
 import React from 'react';
 import 'react-native-gesture-handler';
 import * as firebase from 'firebase';
 import { Text } from 'galio-framework';
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
 
   const { session_cookie } = route.params;
 
   function navToSettings(){
    let user = firebase.auth().currentUser; // retrieves current user 
    let email = user.email; // sets email var to user's email for 'update' api call
    fetch("http://localhost:8080/api/v1/account/get?email="+email,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': session_cookie // used to identify user session
        },
        })
        .then(response=>response.json())
        .then(data=>{
        // if the user is a merchant, navigate to merchant settings
        if(data.type == "MERCHANT"){
        navigation.navigate("Settings_Merchant", {
            session_cookie: session_cookie
        });
        }
        // if the user is a customer, navigate to customer settings
        else if(data.type == "CUSTOMER"){
            navigation.navigate("Settings_Customer", {
            session_cookie: session_cookie
            });
        }
        })
        .catch((error)=>{
        // authentication failed to get type of user
        alert("Error: Account type not found.");
        console.log("Error: ", error);
      });
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
             <Text style={styles.aboutText}>PiggyBank is an application that transforms the use of physical coins in retail transactions from merchant to customer. Customers have the choice after a cash payment to either take the physical coins in change (if any), or get this balance added to their PiggyBank. There, the user can take action in peer-to-peer transactions, or transfer their balance to their optional linked bank account. The merchant will have the role of strictly making change transactions to the customer from their required linked bank account.</Text>
         </View>
         <View style={{ paddingBottom: 25 }}>
         </View>
         <View style={{ paddingBottom: 25 }}>
         </View>
       </ScrollView>
     </KeyboardAvoidingView>
   );
 }