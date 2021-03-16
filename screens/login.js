import React, {useState} from 'react';
import { StatusBar } from "expo-status-bar";
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAg-KUJ--2nDiMDJnzSt_sNYO8y_eZI5Bo",
    authDomain: "piggybank-104d3.firebaseapp.com",
    projectId: "piggybank-104d3",
    storageBucket: "piggybank-104d3.appspot.com",
  };
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
else{
    firebase.app();
}
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
  } from "react-native";
export default function Login () {
    return(
        <Text>SignUp</Text>
    )
}