/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: update_privacy.js. This screen is for changing the password for an account. Fields to enter are email,
 * password, verify password. Email is checked to ensure entered email is the current user, and passwords are checked
 * to make sure they match.
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

export default function updatePassword({route, navigation}) {
    //states here
    const { session_cookie } = route.params;
    var currentUser = firebase.auth().currentUser;
    var emailVar = currentUser.email;
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    /*
    
    */
    function navToMenu() {
        fetch("http://192.168.99.173:8080/api/v1/account/get?email="+emailVar,{
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

   function update(password, confirm) {
    //builds the body for the API call to update
    if(password != undefined && password != "" && confirm != undefined && confirm != ""){
      if(password == confirm){
        if(password.length >= 6){
          currentUser.updatePassword(password); //might want to add the PUT to the firestore before we log out
          fetch("http://192.168.99.173:8080/api/v1/account/log-out",{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Cookie': session_cookie // used to identify user session
              },
          })
          .then(response=>{
              if(response.ok == true){
                  alert("Success: Log in with new passsword")
                  navigation.navigate("Login");
              }
              else{
                  alert("logout failed")
              }
          })
          .catch((error) =>{
              console.log(error.toString());
          });
        }
        else{
          alert("Password must be at least 6 characters");
        }
      }
      else{
        alert("Passwords do not match");
      }
    }
    else{
      alert("Fill out all fields")
    }
  }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <StatusBar style="auto" />
          <TouchableOpacity onPress={() => navToMenu()}>
            <Image style={styles.backButton} source={require("../assets/backArrow.png")} />
          </TouchableOpacity>
          <View>
            <Text style={styles.signupHeader}>Change Password</Text>
          </View>
          <ScrollView>
            <View style={{ paddingBottom: 25 }}>
              <Input style={{ borderRadius: 30, height: 50, padding: 10 }}
                placeholder="New Password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword({ password })}
              />
            </View>
            <View style={{ paddingBottom: 25 }}>
              <Input style={{ borderRadius: 30, height: 50, padding: 10 }}
                placeholder="Confirm New Password"
                secureTextEntry={true}
                onChangeText={(confirm) => setConfirm({ confirm })}
              />
            </View>
          </ScrollView>
          <Button style={{marginBottom: 30}} color ="#23cc8c" 
            onPress={() => update(password.password, confirm.confirm)}>
            <Text>Change Password</Text>
          </Button>
        </KeyboardAvoidingView>
    );

}