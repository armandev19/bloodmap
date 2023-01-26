import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation, props}) => {
  const [userData, setUserData] = useState('');
 
  useFocusEffect(
    React.useCallback(() => {
        setTimeout(async () => {
            try {
                const userData = await AsyncStorage.getItem('user_id');
                if (userData !== null) {
                    let userDataArray = JSON.parse(userData);
                    setUserData(userDataArray);
                }
            } catch (e) {
                console.log(e);
            }
        });
        
    console.log(userData);
    }, [])
  );
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
              Welcome {userData.firstname}
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