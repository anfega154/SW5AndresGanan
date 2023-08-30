
import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import Header from './src/components/Header/Header';
import Navigation from './src/Navigation';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <Header/>
     <Navigation/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
    backgroundColor: '#F9FBFC',
    paddingHorizontal:5,
  }
 
});

export default App;
