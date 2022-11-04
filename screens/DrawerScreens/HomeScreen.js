import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

import MapView, {Marker} from 'react-native-maps'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {
  const [input, setInput] = useState('');
  const [latitude, setUserLatitude] = useState('');
  const [longitude, setUserLongitude] = useState('');
  const userData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
        setUserLongitude(value.longitude);
        setUserLatitude(value.latitude);
        console.log(value);
      });
      if (value !== null) {
        setInput(value);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    userData();
  })
      
  return (
    <View style={styles.container}>
    {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={{
          latitude: 10.70464,
          longitude: 122.96322,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude : 10.70464 , longitude : 122.96322 }}
          image={{uri: 'custom_pin'}}
        />
        </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: "100%"
  },
});
 
export default HomeScreen;