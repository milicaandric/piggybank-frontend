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

function MainScreen() {
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
                    <View style={styles.lineBreak}/>
                    <TouchableOpacity style={styles.sendButton}>
                        <Text style={styles.sendText}>
                            Transactions
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.bottomRight}>
                        <FontAwesomeIcon icon="cog" size={32}/>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
  
function MenuScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.mainCircle}>
          <Text style={styles.circleText}>
              $23.78
          </Text>
      </View>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
function CustomDrawerContent() {
  return (
    <DrawerContentScrollView>
      <DrawerItem style={{backgroundColor:"FFF"}}
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();
export default function User_Dash() {
  const navigation = useNavigation();
  // loginUser wrapper class placeholder
  // firebase auth
  
  return (
      <MainScreen/>
  );
}