import { StyleSheet, Text, Dimensions} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
const { width, height } = Dimensions.get('window');

const Card = ({factor, solution, index , cardcolor, cardcolor2}) => {
  return (
    <>
    {factor && <LinearGradient
                    colors={[`${cardcolor}`,`${cardcolor2}`]}
                    start={{ x: 0.04, y: 0.96 }}
                    end={{ x: 0.82, y: 0.18 }}
                    style={[styles.container,{justifyContent: 'space-evenly'}]}>
            <Text style={{color: 'white', fontSize: 15}}>{factor}</Text>
            <Text style={{color: 'white', fontSize: 13}}>Risk</Text>
            </LinearGradient>}
    {solution && <LinearGradient
                    colors={[`${cardcolor}`,`${cardcolor2}`]}
                    start={{ x: 0.04, y: 0.96 }}
                    end={{ x: 0.82, y: 0.18 }}
                    style={[styles.container,{justifyContent: 'center'}]}>
              <Text style={{color: 'white', fontSize: 15, alignSelf: 'center'}}>Solution</Text>
              <Text style={{color: 'white', fontSize: 30, alignSelf: 'center'}}>{index+1}</Text>
              </LinearGradient>}
  </>
  )
}

export default Card

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '95%',
        width: 90,
        padding: '4%',
        borderRadius: 15,
        margin: 5,
    }
})