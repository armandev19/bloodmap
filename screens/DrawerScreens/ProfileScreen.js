import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Avatar, Card, Title, Paragraph, Button } from 'react-native-paper';

const ProfileScreen = ({navigation}) => {
  const [userData, setUserData] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true

      const fetchList = async () => {
        try {
          await AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
            setUserData(value);
          });
        } catch (error) {
          console.log(error);
        }
      }

      fetchList()

      return () => {
        isActive = false
      }
    }, []),
  );
  
  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={{flex: 1, padding: 8, backgroundColor: '#fff', borderRadius: 5}}>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Firstname: </Text>
          <Text adjustsFontSizeToFit style={styles.textChild}>{userData.firstname}</Text>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Middlename: </Text>
          <Text adjustsFontSizeToFit style={styles.textChild}>{userData.middlename}</Text>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Lastname: </Text>
          <Text adjustsFontSizeToFit style={styles.textChild}>{userData.lastname}</Text>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Age: </Text>
          <Text adjustsFontSizeToFit style={styles.textChild}>{userData.age}</Text>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Bloodtype: </Text>
          <Text adjustsFontSizeToFit style={styles.textChild}>{userData.bloodtype}</Text>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Phone No.: </Text>
          <Text adjustsFontSizeToFit style={styles.textChild}>{userData.phone_number}</Text>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Address: </Text>
          <Text adjustsFontSizeToFit style={styles.textChild}>{userData.address}</Text>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Email: </Text>
          <Text adjustsFontSizeToFit style={styles.textChild}>{userData.email}</Text>
        </View>
        
        <Button icon="pencil-box-multiple" buttonColor="black" mode="contained" style={{marginTop: 20}} onPress={() => navigation.navigate('EditProfileScreen', userData)}>
          Update
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
item: {
  flexDirection: 'row',
  padding: 5,
  backgroundColor: '#fff',
  marginBottom: 3,
  borderRadius: 3,
},
textTitle: {
  width: '35%',
  color: '#3d3d3d',
  fontWeight: 'bold',
  alignSelf: 'center',
  fontSize: 18,
  textTransform: 'uppercase',
},
textChild: {
  width: '65%',
  color: '#3d3d3d',
  // textAlign: 'right',
  alignSelf: 'center',
  textTransform: 'uppercase',
  fontSize: 17
},
})
 
export default ProfileScreen;