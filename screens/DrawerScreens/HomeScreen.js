import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

import MapView, {Marker} from 'react-native-maps'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = (navigation) => {
const [userdata, setUserData] = useState('');

const retrieveData = async () => {
  try {
    await AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
      setUserData(value);
    });
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  retrieveData()
}, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 16,
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              Welcome 
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 16,
              color: 'black',
              fontWeight: 'bold',
              fontStyle: 'italic',
              textTransform: 'uppercase'
            }}>
            {userdata.firstname}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});
 
export default HomeScreen;