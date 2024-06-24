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
} from 'react-native';


const RegisterScreen = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmUserPassword, setConfirmUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const confirmPasswordInputRef = createRef();

    const handleSubmitButton = async() => {
      if (!userName) {
        alert('Please fill Name');
        return;
      }
      if (!userEmail) {
        alert('Please fill Email');
        return;
      }
      if (!userPassword) {
        alert('Please fill Password');
        return;
      }
      if (!confirmUserPassword) {
        alert('Please fill Confirm Password');
        return;
      }
      if (userPassword != confirmUserPassword) {
        alert('Password does not matched');
        return;
      }
  
      setLoading(true);
      try{
        const data = await fetch(`${apiConfig.baseURL}/api/user/register` , { 
          method:"POST",
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify({username:userName , email:userEmail, password:userPassword})
        }).then((response) => response.json())
        .then((responseJson) => {
          setLoading(false);
          if (responseJson.success) {
            navigation.replace('LoginScreen');
          } else {
            setErrortext(responseJson.msg);
          }
        })
      }
      catch(error){
        console.log("error: "+error);
      }
    }
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
              onChangeText={(userName) =>
                setUserName(userName)
              }
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
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
              ref={emailInputRef}
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
              onSubmitEditing={() =>
                confirmPasswordInputRef.current &&
                confirmPasswordInputRef.current.focus()
              }
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(confirmUserPassword) =>
                setConfirmUserPassword(confirmUserPassword)
              }
              placeholder="Confirm Password"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              ref={confirmPasswordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              secureTextEntry={true}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <View style={{flexDirection: 'row',justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.rbuttonStyle}
            activeOpacity={0.5}
            onPress={() => handleSubmitButton()}>
            <Text style={styles.buttonTextStyle}>Sign up</Text>
          </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  </View>
  )
}

export default RegisterScreen

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
})