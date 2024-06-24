import { StyleSheet, Text, View,Dimensions} from 'react-native'
import { LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'
const { width, height } = Dimensions.get('window');

const CardGardient = ({title, condition , cardcolor, cardcolor2, width}) => {
  return (
      <LinearGradient
              colors={[`${cardcolor}`,`${cardcolor2}`]}
              start={{ x: 0.04, y: 0.96 }}
              end={{ x: 0.82, y: 0.18 }}
              style={[styles.container,{width:width}]}>
        <Icon name='car' size={20} color='white'/>
        <Text style={{color: 'white', fontSize: 18}}>{title}</Text>
        <Text style={{color: 'white', fontSize: 13}}>{condition}</Text>
      </LinearGradient>
  )
}

export default CardGardient

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-evenly',
        height: '85%',
        padding: '4%',
        borderRadius: 15,
        margin: 5,
    },
})