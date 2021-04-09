/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: transfer_to_ban.js. This screen is for tranfering money to a users bank from the app
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
  KeyboardAvoidingView,
  AppRegistry,
  Dimensions,
  TextInput,
  StatusBar
} from "react-native";
import { render } from 'react-dom';

const styles = require('../styles/global');



export default function transferToBank({ route, navigation }) {
    const { session_cookie } = route.params;
    const [balance, setBalance] = useState();
    const [amount, setAmount] = useState(0);

    let user = firebase.auth().currentUser; // retrieves current user 
    let email = user.email; // sets email var to user's email for 'update' api call

    //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript?page=1&tab=votes#tab-top
    function makeid(length) {
        var result           = [];
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result.push(characters.charAt(Math.floor(Math.random() * 
            charactersLength)));
       }
       return result.join('');
    }

    function navToMenu(){
        navigation.navigate("User_Dash", {
            session_cookie: session_cookie
        });
    }

    function transfer(amount, balance){
        if(amount == '' || amount == undefined){
            amount = 0;
        }
        if(Number(amount) > 0 && (balance - Number(amount)) >= 0){
            let data = {
                    transactorEmail: email,
                    recipientEmail: null,
                    amount: Number(amount),
                    type: 'BANK'
            };
            fetch("http:/192.168.1.3:8080/api/v1/bank/get?email=",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': session_cookie // used to identify user session
            },
            body: JSON.stringify(data)
            })
            .then(response=>{
                if(response.ok == true){
                    navigation.navigate("User_Dash", {
                        session_cookie: session_cookie
                    });
                }
            })
            .catch((error) =>{
                console.log(error.toString());
            });
        }
    }

     useEffect(() => {
         fetch("http://192.168.1.3:8080/api/v1/account/get?email="+email,{
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           'Cookie': session_cookie // used to identify user session
         },
        })
        .then(response=>response.json())
        .then(data=>{
            setBalance(data.balance);
        });
    }, []);
    return(
        <View style={styles.container} behavior="padding">
            <TouchableOpacity onPress={() => navToMenu()}>
                <Image style={styles.backButtonTransferToBank} source={require("../assets/backArrow.png")} />
            </TouchableOpacity>
            <View style={styles.pageBack}>
                <View style={styles.mainCircle}>
                    <Text style={styles.circleText}>
                        {
                            (balance == undefined)?balance:(balance - amount.amount <= 0)?("$0.00"): ((isNaN(balance - amount.amount))? "$"+String(balance): "$"+String(balance-amount.amount))
                        }
                    </Text>
                </View>
                <Text style={styles.dashText}>
                    Current Balance
                </Text>
                <View style={styles.lowerHold}>
                    <View>
                        <TextInput style={styles.transferToBankInput}
                            placeholder="Amount"
                            numeric
                            keyboardType={'numeric'}
                            onChangeText={(amount) => setAmount({ amount })}
                        />
                        {
                        (amount.amount > balance)?<Text style={{color: 'red'}}>You have exceeded your balance</Text>: ((isNaN(amount.amount) && amount != 0)?<Text style={{color: 'red'}}>Invalid Amount</Text>:null)
                        }
                    </View>
                    <Button color="#23cc8c" onPress={() => transfer(amount.amount, balance)}>
                        <Text>
                            Send
                        </Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}