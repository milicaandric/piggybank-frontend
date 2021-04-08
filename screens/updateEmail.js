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

export default function updateEmail({route, navigation}) {
    //states here
    const { session_cookie } = route.params;
    var currentUser = firebase.auth().currentUser;
    var emailVar = currentUser.email;
    const [email, setEmail] = useState("");
    const [confirm, setConfirm] = useState("");
    const [password, setPassword] = useState("");

     function navToAccount() {
         navigation.navigate("UpdateAccount");
     }


    useEffect(() => {
        fetch("http://192.168.99.173:8080/api/v1/account/get?email="+emailVar,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': session_cookie // used to identify user session
        },
       })
       .then(response=>response.json()) 
   });

   function update(email, confirm) {
    var dataSent = {
    };
    //builds the body for the API call to update
    if(email != undefined && email != "" && email != null){
        dataSent.username = email;
    }
    if(confirm != undefined && confirm != "" && confirm != null){
        dataSent.confirm = confirm;
    }
    
    if (dataSent.email == dataSent.confirm) {

        
        alert("Email successfully updated!");
        navToAccount();
    } else 
        alert("Emails do not match");
   }

   return(
      <KeyboardAvoidingView style={styles.pageBack} behavior="padding">
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navToAccount()}>
                <View style={styles.accountSpacing}>
                    <FontAwesomeIcon icon="arrow-left" style={styles.icon}/>
                </View>
            </TouchableOpacity>
            <Text style={styles.headerText}>Account</Text>
        </View>
        <SafeAreaView style={styles.hold}>
            <Text style={styles.accountText}>Email</Text>
            <View style={styles.greyFields}>
                <TextInput
                    style={styles.baseText}
                    placeholder= "Enter new email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail({email})}
                />
            </View>
            <Text style={styles.accountText}>Confirm Email</Text>
            <View style={styles.greyFields}>
                <TextInput
                    style={styles.baseText}
                    placeholder= "Confirm Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(confirm) => setConfirm({confirm})}
                />
            </View>
            <Button color="#23cc8c" onPress={() => update(email.email, confirm.confirm)}>
                <Text>
                    Update Email
                </Text>
            </Button>
        </SafeAreaView> 
    </KeyboardAvoidingView>
    );

}