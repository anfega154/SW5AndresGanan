import { StyleSheet, Text, View, useWindowDimensions,ScrollView } from 'react-native'
import React,{useState} from 'react'
import CostumInput from '../../components/CustomInput/CostumInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';

export default function NewPasswordScreen() {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigation = useNavigation();
 
    const onSubmitPressed = () => {
        navigation.navigate('Home');
    }
    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    }
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>Reset your password</Text>

      <CostumInput placeholder="Code" value={code} setValue={setCode} />
      <CostumInput placeholder="Enter your new password" value={newPassword} setValue={setNewPassword} />

      <CustomButton text="Submit" onPress={onSubmitPressed}/>
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