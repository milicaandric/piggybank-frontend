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

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const[verifyPassword, setVerifyPassword] = useState("");
  const[routingNumber, setRountingNumber] = useState("");
  const[nameOnAccount, setNameOnAccount] = useState("");

  function navToLogin() {
    navigation.navigate("Login");
  }

  // loginUser wrapper class placeholder
  // firebase auth
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.backButton} source={require("../assets/backArrow.png")} />
        <LinearGradient
        // Background Linear Gradient
        colors={['transparent', 'rgba(0, 0, 0, 0.2)', '#53DC98']}
        style={styles.background}
        />
        <StatusBar style="auto" />
        <Text style={styles.signupHeader}>Signup as Merchant</Text>
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="email"
            onChangeText={(email) => setEmail({email})}
        />
        </View>
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="username"
            onChangeText={(username) => setUsername({username})}
        />
        </View>
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword({password})}
        />
        </View>
        <View style={{
        marginLeft: widthPercentageToDP("12.5%"),
        width: widthPercentageToDP('75%'),
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        padding: 5
        }}
        />
        <Text style={{textAlign: 'center', fontFamily: "TrebuchetMS", fontSize: 20}}>Bank Information</Text>
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Routing Number"
            secureTextEntry={true}
            onChangeText={(routingNumber) => setRountingNumber({routingNumber})}
        />
        </View>
        <View>
        <Input style={{borderRadius: 30, height:50, padding: 10}}
            placeholder="Name on Bank Account"
            secureTextEntry={true}
            onChangeText={(nameOnAccount) => setNameOnAccount({nameOnAccount})}
        />
        </View>
        <Button style={{marginBottom: 30}} color ="#8c52ff" onPress={() => this.loginUser(email.email, password.password)}>
        <Text>Login</Text>
        </Button>
    </KeyboardAvoidingView>
  );
}