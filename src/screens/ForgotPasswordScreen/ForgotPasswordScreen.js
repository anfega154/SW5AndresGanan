import { StyleSheet, Text, View, useWindowDimensions,ScrollView } from 'react-native'
import React,{useState} from 'react'
import CostumInput from '../../components/CustomInput/CostumInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';

export default function ForgotPasswordScreen() {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();
 
    const onSendPressed = () => {
        navigation.navigate('NewPassword');
    }
    const onSignInPress = () => {
        navigation.navigate('SignIn')
    }
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>Reset your password</Text>

      <CostumInput placeholder="Username" value={username} setValue={setUsername} />

      <CustomButton text="Send" onPress={onSendPressed}/>
       <CustomButton text="Back to sign in" onPress={onSignInPress} type="TERTIARY"/>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding:20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        textAlign: 'center',
        margin: 10,
    },
    text: {
color:'gray',
marginVertical:10
    },
    link: {
        color: '#FDB075',
    },
})