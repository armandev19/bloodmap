import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './../Components/loader';

const MapViewScreen = () => {
  const [input, setInput] = useState();
  const [latitude, setUserLatitude] = useState('');
  const [longitude, setUserLongitude] = useState('');
  
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
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
const test = [
  {latitude: 10.629551823160902, longitude: 122.9372239864562, title: 'balay'},
  {latitude: 10.704628013409447, longitude: 122.9638001368752, title: 'balay'},
  {latitude: 10.704908697504395, longitude: 122.96321005088977, title: 'balay'},
  {latitude: 10.705330382048308, longitude: 122.96268970233933, title: 'balay'},
  {latitude: 10.70387152938821, longitude: 122.96299811217332, title: 'balay'},
]

const getAllUsers = () => {
  setLoading(true)
  fetch('http://192.168.7.196/bloodmap/fetchUsers.php', {
    method: 'POST',
    headers: {
      //Header Defination
      'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLoading(false);
      setUserData(responseJson.data);
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
      console.error(error);
    });
}

useFocusEffect(
  React.useCallback(() => {
    const getCooridinates = async () => {
      try {
        await AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
          setUserLatitude(value.latitude)
          setUserLongitude(value.longitude)
          console.log(latitude, longitude)
        });
      } catch (error) {
        console.log(error);
      }
    }

    getCooridinates()
    
    getAllUsers();
    console.log("userdata", userData);
  }, []),
);
  // useEffect(()  => {
  //     AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
  //           setUserLatitude(value.latitude)
  //           setUserLongitude(value.longitude)
  //     });
  //     console.log(latitude, longitude)
  // });
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <MapView
      style={styles.map}    
      //specify our coordinates.
      initialRegion={{
        latitude: latitude ? latitude : 10.629551823160902,
        longitude: longitude ? longitude : 122.9372239864562,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      >
        {/* {(() => {
        if (userData) { */}
          {userData.map((location, i) => {
            return (
              <Marker
                key={i}
                // title={location.title}
                coordinate={{ latitude : location.latitude ? "" :  10.629551823160902, longitude : location.longitude ? "" : 122.9372239864562 }}
                description="This is a marker in React Natve"
              />
            )
          })}
      {/* }
    })()} */}
        
      
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