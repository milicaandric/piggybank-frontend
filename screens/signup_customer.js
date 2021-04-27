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

export default function signUpCustomer({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const[verifyPassword, setVerifyPassword] = useState("");

  //function called when the user presses the backarrow. Takes user back to login
  function navToLogin() {
    navigation.navigate("Login");
  }

  //this function is called when the user presses "signup"
  //@param email, username, password, verifyPassword
  function signupCustomerAccount(email, username, password, verifyPassword){
    //first checks if the user filled out every field
    if(email != undefined && email != "" && password != undefined && password != "" && verifyPassword != undefined && verifyPassword != "" 
    && username != undefined && username != ""){
        email = email.toLowerCase(); //set to lower case for database purposes
        //checks if the password is at least 6 characters
        if(password.length >= 6){
            //checks if the password is verified
            if(verifyPassword == password){
                //backend request to see if the username is taken
                fetch("http://192.168.1.95:8080/api/v1/account/usernameExists?username="+username)
                .then((res)=>res.json())
                .then((dataUsernameExists)=>{
                    if(dataUsernameExists == true){
                        //throws error. username is already taken
                        throw Error("Username already exists");
                    }
                    //username isn't taken, creates user in firebase auth
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
                        //gets the IdToken which is used for sessionID generation in backend
                        user.user.getIdToken(true).then(token =>{
                            var data = {
                                email: email,
                                username: username,
                                password: password,
                                type: "CUSTOMER"
                            };
                            //creates user in firestore with backend request with token
                            fetch("http://192.168.1.95:8080/api/v1/account/create?token="+token, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data),
                            })
                            .then((response)=>{
                                //checks if the request was successful
                                if(response.ok == true){
                                    //gets sessionID cookie and sends it via navigation to user_dash screen, and 
                                    //navigates to that screen
                                    var session = response.headers.map['set-cookie'];
                                    navigation.navigate("User_Dash", {
                                        session_cookie: session
                                    });
                                }
                                //authentication failed to create user
                                else{
                                    throw Error("Authentication for creating customer was unsuccessful");
                                }
                            })
                            //authentication failed to create user
                            .catch((error)=>{
                                alert("Authentication for creating customer was unsuccessful");
                                console.log(error.toString());
                            });
                        })
                        //failed to acquire IdToken
                        .catch((error) =>{
                            console.log(error.toString());
                        });
                    })
                    //email was invalid, or the email already exists
                    .catch((error) =>{
                        console.log(error.toString())
                        alert("Email is already in use or email is invalid");
                    });
                })
                //username exists already
                .catch((error)=>{
                    alert("Username already exists");
                });
            }
            //verify password didn't match
            else{
                alert("Passwords do not match");
            }
        }
        //password wasn't at least 6 characters
        else{
            alert("Password must be at least 6 characters");
        }
    }
    //not all fields were filled out
    else{
        alert("Fill out all fields to create account");
    }
  }
  
  // user interface
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LinearGradient
        // baackground linear gradient
        colors={['transparent', 'rgba(0, 0, 0, 0.1)', '#93E9BE']}
        style={styles.background}
        />
        <StatusBar style="auto"/>
        <TouchableOpacity onPress={() => navToLogin()}>
            <Image style={styles.backButton} source={require("../assets/backArrow.png")}/>
        </TouchableOpacity>
        <View>
        <Text style={styles.signupHeader}>Signup</Text>
        </View>
        <ScrollView>
        <View style={{paddingBottom: 25}}>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Email"
            onChangeText={(email) => setEmail({email})}
        />
        </View>
        <View style={{paddingBottom: 25}}>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Username"
            onChangeText={(username) => setUsername({username})}
        />
        </View>
        <View style={{paddingBottom: 25}}>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword({password})}
        />
        </View>
        <View style={{paddingBottom: 25}}>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Verify Password"
            secureTextEntry={true}
            onChangeText={(verifyPassword) => setVerifyPassword({verifyPassword})}
        />
        </View>
        </ScrollView>
        <Button style={{marginBottom: 30}} color ="#23cc8c" 
        onPress={() => signupCustomerAccount(email.email, username.username, password.password, verifyPassword.verifyPassword)}>
        <Text>Sign up</Text>
        </Button>
    </KeyboardAvoidingView>
  );
}