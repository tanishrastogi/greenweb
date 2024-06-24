import React, {useState, createRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiConfig from '../apiConfig';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');


const LoginScreen = ({navigation}) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
  
    const passwordInputRef = createRef();
    
    const handleSubmitPress = async() => {
      if (!userEmail) {
        alert('Please fill Email');
        return;
      }
      if (!userPassword) {
        alert('Please fill Password');
        return;
      }
      setLoading(true);
      const data = await fetch(`${apiConfig.baseURL}/api/user/login`, {
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({email:userEmail,password:userPassword})
      }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.data);
        if (responseJson.success){
          const user = responseJson.data;
          AsyncStorage.multiSet([['user_id', `${user._id}`], ['username', `${user.username}`], ['email', `${user.email}`], ['lastreadingid', `${user.readings[user.readings.length - 1]}`]]);
          navigation.replace('NavigatoionRoutes');
        } else {
          setErrortext(responseJson.msg);
          console.log('Please check your email id or password');
        }
      })
    };

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center', alignContent: 'center'}}>
              <Image
                source={require('../assets/greenweb.png')}
                style={{
                  width: 350,
                  height: 250,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.rbuttonStyle}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.buttonTextStyle}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lbuttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={[styles.buttonTextStyle,{color: 'black'}]}>Login</Text>
            </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FCFCE4',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  lbuttonStyle: {
    backgroundColor: '#4CCC92',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    width: '32%',
    marginLeft: 20,
    marginRight: 35,
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
   rbuttonStyle: {
    backgroundColor: '#757575',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    width: '32%',
    marginLeft: 45,
    marginRight: 35,
    marginTop: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonTextStyle: {
    color: 'white',
    paddingVertical: 5,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#FFDA89',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 5,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});