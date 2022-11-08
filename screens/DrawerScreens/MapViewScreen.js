import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

import MapView, {Marker} from 'react-native-maps'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


const MapViewScreen = () => {
      
      // 10.629551823160902, 122.9372239864562
      // 10.70464 122.96322
  const [input, setInput] = useState();
  const [latitude, setUserLatitude] = useState();
  const [longitude, setUserLongitude] = useState();
//   const userData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
//         setUserLongitude(value.longitude);
//         setUserLatitude(value.latitude);

//       });
//       if (value !== null) {
//         setInput(value);
//       }
//     } catch (e) {
//       alert('Failed to fetch the input from storage');
//     }
//   };

  useEffect(()  => {
      AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
            setUserLatitude(value.latitude)
            setUserLongitude(value.longitude)
      });
      console.log(latitude, longitude)
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}    
        //specify our coordinates.
        initialRegion={
            {
          latitude: parseFloat(10.629551823160902),
          longitude: parseFloat(122.9372239864562),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      }
      >
        <Marker
          coordinate={{ latitude : parseFloat(10.629551823160902) , longitude : parseFloat(122.9372239864562) }}
          image={{uri: 'custom_pin'}}
          description={"This is a marker in React Natve"}
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
 
export default MapViewScreen;