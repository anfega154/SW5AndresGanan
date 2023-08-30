import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CostumInput from '../../components/CustomInput/CostumInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSigniniButtons from '../../components/SocialSigninButtons/SocialSigniniButtons';
import { useNavigation } from '@react-navigation/native';
import {insertUser} from '../../../database/dbMethods'

export default function SignUpScreen() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const navigation = useNavigation();

    const onRegisterPressed = async () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        if (password !== passwordRepeat) {
            console.warn('Las contraseñas no coinciden');
            return;
        }
        
        if (userName === '' || password === '' || email === '' || passwordRepeat === '') {
            console.warn('Todos los datos son obligatorios');
            return;
        }
        
        if (!regex.test(password)) {
            console.warn('La contraseña no cumple con los criterios mínimos');
            return;
        }
        if (!emailRegex.test(email)) {
            console.warn('Ingresa un correo electrónico válido');
            return;
        }
        try {
            await insertUser(userName, email, password); 
            navigation.navigate('ConfirmEmail');
          } catch (error) {
            console.error('No se pudo crear el usuario:', error[1]);
          }
    };
    
    const onSignUpPress = () => {
        navigation.navigate('SignIn')
    }
    const OnTerms = () => {
        console.warn('Terms')
    }
    const OnPrivacy = () => {
        console.warn('Privacy')
    }
    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create an account</Text>

                <CostumInput placeholder="Username" value={userName} setValue={setUserName} />

                <CostumInput placeholder="Email" value={email} setValue={setEmail} />

                <CostumInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />

                <CostumInput placeholder="Repeat Password" value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry={true} />

                <CustomButton text="Register" onPress={onRegisterPressed} />

                <Text style={styles.text}>Registrandose, confirmas que aceptas nuestros{' '}

                    <Text style={styles.link} onPress={OnTerms}>terminos de uso{' '}</Text>y

                    <Text style={styles.link} onPress={OnPrivacy}>{' '}politicas de privacidad.</Text></Text>

                <SocialSigniniButtons />
                <CustomButton text="Already have an account?, Log In" onPress={onSignUpPress} type="TERTIARY" />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        textAlign: 'center',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10
    },
    link: {
        color: '#FDB075',
    },
})