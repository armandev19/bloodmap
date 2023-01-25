import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUserData, setUserData } from '../redux/navSlice';

const HomeScreen = ({navigation, props}) => {
  const [userData, setUserData] = useState('');
  const getUserData = async () => {
    try {
      await AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
        setUserData(value);
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserData();
    console.log("user_data", userData);
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
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});
 
export default HomeScreen;