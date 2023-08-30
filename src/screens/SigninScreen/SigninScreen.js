import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../Resources/Images/logo.png'
import CostumInput from '../../components/CustomInput/CostumInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSigniniButtons from '../../components/SocialSigninButtons/SocialSigniniButtons';
import { useNavigation } from '@react-navigation/native';
import { validateCredentials, getUsers, DropTables } from '../../../database/dbMethods'

export default function SigninScreen() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { width, height } = useWindowDimensions()
  const navigation = useNavigation();

  const onSignInPressed = () => {
    (userName == '' || password == '')
      ? console.warn("Todos los campos username y password son obligatorios")
      : validateCredentials(userName, password)
        .then((isValid) => {
          if (isValid) {
            console.warn('Credenciales válidas. Inicio de sesión exitoso.');
            navigation.navigate('Home');
          } else {
            console.error('Credenciales inválidas. Inicio de sesión fallido.');
          }
        })
        .catch((error) => {
          console.error('Error al validar las credenciales:', error);
        });
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  }

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  }
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.root}>

        <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />
        <CostumInput placeholder="Username" value={userName} setValue={setUserName} />
        <CostumInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
        <CustomButton text="Sign in" onPress={onSignInPressed} />
        <CustomButton text="Forgot password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
        <SocialSigniniButtons />
        <CustomButton text="don´t have a account? Create a" onPress={onSignUpPress} type="TERTIARY" />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '70%',
    maxWidth: 200,
  },
  root: {
    alignItems: 'center',
    padding: 20,
  }
})