import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from '../screens/SigninScreen/SigninScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/welcomeScreen/WelcomeScreen';
import FormControl from '../screens/FormControl/FormControl';
import RecordScreen from '../screens/RecordScreen/RecordScreen';
import NewScreen from '../screens/NewScreen/NewScreen';


const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SigninScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FormControl" component={FormControl} />
      <Stack.Screen name="RecordScreen" component={RecordScreen} />
      <Stack.Screen name="NewScreen" component={NewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})