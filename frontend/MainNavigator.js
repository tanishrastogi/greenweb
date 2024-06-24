import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import NavigationRoutes from './Screen/NavigationRoutes';


const Stack = createStackNavigator();

const Auth = () => {
    const forFade = ({ current }) => ({
      cardStyle: {
        opacity: current.progress,
      },
    });
  
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false, cardStyleInterpolator: forFade }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: 'Sign Up',
            headerStyle: {
              backgroundColor: '#FCFCE4',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'regular',
            },
            cardStyleInterpolator: forFade,
          }}
        />
      </Stack.Navigator>
    );
  };

const MainNavigator = () => {
    const forFade = ({ current }) => ({
      cardStyle: {
        opacity: current.progress,
      },
    });
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false, cardStyleInterpolator: forFade }}
          />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NavigatoionRoutes"
          component={NavigationRoutes}
          options={{headerShown: false}}
        />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default MainNavigator;