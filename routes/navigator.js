import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
//import Signup from '../screens/signup';
import Password from '../screens/password';
import Signup_Merchant from '../screens/signup_merchant';
import { AppRegistry } from 'react-native';
import {name as appName} from '../app.json';
AppRegistry.registerComponent(appName, () => App);
const AppStack = createStackNavigator();
export default function Navigator(){

    return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false}} >
        <AppStack.Screen name='Signup_Merchant' component={Signup_Merchant}/>
        <AppStack.Screen name="Login" component={Login}/>
        <AppStack.Screen name="Password" component={Password}/>
      </AppStack.Navigator>
    </NavigationContainer>
    );
}