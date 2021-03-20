/**
 * CS 506
 * PiggyBank team: Callan Patel, Brian O'Loughlin, Calvin Armstrong, Jacob Biewer, Milica Andric, Quentin Ford
 * Lecture 001
 * file: signup.js. This screen is entered when the user presses "forgot password" on the login page.
 */
 import React, { useState } from 'react';
 import { useNavigation } from '@react-navigation/native';
 import * as firebase from 'firebase';
 import { Button, Block, Text, Input, theme } from 'galio-framework';
 
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
     View,
     TouchableOpacity,
   } from "react-native";
 
 const styles = require('../styles/global');

 export default function Password() {
     const navigation = useNavigation();
     const [email, setEmail] = useState("");
 
     // resetPassword wrapper function placeholder
     //function is entered when the user presses the submut button
     //UI
     return(
         <View style={styles.container}>
         <Text h5 style={{margin: 8}}>Forgot your password?</Text>
         <Text p style={{textAlign: 'center', margin: 8}}>Enter your email address below to reset your password</Text>

         <View>
             <Input 
                 placeholder='Email'
                 onChangeText={(email) => setEmail({email})}
             />
         </View>
         <Button color ="#53DC98" onPress={() => this.passwordReset(email.email)}>
         <Text style={styles.loginText}>Reset Password</Text>
         </Button>
     </View>
     );
 }