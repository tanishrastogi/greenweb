import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../Component/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import apiConfig from '../../apiConfig';
const { width, height } = Dimensions.get('window');


const Results = () => {
  const navigation = useNavigation();
  const [reading, setReading] = useState();
  const [selectedSolution, setSelectedSolution] = useState(null);

  const openModal = (solution) => {
    setSelectedSolution(solution);
  };

  const closeModal = () => {
    setSelectedSolution(null);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchReadingsById = async () => {
        const readingID = await AsyncStorage.getItem('lastreadingid');
        console.log(readingID);
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
                console.log(reading);
              } else {
                console.log('Please check your email id or password');
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
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}><Icon name='arrow-back' size={30}/></TouchableOpacity>
        <Text style={{  width:160, textAlign: 'center', fontSize: 25}}>Results</Text>
        <Text></Text>
      </View>
      {reading ? <View style={styles.form}>
      <Text style={{padding: '2%',fontSize: 20}}>HIGH RISK FACTORS</Text>
      <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          style={styles.list}
          >
      {(reading && reading.factors) ? reading.factors.map((factor) => (
        <Card factor={factor} cardcolor={'#FF5150'} cardcolor2={'#FB7D7D'}/> 
      )):
      <>
          <Text style={{alignSelf: 'center',fontSize: 18}}>Everything is fine no factors identified.</Text>
      </>
      }
      </ScrollView>
      <Text style={{padding: '2%',fontSize: 20}}>SOLUTIONS</Text>
      <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          style={styles.list}
          >
          {(reading && reading.solutions) ? reading.solutions.map((solution, index) => (
            <TouchableOpacity onPress={() => openModal(solution)}>
            <Card solution={solution} index={index} cardcolor={'#4BCB91'} cardcolor2={'#4BCB91'}/>
            </TouchableOpacity>
          )):
          <>
              <Text style={{alignSelf: 'center',fontSize: 18}}>Everything is fine.</Text>
          </>
          }
      </ScrollView>
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5, color: 'white' }}>Solution:</Text>
                    <Text style={{ fontSize: 16, marginTop: 5, color: 'white' }}>{selectedSolution}</Text>
                </View>
                </View>
            </Modal>
            <Text style={styles.quantifiedData}>Quantified Data</Text>
            <View style={styles.quantifiedlist}>
            <View style={styles.dataRow}>
                <Text style={styles.dataListText}>Car details: </Text>
                <Text style={styles.dataListText}>{reading.userInput.make} {reading.userInput.model} {reading.userInput.vehicle_class}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataListText}>Vehicle Age :</Text>
                <Text style={styles.dataListText}>{reading.userInput.vehicle_age} years</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataListText}>Average Speed :</Text>
                <Text style={styles.dataListText}>{reading.userInput.average_speed} km/h</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataListText}>Fuel Consumption :</Text>
                <Text style={styles.dataListText}>{reading.userInput.fuel_consumption} L/km</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataListText}>Vehicle Load :</Text>
                <Text style={styles.dataListText}>{reading.userInput.vehicle_load} kg</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataListText}>Tyre Pressure :</Text>
                <Text style={styles.dataListText}>{reading.userInput.tyre_pressure} msi</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataListText}>Distance Travelled :</Text>
                <Text style={styles.dataListText}>{reading.userInput.distance_travelled} km</Text>
              </View>
              <View style={styles.line} />
              <View style={styles.dataRow}>
                <Text style={styles.dataListText}>Threshold :</Text>
                <Text style={styles.dataListText}>{reading.threshold} Kg</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataListText}>Carbon Emission :</Text>
                <Text style={styles.dataListText}>{reading.carbon_emission} kg</Text>
              </View>
            </View>
      </View>
    :
    <View style={[styles.form,{display: 'flex',justifyContent: 'center'}]}>
    <Text style={{alignSelf: 'center', fontSize: 15}}>No Results found</Text> 
    </View> 
    }
    </View>
  )
}

export default Results

const styles = StyleSheet.create({
container: {
    flex:1,
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: '4%',
    height: height*0.1,
    width: width*0.9,
},
form: {
  alignSelf: 'center',
  marginTop: 20, 
  backgroundColor:'#fcedca', 
  height: height*0.75,
  width: width*0.9,
  borderRadius:20, 
  borderWidth:1, 
  borderColor: 'black',
  marginBottom: 10,
},
list: {
  paddingHorizontal: '2%',
  height: '30%',
},
quantifiedlist: {
  padding: '2%',
  height: '43%',
  marginVertical: '3%',
  marginHorizontal: '4%',
  borderColor: 'black',
  borderStyle: 'solid',
  borderWidth: 1,
  borderRadius: 10 ,
},
quantifiedData: {
  fontSize: height*0.02,
  padding: '2%',
},
dataRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 5,
},
dataListText: {
  fontSize: height*0.016,
},
line: {
  height: 1,
  backgroundColor: 'black',
},
})