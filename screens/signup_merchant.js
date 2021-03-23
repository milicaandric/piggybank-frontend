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

export default function signUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const[verifyPassword, setVerifyPassword] = useState("");
  const[routingNumber, setRountingNumber] = useState("");
  const[nameOnAccount, setNameOnAccount] = useState("");

  function navToLogin() {
    console.log("clicked");
    navigation.navigate("Login");
  }

  function loginUser(email, username, password, verifyPassword, routingNumber, nameOnAccount){
        if(email != undefined && email != "" && password != undefined && password != "" && verifyPassword != undefined && verifyPassword != "" && routingNumber != undefined 
        && routingNumber != "" && username != undefined && username != "" && nameOnAccount != undefined && nameOnAccount != ""){
            if(password.length >= 6){
                if(verifyPassword == password){
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
                        var data = {
                            email: email,
                            username: username,
                            password: password,
                            routinNumber: routingNumber,
                            nameOnAccount: nameOnAccount
                        }
                    })
                    .catch((error) =>{
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

  // loginUser wrapper class placeholder
  // firebase auth
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <LinearGradient
        // Background Linear Gradient
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
            placeholder="Name on Bank Account"
            onChangeText={(nameOnAccount) => setNameOnAccount({nameOnAccount})}
        />
        </View>
        <Button style={{marginBottom: 30}} color ="#8c52ff" 
        onPress={() => loginUser(email.email, username.username, password.password, verifyPassword.verifyPassword, routingNumber.routingNumber, nameOnAccount.nameOnAccount)}>
        <Text>Sign up</Text>
        </Button>
    </KeyboardAvoidingView>
  );
}