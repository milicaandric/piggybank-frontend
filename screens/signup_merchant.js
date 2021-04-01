/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: signup_merchant.js. This screen is for signing up a new merchant. Fields to enter are email,
 * username, password, verify password, account number, account routing number, and name on account.
 * Username is checked for existing username before creating account.
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

export default function signUpMerchant({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const[verifyPassword, setVerifyPassword] = useState("");
  const[routingNumber, setRountingNumber] = useState("");
  const[accountNumber, setAccountNumber] = useState("");
  const[nameOnAccount, setNameOnAccount] = useState("");

  //function called when the user presses the backarrow. Takes user back to login
  function navToLogin() {
    navigation.navigate("Login");
  }

  //this function is called when the user presses "signup"
  //@param email, username, password, verifyPassword, routingNumber, accountNumber, nameOnAccount
  function signupMerchantAccount(email, username, password, verifyPassword, routingNumber, accountNumber, nameOnAccount){
        //first checks if the user filled out every field
        if(email != undefined && email != "" && password != undefined && password != "" && verifyPassword != undefined && verifyPassword != "" && routingNumber != undefined 
        && routingNumber != "" && username != undefined && username != "" && accountNumber != undefined && accountNumber != "" && nameOnAccount != undefined && nameOnAccount != ""){
            //checks if the password is at least 6 characters
            if(password.length >= 6){
                //checks if the password is verified
                if(verifyPassword == password){
                    fetch("http://192.168.4.34:8080/api/v1/account/usernameExists?username="+username)
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
                                    bankAccount:{
                                        nameOnAccount: nameOnAccount,
                                        accountNumber: accountNumber,
                                        routingNumber: routingNumber
                                    },
                                    type: "MERCHANT"
                                };
                                //creates user in firestore with backend request with token
                                fetch("http://192.168.4.34:8080/api/v1/account/create?token="+token, {
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
                                        navigation.navigate("Merchant_Dash", {
                                            session_cookie: session
                                        });
                                    }
                                    //authentication failed to create user
                                    else{
                                        throw Error("Authentication for creating customer was unsuccessful");
                                    }
                                })
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
        <ScrollView>
            <View>
                <Input style={styles.signupField}
                    placeholder="Email"
                    onChangeText={(email) => setEmail({email})}
                />
            </View>
            <View>
                <Input style={styles.signupField}
                    placeholder="Username"
                    onChangeText={(username) => setUsername({username})}
                />
            </View>
            <View>
                <Input style={styles.signupField}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword({password})}
                />
            </View>
            <View>
                <Input style={styles.signupField}
                    placeholder="Verify Password"
                    secureTextEntry={true}
                    onChangeText={(verifyPassword) => setVerifyPassword({verifyPassword})}
                />
            </View>
            <View style={{
            marginLeft: widthPercentageToDP("0%"),
            width: "100%",
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            alignSelf: 'stretch',
            paddingBottom: 20,
            }}
            />
            <View>
                <Text style={{textAlign: 'center', paddingBottom: 15, paddingTop: 20, fontSize: 20}}>Bank Information</Text>
            </View>
            <View>
                <Input style={styles.signupField}
                    placeholder="Routing Number"
                    onChangeText={(routingNumber) => setRountingNumber({routingNumber})}
                />
            </View>
            <View>
                <Input style={styles.signupField}
                    placeholder="Account Number"
                    onChangeText={(accountNumber) => setAccountNumber({accountNumber})}
                />
            </View>
            <View>
                <Input style={styles.signupField}
                    placeholder="Name on Account"
                    onChangeText={(nameOnAccount) => setNameOnAccount({nameOnAccount})}
                />
            </View>
        </ScrollView>
        <Button style={{marginBottom: 30}} color ="#23cc8c" 
        onPress={() => signupMerchantAccount(email.email, username.username, password.password, verifyPassword.verifyPassword, routingNumber.routingNumber, accountNumber.accountNumber, nameOnAccount.nameOnAccount)}>
        <Text>Sign up</Text>
        </Button>
    </KeyboardAvoidingView>
  );
}