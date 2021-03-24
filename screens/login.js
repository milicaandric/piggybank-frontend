import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { Button, Block, Text, Input, theme } from 'galio-framework';
import materialTheme from '../constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';

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
  KeyboardAvoidingView
} from "react-native";

const styles = require('../styles/global');

export default function login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function navToSignup() {
    navigation.navigate("Signup_Merchant");
  }
  function navToPassword() {
    navigation.navigate("Password");
  }

  // loginUser wrapper function
  // firebase auth
  function loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
      fetch("http://localhost:8080/api/v1/account/general/get?username="+email) // this will be replaced
      .then(response=>response.json())
      .then(data=>{
        if(data.data.type == "CUSTOMER") {
          alert("Replace me with nav to customer screen!");
        }
        else if(data.data.type == "MERCHANT") {
          alert("Replace me with nav to merchant screen!");
        }
      })
    })
    .catch((error) =>{
      alert("Email or password incorrect.");
    });
}
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.image} source={require("../assets/piggybank_4.png")} />
      <LinearGradient
        // Background Linear Gradient
        colors={['transparent', 'rgba(0, 0, 0, 0.1)', '#53DC98']}
        style={styles.background}
      />
      <StatusBar style="auto" />
      <View>
        <Input style={{borderRadius:30, height:50, padding: 10}}
          placeholder="Email"
          onChangeText={(email) => setEmail({ email })}
        />
      </View>

      <View>
      <Input style={{borderRadius: 30, height:50, padding: 10}}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword({password})}
        />
      </View>
      <Button style={{marginBottom: 30}} color ="#8c52ff" 
      onPress={() => loginUser(email.email, password.password)}>
        <Text>Login</Text>
      </Button>
      <View style={{
        marginLeft: widthPercentageToDP("12.5%"),
        width: widthPercentageToDP('75%'),
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
      }}
      />
      <TouchableOpacity onPress={() => navToSignup()}>
        <Text style={{height:30, marginBottom:5, marginTop:30}}>Sign up as Merchant!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navToSignup()}>
        <Text style={{height:30, marginBottom:5, marginTop:10}}>Sign up as Customer!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navToPassword()}>
        <Text style={{height:30, marginBottom:30, marginTop:10}}>Forgot your password?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}