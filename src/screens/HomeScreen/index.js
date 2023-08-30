import { StyleSheet, Text, View,useWindowDimensions,Image } from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import mina from '../../../Resources/Images/mina.png'
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const { width, height } = useWindowDimensions()
  const navigation = useNavigation();

  const onSignUpPress = () => {
    navigation.navigate('SignIn')
}
const onForm = () => {
  navigation.navigate('FormControl')
}
const onRecord = () => {
  navigation.navigate('RecordScreen')
}

const onNews = () => {
  navigation.navigate('NewScreen')
}

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Take Control</Text>
      <Image source={mina} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain'/>
      <CustomButton text="Take a register" onPress={onForm} type="LINK" />
      <CustomButton text="list records" type="LINK" onPress={onRecord} />
      <CustomButton text="Enter news" type="LINK"  onPress={onNews}/>
      <CustomButton text="logout ☹" onPress={onSignUpPress} type="TERTIARY" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
    margin: 10
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', 
  },
  logo: {
    width: '70%',
    maxWidth: 200,
}
});
