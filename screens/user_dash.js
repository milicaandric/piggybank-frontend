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

export default function User_Dash() {
  const navigation = useNavigation();
  // loginUser wrapper class placeholder
  // firebase auth
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.pageBack}>
            <View style={styles.mainCircle}>
                <Text style={styles.circleText}>
                    $23.78
                </Text>
            </View>
            <Text style={styles.dashText}>
                Current Balance
            </Text>
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
            </View>
        </View>
        
    </KeyboardAvoidingView>
  );
}