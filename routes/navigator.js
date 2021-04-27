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
import About from '../screens/about';
import Transfer_To_Bank from '../screens/transfer_to_bank';
import Add_Bank from '../screens/add_bank';
import Remove_Bank from '../screens/remove_bank';
import Update_Email from '../screens/update_email';
import Update_Privacy from '../screens/update_privacy';
import Update_Username from '../screens/update_username';
import Settings_Customer from '../screens/settings_customer';
import Settings_Merchant from '../screens/settings_merchant';

import { AppRegistry } from 'react-native';
import {name as appName} from '../app.json';
AppRegistry.registerComponent(appName, () => App);
const AppStack = createStackNavigator();
export default function Navigator(){

    return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false}} >
        <AppStack.Screen name="Login" component={Login}/>
        <AppStack.Screen name="User_Dash" component={User_Dash} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Merchant_Dash" component={Merchant_Dash} options={{gestureEnabled: false}}/>
        <AppStack.Screen name='Signup_Merchant' component={Signup_Merchant} options={{gestureEnabled: false}}/>
        <AppStack.Screen name='Signup_Customer' component={Signup_Customer} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Password" component={Password} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Remove_Bank" component={Remove_Bank} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Swap_Bank" component={Swap_Bank} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="About" component={About} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Add_Bank" component={Add_Bank} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Transfer_To_Bank" component={Transfer_To_Bank} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Update_Email" component={Update_Email} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Update_Privacy" component={Update_Privacy} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Settings_Customer" component={Settings_Customer} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Settings_Merchant" component={Settings_Merchant} options={{gestureEnabled: false}}/>
        <AppStack.Screen name="Update_Username" component={Update_Username} options={{gestureEnabled: false}}/>
      </AppStack.Navigator>
    </NavigationContainer>
    );
}