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

export class Outer extends Component{
    
    constructor(props) {
      super(props);
    
      this.toggle = this.toggle.bind(this);
    
      this.state = {
        isOpen: false,
        selectedItem: 'About',
      };
    }
    
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
    
    updateMenuState(isOpen) {
      this.setState({ isOpen });
    }
    onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

    
    render(){
        const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
        return(
            <SideMenu menu={menu}
            isOpen={this.state.isOpen}
            onChange={(isOpen) => this.updateMenuState(isOpen)}>
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.pageBack}>
                        <TouchableOpacity style={styles.topLeft} onPress={() => {this.toggle()}}>
                                <FontAwesomeIcon icon="bars" size={32}/>
                        </TouchableOpacity>
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
                            <TouchableOpacity style={styles.sendButton} onPress={() => {this.toggle()}}>
                                <Text style={styles.sendText}>
                                    Transactions
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this.toggle()}}>
                            <View style={styles.bottomRight}>
                                <FontAwesomeIcon icon="cog" size={32}/>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SideMenu>
        );
    }
}
  
function Menu(){
    return(
        <View style={styles.sideBack}>
            <View style={{marginTop: 25}}/>
            <View style={styles.mainCircle}>
                <Text style={styles.circleText}>
                    Profile Pic
                </Text>
            </View>
            <View style={styles.sideMenuFields}>
                <Text style={styles.sideMenuText}>
                    Username
                </Text>
            </View>
            <View style={styles.sideMenuFields}>
                <Text style={styles.sideMenuText}>
                    $23.78
                </Text>
            </View>
            <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendText}>
                    Transfer
                </Text>
            </TouchableOpacity>
            <View style={styles.lineBreak}/>
            <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendText}>
                    Transactions
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const Drawer = createDrawerNavigator();
export default function User_Dash({route, navigation}) {
    const {session_cookie} = route.params;

  //const navigation = useNavigation();
  // loginUser wrapper class placeholder
  // firebase auth
  
  return (
    <Outer/>
  );
}