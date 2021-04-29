/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: transfer_to_bank.js. This screen is for tranfering money to a users bank from the app
 */
import React, { useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { Button,Text} from 'galio-framework';

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
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";

const styles = require('../styles/global');



export default function transferToBank({ route, navigation }) {
    const { session_cookie } = route.params;
    const [balance, setBalance] = useState();
    const [amount, setAmount] = useState(0);

    let user = firebase.auth().currentUser; // retrieves current user 
    let email = user.email; // sets email var to user's email for 'update' api call

    function navToMenu(){
        navigation.navigate("User_Dash", {
            session_cookie: session_cookie
        });
    }

    //https://stackoverflow.com/questions/17369098/simplest-way-of-getting-the-number-of-decimals-in-a-number-in-javascript
    function countDecimals(number) {
        if(number == undefined) return 0;
        if(Math.floor(Number(number)) === Number(number)) return 0;
        return String(number).split(".")[1].length || 0; 
    }

    function transfer(amount, balance){
        if(amount == '' || amount == undefined){
            amount = 0;
        }
        if(Number(amount) > 0 && (balance - Number(amount)) >= 0){
            if(countDecimals(amount) <= 2){
                let data = {
                    transactorEmail: email,
                    recipientEmail: null,
                    amount: Number(amount) * 100.00,
                    type: 'BANK'
                };
                fetch("http://localhost:8080/api/v1/transaction/bank",{
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
                            session_cookie: session_cookie,
                            new_balance: (Number(balance)-Number(amount))*100
                        });
                    }
                })
                .catch((error) =>{
                    console.log(error.toString());
                });
            }
        }
    }

     useEffect(() => {
         fetch("http://localhost:8080/api/v1/account/get?email="+email,{
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           'Cookie': session_cookie // used to identify user session
         },
        })
        .then(response=>response.json())
        .then(data=>{
            setBalance(data.balance / 100.00);
        });
    }, []);
    return(
        <View style={styles.container} behavior="padding">
            <TouchableOpacity onPress={() => navToMenu()}>
                <Image style={styles.backButtonTransferToBank} source={require("../assets/backArrow.png")} />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.pageBack}>
                <View style={styles.mainCircle}>
                    <Text style={styles.circleText}>
                        {
                            (balance == undefined)?balance: (balance == 0)?"$0.00":(countDecimals(amount.amount) > 2)?"$"+(Math.round((balance)*100)/100).toFixed(2): (balance - amount.amount <= 0)?("$0.00"): ((isNaN(balance - amount.amount))? "$"+String((Math.round((balance)*100)/100).toFixed(2)): "$"+String((Math.round((balance-amount.amount)*100)/100).toFixed(2)))
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
                            (amount.amount > balance)?<Text style={{color: 'red'}}>You have exceeded your balance</Text>: ((isNaN(amount.amount) && amount != 0) || ( countDecimals(amount.amount) > 2))?<Text style={{color: 'red'}}>Invalid Amount</Text>:null
                        }
                    </View>
                    <Button color="#23cc8c" onPress={() => transfer(amount.amount, balance)}>
                        <Text>
                            Send
                        </Text>
                    </Button>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </View>
    );
}