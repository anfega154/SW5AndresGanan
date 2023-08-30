import { StyleSheet, Text, View, useWindowDimensions,ScrollView } from 'react-native'
import React,{useState} from 'react'
import CostumInput from '../../components/CustomInput/CostumInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';

export default function ConfirmEmailScreen() {
    const [code, setCode] = useState('');
    const navigation = useNavigation();
 
    const onConfirmPressed = () => {
       navigation.navigate('Home');
    }
    const onSignUpPress = () => {
        navigation.navigate('SignIn')
    }
    const onResendPress = () => {
        console.warn('Resend code')
    }
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>Confirm your Email</Text>

      <CostumInput placeholder="Enter your confirmation code" value={code} setValue={setCode} />

      <CustomButton text="Confirm" onPress={onConfirmPressed}/>
       <CustomButton text="Resend code" onPress={onResendPress} type="SECONDARY"/>
       <CustomButton text="Back to sign in" onPress={onSignUpPress} type="TERTIARY"/>
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