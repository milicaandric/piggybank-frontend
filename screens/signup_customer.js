import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
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
  KeyboardAvoidingView
} from "react-native";

const styles = require('../styles/global');

export default function signUpCustomer() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const[verifyPassword, setVerifyPassword] = useState("");

  function navToLogin() {
    navigation.navigate("Login");
  }

  function loginUser(email, username, password, verifyPassword){
        if(email != undefined && email != "" && password != undefined && password != "" && verifyPassword != undefined && verifyPassword != "" 
        && username != undefined && username != ""){
            if(password.length >= 6){
                if(verifyPassword == password){
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
                        user.user.getIdToken(true).then(token =>{
                            var data = {
                                email: email,
                                username: username,
                                password: password,
                                type: "CUSTOMER"
                            };
                            fetch("http://192.168.99.31:8080/api/v1/account/create?token="+token, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data),
                            })
                            .then((response)=>{
                                if(response.ok == true){
                                    var session_cookie = response.headers.map['set-cookie'];
                                    console.log(session_cookie);
                                    navigation.navigate("User_Dash");
                                }
                                else{
                                    throw Error("Authentication for creating customer was unsuccessful");
                                }
                            })
                            .catch((error)=>{
                                alert("Authentication for creating customer was unsuccessful");
                                console.log(error.toString());
                            });
                        })
                        .catch((error) =>{
                            console.log(error.toString());
                        });
                    })
                    .catch((error) =>{
                        console.log(error.toString())
                        alert("Email is already in use or email is invalid");
                    });
    
                }
                else{
                    alert("Passwords do not match");
                }
            }
            else{
                alert("Password must be at least 6 characters");
            }
        }
        else{
            alert("Fill out all fields to create account");
        }
  }
  
  // user interface
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LinearGradient
        // baackground linear gradient
        colors={['transparent', 'rgba(0, 0, 0, 0.1)', '#53DC98']}
        style={styles.background}
        />
        <StatusBar style="auto"/>
        <TouchableOpacity onPress={() => navToLogin()}>
            <Image style={styles.backButton} source={require("../assets/backArrow.png")}/>
        </TouchableOpacity>
        <View>
        <Text style={styles.signupHeader}>Signup</Text>
        </View>
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
        <Button style={{marginBottom: 30}} color ="#8c52ff" 
        onPress={() => loginUser(email.email, username.username, password.password, verifyPassword.verifyPassword)}>
        <Text>Sign up</Text>
        </Button>
    </KeyboardAvoidingView>
  );
}