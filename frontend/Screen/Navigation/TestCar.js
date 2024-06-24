import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View,Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Dimensions  } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import apiConfig from '../../apiConfig';
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window');


const TestCar = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [formData, setFormData] = useState({
        userID: '',
        vehicle_age: 0,
        fuel_consumption : 0,
        average_speed : 0,
        vehicle_load : 0,
        tyre_pressure: 0,
        make: '',
        model: '', 
        vehicle_class: '', 
        engine_size: 0, 
        cylinders: 0, 
        distance_travelled: 0, 
        fuel_type: '' 
    });

      useEffect(() => {
        const fetchuser = async () => {
            const username = await AsyncStorage.getItem('username');
            const userid = await AsyncStorage.getItem('user_id');
            setUserId(userid);
            setUserName(username);
        }
        fetchuser();
      }, []);

      const handleChange = (name, value) => {
        if (!isNaN(value)) {
          value = parseFloat(value);
        }
        setFormData({
          ...formData,
          [name]: value
        });
      };
      

      const handleSubmit = async () => {
        const numericFields = ['vehicleAge', 'fuelConsumption', 'averageSpeed', 'vehicleLoad', 'tyrePressure', 'engineSize', 'cylinders', 'distance_travelled'];
        const numericFormData = { ...formData };
        numericFields.forEach(field => {
          if (!isNaN(numericFormData[field])) {
            numericFormData[field] = parseFloat(numericFormData[field]);
          }
        });
      
        numericFormData.userID = userId;
      
        const data = await fetch(`${apiConfig.baseURL}/api/model/pyScript`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(numericFormData)
        }).then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.success) {
              console.log(responseJson.data._id);
              AsyncStorage.setItem('lastreadingid',responseJson.data._id);
              navigation.navigate('Result');
            } else {
              console.error('Failed to fetch data');
            }
          })
          .catch(error => {
            console.error('Error while fetching data:', error);
          });
      };
      

  return (
    <View style={{flex: 1}}>
    <LinearGradient
              colors={['#FFD67C','#FFDD93','#FFD67C']}
              start={{ x: 0.54, y: 0.96 }}
              end={{ x: 0.82, y: 0.18 }}
              style={styles.header}>
        <TouchableOpacity style ={{marginBottom: 5}} onPress={() => navigation.navigate('Home')}><Icon name='arrow-back' size={30}/></TouchableOpacity>
        <Text style={{ width:180, textAlign: 'center', textTransform: 'capitalize'}}>Hii {userName} You’re on track to decrease the carbon emission by</Text>
        <Text style={{fontSize: 35}}>73%</Text>
    </LinearGradient>
    <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          style={styles.form}
    >
        <Text style={{alignSelf: 'center', marginTop: 10, color: 'black', fontSize:25}}>Vehicle Data</Text>
        <View style={styles.container}>
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Vehicle Age</Text>
            <TextInput
                style={styles.input}
                placeholder="Vehicle Age"
                value={formData.vehicle_age}
                onChangeText={(text) => handleChange('vehicle_age', text)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Fuel Consumption</Text>
            <TextInput
                style={styles.input}
                placeholder="Fuel Consumption"
                value={formData.fuel_consumption}
                onChangeText={(text) => handleChange('fuel_consumption', text)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Average Speed</Text>
            <TextInput
                style={styles.input}
                placeholder="Average Speed"
                value={formData.average_speed}
                onChangeText={(text) => handleChange('average_speed', text)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Vehicle Load</Text>
            <TextInput
                style={styles.input}
                placeholder="Vehicle Load"
                value={formData.vehicle_load}
                onChangeText={(text) => handleChange('vehicle_load', text)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Distance Travelled</Text>
            <TextInput
                style={styles.input}
                placeholder="Distance Travelled"
                value={formData.distance_travelled}
                onChangeText={(text) => handleChange('distance_travelled', text)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Tyre Pressure</Text>
            <TextInput
                style={styles.input}
                placeholder="Tyre Pressure"
                value={formData.tyre_pressure}
                onChangeText={(text) => handleChange('tyre_pressure', text)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Make</Text>
            <ModalDropdown
                style={styles.dropdown}
                options={['ACURA','ALFA ROMEO','ASTON MARTIN','LAND ROVER','LEXUS','LINCOLN','MASERATI',
                    'AUDI','BENTLEY','BMW','BUICK','CADILLAC','CHEVROLET','CHRYSLER','DODGE','FIAT',	
                    'FORD','GMC','HONDA','HYUNDAI','INFINITI','JAGUAR',	'JEEP',	'KIA','LAMBORGHINI',
                    'MERCEDES-BENZ','MINI','MITSUBISHI','NISSAN','PORSCHE','RAM','ROLLS-ROYCE','MAZDA',
                    'SCION','SMART','SRT','SUBARU','TOYOTA','VOLKSWAGEN','VOLVO','GENESIS','BUGATTI']} 
                onSelect={(index, value) => handleChange('make', value)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Model</Text>
            <TextInput
                style={styles.input}
                placeholder="Model"
                value={formData.model}
                onChangeText={(text) => handleChange('model', text)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Vehicle Class</Text>
            <ModalDropdown
                style={styles.dropdown}
                options={['COMPACT','MID-SIZE','SUV - SMALL','TWO-SEATER','MINICOMPACT','SUBCOMPACT',
                    'FULL-SIZE', 'STATION WAGON - SMALL','SUV - STANDARD', 'PICKUP TRUCK - SMALL',
                    'PICKUP TRUCK - STANDARD','SPECIAL PURPOSE VEHICLE','VAN - CARGO','VAN - PASSENGER',
                    'MINIVAN','STATION WAGON - MID-SIZE']} 
                onSelect={(index, value) => handleChange('vehicle_class', value)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Engine Size</Text>
            <ModalDropdown
                style={styles.dropdown}
                options={['0.9','1','2.0','2.4','1.5','3.5','3','4','6','4.4','2.5','3.6','2.7','6.2',	
                        '1.4','1.8','1.6','3.3','5','4.7','5.5','1.2','6.7','6.6','3.7','2.9','6.8','5.7',	
                        '6.4','2.3','5.6','4.6','3.4','2.1','3.2','1.3','3.8','2.2','4.2','5.2','8','8.4',
                        '6.5','5.9','5.8','6.3','4.8','5.3','5.4','2.8','4.3']} 
                onSelect={(index, value) => handleChange('engine_size', value)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Cylinders</Text>
            <ModalDropdown
                style={styles.dropdown}
                options={['3', '4','5', '6','8','10','12','16']} 
                onSelect={(index, value) => handleChange('cylinders', value)}
            />
            <Text style={{alignSelf: 'flex-start', color: 'black', fontSize:14}}>Fuel Type</Text>
            <ModalDropdown
                style={styles.dropdown}
                options={['X', 'Z', 'D', 'E', 'N']} 
                onSelect={(index, value) => handleChange('fuel_type', value)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
  )
}


export default TestCar

const styles = StyleSheet.create({
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
    form: {
        alignSelf: 'center',
        marginTop: 20, 
        marginBottom: 20,
        backgroundColor:'#fcedca', 
        width: width*0.9, 
        borderRadius:20, 
        borderWidth:1, 
        borderColor: 'black',
    },
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
    input: {
        height: height*0.05,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    dropdown: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        height: height*0.05,
        marginTop: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: width*0.3, 
        height: height*0.05,
        borderRadius:7,
        backgroundColor: '#FFC649',
    },
})