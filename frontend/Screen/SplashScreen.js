import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';


const SplashScreen = ({navigation}) => {

  useEffect(() => {
    const checkUser = async () => {
      setTimeout(async () => {
        const userId = await AsyncStorage.getItem('user_id');
        navigation.replace(userId === null ? 'Auth' : 'NavigatoionRoutes');
      }, 5000);
    };
      checkUser();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/greenweb.png')}
        style={{
            width: 350,
            height: 250,
            resizeMode: 'contain',}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFCE4',
  },
});