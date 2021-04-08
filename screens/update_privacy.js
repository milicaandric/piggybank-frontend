/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: update_privacy.js. This screen is for changing the password for an account. Fields to enter are email,
 * password, verify password. Email is checked to ensure entered email is the current user, and passwords are checked
 * to make sure they match.
 */
import React, { useState, useEffect, Component } from 'react';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { DrawerNavigator } from 'react-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import SideMenu from 'react-native-side-menu-updated'
import SafeAreaView from 'react-native-safe-area-view';

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
  TextInput,
  KeyboardAvoidingView,
  ScrollView, Alert
} from "react-native";

const styles = require('../styles/global');

export default function updatePassword({route, navigation}) {
    //states here
    const { session_cookie } = route.params;
    var currentUser = firebase.auth().currentUser;
    var emailVar = currentUser.email;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    /*
    Known that currently goes back to customer setting regardless if customer or merchant
    Working on how to fix this
    */
    function navToMenu() {
            navigation.navigate("Settings_Customer", {
                session_cookie: session_cookie
            });
        
    }

    useEffect(() => {
        fetch("http://172.22.30.61:8080/api/v1/account/get?email="+emailVar,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': session_cookie // used to identify user session
        },
       })
       .then(response=>response.json()) //possibly set dataType in here for navigation purposes
   });

   function update(email, password, confirm) {
    var dataSent = {
    };
    //builds the body for the API call to update
    if(email != undefined && email != "" && email != null){
        dataSent.email = email;
    }
    if(password != undefined && password != "" && password != null){
        dataSent.password = password;
    }
    
    if (dataSent.email == undefined || dataSent.password == undefined || confirm == undefined) {
        alert("Please fill in all text fields");
    }
   // else if (dataSent.email != emailVar) {
        //alert("Please confirm email address is associated with this account");
   //     alert(emailVar);
   // }
    else if (dataSent.password == confirm) {
        currentUser.updatePassword(password).then(function(){
            //make sure this fetch is the right way to call it
            fetch("http://172.22.30.61:8080/api/v1/account/customer/update?username="+emailVar, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataSent),
            })
            .then(response => response.json())
            .then(data=>{
                //THINK I NEED TO GET HERE SO I CAN GET DATA TYPE
                alert("Password successfully updated!");
                navToMenu();
                /*  if (data.type == "CUSTOMER") {
                    navigation.navigate("Settings_Customer", {
                        session_cookie: session_cookie
                    });
                } else if (data.type == "MERCHANT") {
                    navigation.navigate("Settings_Merchant", {
                        session_cookie: session_cookie
                    });
                } else {
                    alert("no type");
                }
            */})
            .catch((error) =>{
                console.log("Error: ", error);
            });
        }).catch(function(error){
            alert("password must be at least 6 characters");
        });    
    } 
    else 
        alert("Passwords do not match");
    }

   return(
    <View style={styles.settings}>
        <TouchableOpacity onPress={() => navToMenu()}>
            <Image style={styles.backButtonSettings} source={require("../assets/backArrow.png")} />
        </TouchableOpacity>
        <Text style={styles.settingsHeader}>Update Privacy</Text>
        <View style={styles.allSettingsContentButtons}>
            <View style={{
                marginLeft: -20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
            }}
            />
            <Text style={styles.circleText}>Email</Text>
            <View style={styles.greyFields}>
                <TextInput
                    style={styles.baseText}
                    placeholder= "Enter email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail({email})}
                />
            </View>
            <View style={{
                marginLeft: -20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
            }}
            />
            <Text style={styles.circleText}>Password</Text>
            <View style={styles.greyFields}>
                <TextInput
                    style={styles.baseText}
                    placeholder= "Enter new password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword({password})}
                />
            </View>
            <View style={{
                marginLeft: -20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
            }}
            />
            <Text style={styles.circleText}>Confirm Password</Text>
            <View style={styles.greyFields}>
                <TextInput
                    style={styles.baseText}
                    placeholder= "Re-enter new password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(confirm) => setConfirm({confirm})}
                />
            </View>
            <View style={{
                marginLeft: -20,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                alignSelf: 'stretch',
            }}
            />
            <Button color="#23cc8c" onPress={() => update(email.email, password.password, confirm.confirm)}>
                <Text>
                    Update Password
                </Text>
            </Button>
        </View>
        </View>
    );

}