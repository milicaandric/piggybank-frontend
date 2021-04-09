/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: update_privacy.js. This screen is for changing the password for an account. Fields to enter are email,
 * password, verify password. Email is checked to ensure entered email is the current user, and passwords are checked
 * to make sure they match.
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
    Working on how to fix this
    */
    function navToSettings() {
        fetch("http://192.168.99.173:8080/api/v1/account/get?email="+emailVar,{
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
            // authentication failed to get data type user
            alert("Error: Account type not found. Customer default");
            navigation.navigate("Settings_Customer", {
                session_cookie: session_cookie
                });
            });
    }

    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

    function update(email, confirm) { //NEED TO CONFIRM THAT PASSWORD IS CORRECT BEFORE CHANGING EMAIL
        if (email != undefined && email != "" && confirm != undefined && confirm != "") {
            if(email == confirm){
                if(validateEmail(email)){
                    var data = {
                        email: email
                    };
                    fetch("http://192.168.99.173:8080/api/v1/account/update?email="+emailVar, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Cookie: session_cookie
                        },
                        body: JSON.stringify(data),
                    })
                    .then(response => {
                        if(response.ok == true){
                            //check if email is already in firestore
                            currentUser.updateEmail(email).then(function(){
                                alert("Success: Log in with new email");
                                navigation.navigate("Login");
                            }).catch(function(error){
                                alert("Invalid email or email already exists");
                                console.log(error.toString());
                            }); 
                        }
                        else{
                            alert("Authentication to update email was unsuccessful"); 
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
    // <View style={styles.settings}>
    //     <TouchableOpacity onPress={() => navToMenu()}>
    //         <Image style={styles.backButtonSettings} source={require("../assets/backArrow.png")} />
    //     </TouchableOpacity>
    //     <Text style={styles.settingsHeader}>Update Email</Text>
    //     <View style={styles.allSettingsContentButtons}>
    //         <View style={{
    //             marginLeft: -20,
    //             borderBottomColor: 'black',
    //             borderBottomWidth: 1,
    //             alignSelf: 'stretch',
    //         }}
    //         />
    //         <Text style={styles.circleText}>Enter new email</Text>
    //         <View style={styles.greyFields}>
    //             <TextInput
    //                 style={styles.baseText}
    //                 placeholder= "Enter email"
    //                 placeholderTextColor="#003f5c"
    //                 onChangeText={(email) => setEmail({email})}
    //             />
    //         </View>
    //         <View style={{
    //             marginLeft: -20,
    //             borderBottomColor: 'black',
    //             borderBottomWidth: 1,
    //             alignSelf: 'stretch',
    //         }}
    //         />
    //         <Text style={styles.circleText}>Confirm new email</Text>
    //         <View style={styles.greyFields}>
    //             <TextInput
    //                 style={styles.baseText}
    //                 placeholder= "Confirm email"
    //                 placeholderTextColor="#003f5c"
    //                 onChangeText={(confirm) => setConfirm({confirm})}
    //             />
    //         </View>
    //         <View style={{
    //             marginLeft: -20,
    //             borderBottomColor: 'black',
    //             borderBottomWidth: 1,
    //             alignSelf: 'stretch',
    //         }}
    //         />
    //         <Text style={styles.circleText}>Password</Text>
    //         <View style={styles.greyFields}>
    //             <TextInput
    //                 style={styles.baseText}
    //                 placeholder= "Password"
    //                 placeholderTextColor="#003f5c"
    //                 secureTextEntry={true}
    //                 onChangeText={(password) => setPassword({password})}
    //             />
    //         </View>
    //         <View style={{
    //             marginLeft: -20,
    //             borderBottomColor: 'black',
    //             borderBottomWidth: 1,
    //             alignSelf: 'stretch',
    //         }}
    //         />
    //         <Button color="#23cc8c" onPress={() => update(email.email, password.password, confirm.confirm)}>
    //             <Text>
    //                 Update Email
    //             </Text>
    //         </Button>
    //     </View>
    //     </View>
    );
}