/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: merchant_dash.js. This screen allows a merchant to send change from a transaction to users.
 */
import React from 'react';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { Text, Input } from 'galio-framework';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

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
  Dimensions
} from "react-native";

const styles = require('../styles/global');

export default function Merchant_dash({route, navigation}) {
  const {session_cookie} = route.params;
  function navToSettings(){
    navigation.navigate("Settings_Merchant", {
      session_cookie: session_cookie
    });
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.pageBack}>
            <Text style={styles.dashText}>
                Merchant Account
            </Text>
            <View style={{marginBottom: 20}}/>
            <View style={styles.lowerHold}>
                <View>
                    <Input style={styles.genInput}
                        placeholder="Recipient"
                    />
                    <Input style={styles.genInput}
                        placeholder="Amount"
                    />
                </View>
                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendText}>
                        Send
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navToSettings()}}>
                  <View style={styles.bottomRight}>
                    <FontAwesomeIcon icon="cog" size={32}/>
                  </View>
                </TouchableOpacity>
            </View>
        </View>
    </KeyboardAvoidingView>
  );
}