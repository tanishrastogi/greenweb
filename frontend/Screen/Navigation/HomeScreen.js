import { TouchableOpacity, StyleSheet, Text, View,ScrollView, Modal, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import CardGardient from '../Component/CardGardient';
import DoughnutChart from '../Component/DoughnutChart';
import React, {useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import apiConfig from '../../apiConfig';
const { width, height } = Dimensions.get('window');

  
const HomeScreen = () => {
    const [reading, setReading] = useState();
    const [carbon, setCarbon] = useState(0);
    const [threshold, setThreshold] = useState(0);
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [selectedSolution, setSelectedSolution] = useState(null);

    const openModal = (solution) => {
        setSelectedSolution(solution);
    };

    const closeModal = () => {
        setSelectedSolution(null);
    };
    const chartData = [
        { percent: 10, color: '#4BCB91' },
        { percent: 20, color: '#FACD67' },
      ]; 
      useEffect(() => {
        const fetchuser = async () => {
            const username = await AsyncStorage.getItem('username');
            const userid = await AsyncStorage.getItem('user_id');
            setUserId(userid);
            setUserName(username);
        }
        fetchuser();
      }, []);

      useFocusEffect(
        React.useCallback(() => {
          const fetchReadingsById = async () => {
            const readingID = await AsyncStorage.getItem('lastreadingid');
              try {
                const response = await fetch(`${apiConfig.baseURL}/api/user/fetch/readings/id`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ readingID }),
                }).then((response) => response.json())
                .then((responseJson) => {
                  if (responseJson.success){
                    setReading(responseJson.data);
                    setCarbon(responseJson.data.carbon_emission);
                    setThreshold(responseJson.data.threshold);
                    console.log(reading);
                  } else {
                    console.log('Error fetching readings');
                  }
              })
             } catch (error) {
                console.error('Error fetching readings:', error.message);
                throw error;
            }
          }
          fetchReadingsById();
        }, [])
      );
  return (
    <View style={styles.container}>
    <LinearGradient
              colors={['#FFD67C','#FFDD93','#FFD67C']}
              start={{ x: 0.54, y: 0.96 }}
              end={{ x: 0.82, y: 0.18 }}
              style={styles.header}>
        <TouchableOpacity style ={{marginBottom: 5, }} onPress={() => {AsyncStorage.clear();navigation.replace('Auth');}}><Icon name='exit-outline' size={40}/></TouchableOpacity>
        <Text style={{ width:180, textAlign: 'center', textTransform: 'capitalize'}}>Hii {userName} You’re on track to decrease the carbon emission by</Text>
        <Text style={{fontSize: height*0.05}}>73%</Text>
    </LinearGradient>
    { reading && 
    <LinearGradient
              colors={['#FFDD93','#FFD67C']}
              start={{ x: 0.04, y: 0.96 }}
              end={{ x: 0.82, y: 0.18 }}
              style={styles.card}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {reading && <View style={{marginTop: -15}}>
                <Text style={{position: 'relative', top:70, left:30, width: 50}}>{reading.carbon_emission} kg CO2</Text>
                <DoughnutChart size={100} strokeWidth={15} data={[{ percent: reading.carbon_emission, color: '#4BCB91' },{ percent: (reading.carbon_emission-reading.threshold), color: '#FACD67' }]} />
            </View>}
        <View style={styles.innercard}>
            <Text>Carbon Emmission</Text>
            {reading && <Text>{reading.carbon_emission} kg CO2</Text>}
            <Text>Threshold</Text>
            {reading && <Text style={{flex:1, justifyContent: 'center'}}>{reading.threshold} kg CO2</Text>}
        </View>
        </View>
        <View style={styles.cardcontainer}>
        {(reading && reading.solutions) ? reading.solutions.slice(0, 2).map((solution, index) => (
            <TouchableOpacity onPress={() => openModal(solution)}>
                <CardGardient title={'Solution'} number={73} condition={'Technological'} cardcolor={'#55DB9D'} cardcolor2={'#4BCB91'} width={100}/> 
            </TouchableOpacity>
            )):
            <>
            <CardGardient title={'ENGINE'} number={73} condition={'Good'} cardcolor={'#55DB9D'} cardcolor2={'#4BCB91'} width={100}/>
            <CardGardient title={'VEHICLE AGE'} number={73} condition={'Good'} cardcolor={'#55DB9D'} cardcolor2={'#4BCB91'} width={100}/>
            </>
            }
            <View style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <TouchableOpacity  style={[styles.button, {backgroundColor: carbon > threshold ? 'red' : '#55DB9D'}]}>
                    {carbon > threshold ? <Text style={{color: 'white'}}> High Risk </Text> : <Text style={{color: 'white'}} > Low Risk </Text>}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: '#55DB9D'}]} onPress={() => { navigation.navigate('Result');}}>
                    <Text style={{color: 'white'}}>Evaluate</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={selectedSolution !== null}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.0)' }}>
                <View style={{ backgroundColor: '#4BCB91', marginHorizontal: 10, padding: 20, borderRadius: 10, elevation: 5}}>
                    <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'flex-end' }}>
                    <Icon name='close-outline' size={35} color='white'/>
                    </TouchableOpacity>
                    <Text style={{ fontSize: height*0.03, fontWeight: 'bold', marginTop: 5, color: 'white' }}>Solution:</Text>
                    <Text style={{ fontSize: height*0.02, marginTop: 5, color: 'white' }}>{selectedSolution}</Text>
                </View>
                </View>
            </Modal>
        </View>
    </LinearGradient>
    }
    { reading && <View style={styles.feature}>
    <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          >
            {(reading && reading.factors) ? reading.factors.map((factor) => (
                <CardGardient title={factor}condition={'Risk'} cardcolor={'#FF5150'} cardcolor2={'#FB7D7D'} width={110}/>
            )):
            <>
                <Text style={{alignSelf: 'center',fontSize: height*0.02}}>Everything is fine no factors identified.</Text>
            </>
        } 
      </ScrollView>
      </View>}
    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: '2%'}}>
    { reading && <TouchableOpacity style={styles.ResultCard} onPress={() => { navigation.navigate('Result');}}>
            <Text style={{color: 'white',fontSize: height*0.02}}>Results :</Text>
            {carbon < threshold ?
            <Text style={{color: 'white', fontSize: height*0.017}}>Your current carbon footprint of {carbon} falls within the recommended range. This indicates efficient energy usage! Keep up the good work.</Text>
            :<Text style={{color: 'white', fontSize: height*0.017}}>Your carbon footprint exceeds the threshold {threshold}, it suggests potential areas for improvement. Consider exploring ways to reduce your environmental impact.</Text>
            }
        </TouchableOpacity>}
        <TouchableOpacity style={reading ? styles.testcar : styles.testnew} onPress={() => { navigation.navigate('TestCar');}}>
            <Text style={{color: 'white', fontSize:reading ? 10 : 20}}>Test Car</Text>
            <Icon name='add-circle-outline' size={reading ? 30 : 40} color='white'/>
        </TouchableOpacity>
    </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        backgroundColor: '#FFC649',
        marginHorizontal: 20,
        height: height*0.13,
        width: width*0.9,
        padding: '2%',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius:20,
    },
    card: {
        alignSelf: 'center',
        marginTop: '2%',
        height: height*0.32,
        width: width*0.9,
        padding: '2%',
        borderRadius: 20,
        backgroundColor: '#FFC649',
    },
    innercard: {
        marginTop: 20,
        height: 110,
        width: 160,
        borderRadius: 10,
        padding: 12,
        borderWidth:1,
        borderColor: 'black',
        backgroundColor: '#FFC8',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width*0.25, 
        height: 25, 
        borderRadius:7,
    },
    feature: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', 
        marginTop: '2%',
        padding: '2%',
        backgroundColor:'#fcedca', 
        height: height*0.25,
        width: width*0.9,
        borderRadius:20, 
        borderWidth:1, 
        borderColor: 'black'
    },
    ResultCard: {
        backgroundColor: '#4BCB91',
        width: width*0.6,
        height: 120,
        borderRadius: 20,
        padding: 10,
    },
    testcar: {
        display: 'flex', 
        justifyContent: 'center', 
        backgroundColor: '#55DB9D', 
        height: height*0.1, 
        width: width*0.2, 
        borderRadius: 10, 
        alignItems: 'center'
    },
    testnew: {
        display: 'flex', 
        justifyContent: 'space-evenly', 
        backgroundColor: '#55DB9D', 
        height: height*0.4, 
        width: width*0.6, 
        borderRadius: 10, 
        alignItems: 'center', 
        flexDirection: 'row',
    },
    cardcontainer: {
        flexDirection: 'row',
        height:height*0.14, 
        justifyContent: 'space-around',
        marginTop: '2%', 
    },
});