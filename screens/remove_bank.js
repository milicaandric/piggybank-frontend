/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: remove_bank.js. This screen allows a customer to remove a bank from their account.
 */
 import React, { useState, Component } from 'react';
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
   Dimensions
 } from "react-native";
 
 const styles = require('../styles/global');
 
 function RemoveBank() {
     return (
         <KeyboardAvoidingView style={styles.container} behavior="padding">
             <View style={styles.pageBack}>
                 <Text style={styles.dashText}>
                     Remove Bank
                 </Text>
                 <View style={{marginBottom: 20}}/>
                 <View style={styles.lowerHold}>
                     <View>
                         <Input style={styles.genInput}
                             placeholder="Bank Routing Number"
                         />
                         <Input style={styles.genInput}
                             placeholder="Name on Account"
                         />
                     </View>
                     <TouchableOpacity style={styles.sendButton}>
                         <Text style={styles.sendText}>
                             Remove
                         </Text>
                     </TouchableOpacity>
                 </View>
             </View>
         </KeyboardAvoidingView>
     );
 }
 
 // user interface
 // TODO : 
 // 1) make button functional (eventually, in next iteration)
 // 2) have back button to settings screen (when settings screen is made)
 function RemoveBankScreen({ navigation }) {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Button onPress={() => navigation.goBack()} title="Go back home"/> 
     </View>
   );
 }
 
 const Drawer = createDrawerNavigator();
 export default function Add_Bank() {
   return (
     <RemoveBank/>
   );
 }