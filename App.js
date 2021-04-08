import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigator from './routes/navigator'
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faBars} from '@fortawesome/free-solid-svg-icons'

library.add(faCog);
library.add(faBars);
//initialize firebase
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

export default class App extends React.Component{
  render(){
    return (
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    );
  }
};
