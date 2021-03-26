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
  KeyboardAvoidingView
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

  function navToLogin() {
    navigation.navigate("Login");
  }

  function loginUser(email, username, password, verifyPassword, routingNumber, accountNumber, nameOnAccount){
        if(email != undefined && email != "" && password != undefined && password != "" && verifyPassword != undefined && verifyPassword != "" && routingNumber != undefined 
        && routingNumber != "" && username != undefined && username != "" && accountNumber != undefined && accountNumber != "" && nameOnAccount != undefined && nameOnAccount != ""){
            if(password.length >= 6){
                if(verifyPassword == password){
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
                        user.user.getIdToken(true).then(token =>{
                            fetch("http://192.168.99.31:8080/api/v1/account/usernameExists?username="+username)
                            .then((res)=>res.json())
                            .then((dataUsernameExists)=>{
                                if(dataUsernameExists == true){
                                    throw Error("Username already exists");
                                }
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
                                        navigation.navigate("Merchant_Dash");
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
                            .catch((error)=>{
                                alert("Username already exists");
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
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Email"
            onChangeText={(email) => setEmail({email})}
        />
        </View>
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Username"
            onChangeText={(username) => setUsername({username})}
        />
        </View>
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword({password})}
        />
        </View>
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Verify Password"
            secureTextEntry={true}
            onChangeText={(verifyPassword) => setVerifyPassword({verifyPassword})}
        />
        </View>
        <View style={{
        marginLeft: widthPercentageToDP("12.5%"),
        width: widthPercentageToDP('75%'),
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
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Routing Number"
            onChangeText={(routingNumber) => setRountingNumber({routingNumber})}
        />
        </View>
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Account Number"
            onChangeText={(accountNumber) => setAccountNumber({accountNumber})}
        />
        </View>
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Name on Account"
            onChangeText={(nameOnAccount) => setNameOnAccount({nameOnAccount})}
        />
        </View>
        <Button style={{marginBottom: 30}} color ="#8c52ff" 
        onPress={() => loginUser(email.email, username.username, password.password, verifyPassword.verifyPassword, routingNumber.routingNumber, accountNumber.accountNumber, nameOnAccount.nameOnAccount)}>
        <Text>Sign up</Text>
        </Button>
    </KeyboardAvoidingView>
  );
}