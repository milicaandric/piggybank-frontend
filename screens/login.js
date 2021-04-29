/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: login.js. This screen is for logging into an account. Fields are username (email) and password. Also options to
 *       create a customer account, create a merchant account, or retrieve a forgotten password.
 */
 import React, { useState } from 'react';
 import { StatusBar } from "expo-status-bar";
 import 'react-native-gesture-handler';
 import * as firebase from 'firebase';
 import { widthPercentageToDP } from "react-native-responsive-screen";
 import { Button, Text, Input} from 'galio-framework';
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
 
 export default function login({navigation}) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   function navToSignupMerchant() {
     navigation.navigate("Signup_Merchant");
   }
   function navToSignupCustomer() {
     navigation.navigate("Signup_Customer");
   }
   function navToPassword() {
     navigation.navigate("Password");
   }
 
   // this function is called when the user presses "login"
   // function for logging into an account
   // @param email, password
   function loginUserWithToken(email, password) {
     if(email != "" && email != undefined && password != "" && email != undefined){
       email = email.toLowerCase();
       firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
         user.user.getIdToken(true).then(token => {
           // gets the IdToken which is used for sessionID generation in backend
           fetch("http://localhost:8080/api/v1/account/log-in?token="+token+"&email="+email+"&password="+password, {
             method: 'POST'
           })
           .then(response=>{
             var session_cookie = response.headers.map['set-cookie'];
             // gets the user email for login
             fetch("http://localhost:8080/api/v1/account/get?email="+email,{
               method: 'GET',
               headers: {
                 'Content-Type': 'application/json',
                 'Cookie': session_cookie // used to identify user session
               },
             })
             .then(response=>response.json())
             .then(data=>{
               // if the user is a merchant, navigate to merchant dashboard
               if(data.type == "MERCHANT"){
                navigation.navigate("Merchant_Dash", {
                  session_cookie: session_cookie
                });
               }
               // if the user is a customer, navigate to customer dashboard
               else if(data.type == "CUSTOMER"){
                 navigation.navigate("User_Dash", {
                  session_cookie: session_cookie
              });
               }
             })
             .catch((error)=>{
               // authentication failed to login user
               alert("Authentication Failed");
             });
           }).catch((error)=>{
             console.log(error.toString());
           });
         });
       })
       .catch((error) =>{
         console.log(error.toString());
         // information is incorrect/not in the backend database
         alert("Email or password incorrect");
       });
     }
     else{
       // login and/or password field is not filled out on screen
       alert("Please enter email and password to login");
     }
   }
   
   // user interface
   return (
     <KeyboardAvoidingView style={styles.container} behavior="padding">
       <Image style={styles.image} source={require("../assets/piggybank.png")} />
       <LinearGradient
         // background linear gradient
         colors={['transparent', 'rgba(0, 0, 0, 0.1)', '#93E9BE']}
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
       <Button style={{marginBottom: 30}} color ="#23cc8c" 
       onPress={() => loginUserWithToken(email.email, password.password)}>
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
       <TouchableOpacity onPress={() => navToSignupMerchant()}>
         <Text style={{height:30, marginBottom:5, marginTop:30}}>Sign up as Merchant!</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navToSignupCustomer()}>
         <Text style={{height:30, marginBottom:5, marginTop:10}}>Sign up as Customer!</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => navToPassword()}>
         <Text style={{height:30, marginBottom:30, marginTop:10}}>Forgot your password?</Text>
       </TouchableOpacity>
     </KeyboardAvoidingView>
   );
 }