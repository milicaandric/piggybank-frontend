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

export default function updateAccount({route, navigation}) {
    //states here
    const { session_cookie } = route.params;


     function navToEmail() {
         navigation.navigate("UpdateEmail");
     }
     function navToPassword() {
         navigation.navigate("UpdatePassword");
     }

    let user = firebase.auth().currentUser;
    let email = user.email;
    useEffect(() => {
        fetch("http://192.168.99.173:8080/api/v1/account/get?email="+email,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': session_cookie // used to identify user session
        },
       })
       .then(response=>response.json()) 
   });

   return(
    <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.pageBack}>
            <View style={styles.lowerHold}>
                </View>
                    <Button color="#23cc8c" onPress={() => navToEmail()}>
                        <Text>
                            Update Email
                        </Text>
                    </Button>
                    <Button color="#23cc8c" onPress={() => navToPassword()}>
                        <Text>
                            Update Password
                        </Text>
                    </Button>
                </View>
            
         
    </KeyboardAvoidingView>
    );

}