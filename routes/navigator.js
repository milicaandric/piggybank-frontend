import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Password from '../screens/password';
import Signup_Merchant from '../screens/signup_merchant';
import Signup_Customer from '../screens/signup_customer';
import User_Dash from '../screens/user_dash';
import Merchant_Dash from '../screens/merchant_dash';
import Swap_Bank from '../screens/swap_bank';
import Transfer_To_Bank from '../screens/transfer_to_bank';
import Add_Bank from '../screens/add_bank';
import Remove_Bank from '../screens/remove_bank';
import updateAccount from '../screens/updateAccount';
import updateEmail from '../screens/updateEmail';
import updatePassword from '../screens/updatePassword';

import { AppRegistry } from 'react-native';
import {name as appName} from '../app.json';
AppRegistry.registerComponent(appName, () => App);
const AppStack = createStackNavigator();
export default function Navigator(){

    return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false}} >
        <AppStack.Screen name="Login" component={Login}/>
        <AppStack.Screen name="User_Dash" component={User_Dash}/>
        <AppStack.Screen name="Merchant_Dash" component={Merchant_Dash}/>
        <AppStack.Screen name='Signup_Merchant' component={Signup_Merchant}/>
        <AppStack.Screen name='Signup_Customer' component={Signup_Customer}/>
        <AppStack.Screen name="Password" component={Password}/>
        <AppStack.Screen name="Remove_Bank" component={Remove_Bank}/>
        <AppStack.Screen name="Swap_Bank" component={Swap_Bank}/>
        <AppStack.Screen name="Add_Bank" component={Add_Bank}/>
        <AppStack.Screen name="Transfer_To_Bank" component={Transfer_To_Bank}/>
        <AppStack.Screen name="updateAccount" component={updateAccount}/>
        <AppStack.Screen name="updateEmail" component={updateEmail}/>
        <AppStack.Screen name="updatePassword" component={updatePassword}/>
      </AppStack.Navigator>
    </NavigationContainer>
    );
}