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
 
 export default function updateUsername({route, navigation}) {
     //states here
     const { session_cookie } = route.params;
     var currentUser = firebase.auth().currentUser;
     var emailVar = currentUser.email;
     const [username, setUsername] = useState("");
 
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
                 navigation.navigate("Settings_Customer", {
                 session_cookie: session_cookie
                 });
             } else if (data.type == "MERCHANT") {
                 navigation.navigate("Settings_Merchant", {
                 session_cookie: session_cookie
                 });
             }
         })
         .catch((error) => console.log(error));
     }
 
    function update(username) {
        if(username != undefined && username != ""){
           fetch("http://192.168.99.181:8080/api/v1/account/usernameExists?username="+username,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Cookie': session_cookie // used to identify user session
              },
           })
           .then((res)=>res.json())
           .then((dataUsernameExists)=>{
               if(dataUsernameExists == true){
                   //throws error. username is already taken
                   throw Error("Username already exists");
                }
                var data = {
                    username: username
                };
                fetch("http://192.168.99.181:8080/api/v1/bank/update?email="+emailVar, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': session_cookie
                },
                body: JSON.stringify(data),//updates username in firestore
                }).then(response=>{
                  console.log(JSON.stringify(response));
                if(response.ok == true){
                    alert("Success: Username changed");
                    navToMenu();
                }
                else{
                    throw Error("Authentication for updating username unsuccessful");
                }
                })
                .catch((error)=>{
                    alert("Update username failed");
                    console.log(error.toString());
                });
           })
           //username exists already
           .catch((error)=>{
               console.log(error.toString());
               alert("Username already exists");
           });
        }
   }
 
     return (
         <KeyboardAvoidingView style={styles.container} behavior="padding">
           <StatusBar style="auto" />
           <TouchableOpacity onPress={() => navToMenu()}>
             <Image style={styles.backButton} source={require("../assets/backArrow.png")} />
           </TouchableOpacity>
           <View>
             <Text style={styles.signupHeader}>Update Username</Text>
           </View>
           <ScrollView>
             <View style={{ paddingBottom: 25 }}>
               <Input style={{ borderRadius: 30, height: 50, padding: 10 }}
                 placeholder="New Username"
                 onChangeText={(username) => setUsername({ username })}
               />
             </View>
           </ScrollView>
           <Button style={{marginBottom: 30}} color ="#23cc8c" 
             onPress={() => update(username.username)}>
             <Text>Update</Text>
           </Button>
         </KeyboardAvoidingView>
     );
 
 }