/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: password.js. This screen is entered when the user presses "forgot password" on the login page.
 */
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { StatusBar } from "expo-status-bar";

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
  Image,
  View,
  TouchableOpacity,
} from "react-native";

const styles = require('../styles/global');

export default function Password() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  function navToLogin() {
    console.log("clicked");
    navigation.navigate("Login");
  }

  // function entered upon user clicking button 
  function passwordReset(email) {
    if (email == undefined || email == "") {
      alert("Please enter your email to reset password.");
    }
    else {
      // tries the firebase function to reset password -- an email with a link to update password is sent
      firebase.auth().sendPasswordResetEmail(email).then(function () {
        alert("Check email and follow the link to reset password.");
        navigation.navigate("Login");
      }).catch((error) => {
        alert("Email invalid.");
      });
    }
  }

  // user interface
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => navToLogin()}>
        <Image style={styles.backButton} source={require("../assets/backArrow.png")}/>
      </TouchableOpacity>
      <Text style={styles.signupHeader}>Forgot your password?</Text>
      <Text p style={{ textAlign: 'center', margin: 8 }}>Enter your email address below to reset your password</Text>

      <View>
        <Input style = {{borderRadius: 30, height:50, padding: 10}}
          placeholder='Email'
          onChangeText={(email) => setEmail({ email })}
        />
      </View>
      <Button color="#8c52ff"
        onPress={() => passwordReset(email.email)}>
        <Text style={styles.loginText}>Reset Password</Text>
      </Button>
    </View>
  );
}