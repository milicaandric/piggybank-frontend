/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: update_email.js. This screen is for changing the password for an account. User enters new email twice.
 * Both entered emails are checked to make sure they match
 * Email is checked to make sure it is valid and not already in use
 */
 import React, { useState } from 'react';
 import { StatusBar } from "expo-status-bar";
 import 'react-native-gesture-handler';
 import * as firebase from 'firebase';   
 import { Button, Text, Input} from 'galio-framework';
 import { LinearGradient } from 'expo-linear-gradient';
 
 import {
   View,
   Image,
   TouchableOpacity,
   KeyboardAvoidingView,
   ScrollView
 } from "react-native";

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

const styles = require('../styles/global');

export default function updateEmail({route, navigation}) {
    //states here
    const { session_cookie } = route.params;
    var currentUser = firebase.auth().currentUser;
    var emailVar = currentUser.email;
    const [email, setEmail] = useState("");
    const [confirm, setConfirm] = useState("");

    /*
    Function used to navigate back to settings page
    depending if account type is customer or merchant
    */
    function navToSettings() {
        fetch("http://localhost:8080/api/v1/account/get?email="+emailVar,{
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

    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

    function update(email, confirm) { 
        if (email != undefined && email != "" && confirm != undefined && confirm != "") {
            if(email == confirm){
                if(validateEmail(email)){
                    var data = {
                        email: email
                    };
                    //check if email is already in use
                    fetch("http://localhost:8080/api/v1/account/update?email="+email, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Cookie: session_cookie
                        },
                        body: JSON.stringify(data),
                    })
                    .then(response => {
                        if(response.status == 400){//email was not already in use
                            var realData = {
                                email: email
                            }
                            fetch("http://localhost:8080/api/v1/account/update?email="+emailVar, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Cookie: session_cookie
                                },
                                body: JSON.stringify(realData),
                            })
                            .then(res=>{
                                if(res.ok == true){
                                    currentUser.updateEmail(email).then(function(){
                                        alert("Success: Log in with new email");
                                        navigation.navigate("Login"); //make user log in with new email
                                    }).catch(function(error){
                                        alert("Invalid email or email already exists");
                                        console.log(error.toString());
                                    }); 
                                }
                                else{
                                    alert("Authorization to update email was unsuccessful");
                                }
                            })
                        }
                        else{
                            alert("Email is already in use"); 
                        }
                    })
                    .catch((error) =>{
                        alert("Authentication to update email was unsuccessful");
                        console.log(error.toString());
                    });
                }
            } 
            else{
                alert("Emails don't match")
            }
        } 
        else {
            alert("Fill out all fields");
        }
    }

   return(
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LinearGradient
        // baackground linear gradient
        colors={['transparent', 'rgba(0, 0, 0, 0.1)', '#93E9BE']}
        style={styles.background}
        />
        <StatusBar style="auto"/>
        <TouchableOpacity onPress={() => navToSettings()}>
            <Image style={styles.backButton} source={require("../assets/backArrow.png")}/>
        </TouchableOpacity>
        <View>
            <Text style={styles.signupHeader}>Update Email</Text>
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
            placeholder="Confirm Email"
            onChangeText={(confirm) => setConfirm({confirm})}
        />
        </View>
        </ScrollView>
        <Button style={{marginBottom: 30}} color ="#23cc8c" 
        onPress={() => update(email.email, confirm.confirm)}>
        <Text>Update</Text>
        </Button>
        </KeyboardAvoidingView>
    );
}