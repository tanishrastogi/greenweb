import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Navigation/HomeScreen';
import Results from './Navigation/Results';
import TestCar from './Navigation/TestCar';

const Tab = createBottomTabNavigator();

const NavigationRoutes = () => {
  return (
    <View style={styles.container}>
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarStyle: styles.tabBarStyle,
                tabBarIcon: ({ focused}) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'TestCar') {
                    iconName = 'car';
                } else if (route.name === 'Result') {
                    iconName = 'list';
                }
                const iconSize = focused ? 40 : 30;

                return <Icon name={iconName} size={iconSize} color="black" />;
                },
                headerShown: false,
                tabBarShowLabel: false,
            })}
            >
            <Tab.Screen 
                name="Home" 
                children={() => <HomeScreen/>}
            />
            <Tab.Screen 
                name="TestCar" 
                children={() => <TestCar/>}
            />
            <Tab.Screen 
                name="Result" 
                children={() => <Results/>}
            />
        </Tab.Navigator>
    </View>
  )
}

export default NavigationRoutes

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      tabBarStyle: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10, 
        zIndex: 0,
        backgroundColor: '#fcedca',
      },
  });