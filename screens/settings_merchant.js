/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: signup_customer.js. This screen is for signing up a new customer. Fields to enter are email,
 * username, password, verify password. Username is checked for existing username before creating account.
 */
 import React, { useState } from 'react';
 import { StatusBar } from "expo-status-bar";
 import 'react-native-gesture-handler';
 import * as firebase from 'firebase';   
 import { Button, Text, Input} from 'galio-framework';
 import { LinearGradient } from 'expo-linear-gradient';
 
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
 
 export default function settingsCustomer({ route, navigation }) {
   const { session_cookie } = route.params;
   let user = firebase.auth().currentUser; // retrieves current user 
   let email = user.email; // sets email var to user's email for 'update' api call
 
   //function called when the user presses the backarrow. Takes user back to login
   function navToMenu() {
        navigation.navigate("User_Dash", {
            session_cookie: session_cookie
        });
   }

   function navToAbout(){

   }

   function navToSwapBank(){
        navigation.navigate("Swap_Bank", {
            session_cookie: session_cookie
        });
    }

   function navToPrivacy(){

   }

   function navToEditAccount(){

   }
 
   
   // user interface
   return (
     <View style={styles.settings}>
        <TouchableOpacity onPress={() => navToMenu()}>
            <Image style={styles.backButtonSettings} source={require("../assets/backArrow.png")} />
        </TouchableOpacity>
        <Text style={styles.settingsHeader}>Settings</Text>
        <View style={styles.allSettingsContentButtons}>
            <View style={{
                marginLeft: -20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
            }}
            />
            <TouchableOpacity style={styles.settingsContentButtons} onPress={() => navToEditAccount()}>
                <Text style={styles.settingsContentButtonsText}>Edit Account</Text>
            </TouchableOpacity>
            <View style={{
                marginLeft: -20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
            }}
            />
            <TouchableOpacity style={styles.settingsContentButtons} onPress={() => navToPrivacy()}>
                <Text style={styles.settingsContentButtonsText}>Privacy</Text>
            </TouchableOpacity>
            <View style={{
                marginLeft: -20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
            }}
            />
            <TouchableOpacity style={styles.settingsContentButtons} onPress={() => navToSwapBank()}>
                <Text style={styles.settingsContentButtonsText}>Swap Bank</Text>
            </TouchableOpacity>
            <View style={{
                marginLeft: -20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
            }}
            />
            <TouchableOpacity style={styles.settingsContentButtons} onPress={() => navToAbout()}>
                <Text style={styles.settingsContentButtonsText}>About</Text>
            </TouchableOpacity>
            <View style={{
                marginLeft: -20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
            }}
            />
        </View>
    </View>
   )
 }