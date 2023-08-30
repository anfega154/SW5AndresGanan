import { StyleSheet, Text, View, SafeAreaView ,Image,useWindowDimensions} from 'react-native'
import React from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../Resources/Images/start.png'
import {createTables} from '../../../database/dbMethods'

export default function WelcomeScreen() {
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation()

    const getStarted = () => {
            createTables();
        navigation.navigate('SignIn')
    };
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.container}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain'/>
                <Text style={styles.title}>¡Welcome to Control App!</Text>
                <Text style={styles.subtitle}>Explore and enjoy our app.</Text>
                <CustomButton text="GET STARTED" onPress={getStarted} />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
    },
    root: {
        flex: 1,
        backgroundColor: '#F9FBFC'
    },
    logo: {
        width: '70%',
        maxWidth: 200,
    }
});
