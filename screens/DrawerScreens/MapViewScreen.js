import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';


const MapViewScreen = () => {
  const [input, setInput] = useState();
  // const [latitude, setUserLatitude] = useState();
  // const [longitude, setUserLongitude] = useState();
  
  const [userData, setUserCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  const test = [{latitude: 10.629551823160902, longitude: 122.9372239864562, title: 'balay'},
  {latitude: 10.704628013409447, longitude: 122.9638001368752, title: 'balay'},
  {latitude: 10.704908697504395, longitude: 122.96321005088977, title: 'balay'},
  {latitude: 10.705330382048308, longitude: 122.96268970233933, title: 'balay'},
  {latitude: 10.70387152938821, longitude: 122.96299811217332, title: 'balay'}]

  const currentUserData = useSelector(selectUserData);
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

const getAllUsers = () => {
  setLoading(true)
  fetch('http://192.168.7.196/bloodmap/fetchUsers.php', {
    method: 'POST',
    headers: {
      'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLoading(false);
      setUserCollection(responseJson.data);
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
      console.error(error);
    });
}

useEffect(()=>{
  getAllUsers();
  console.log("userdata", userData);
}, [])

// useFocusEffect(
//   React.useCallback(() => {
    
//     getAllUsers();
//     console.log("userdata", userData);
//   }, []),
// );
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <MapView
      style={styles.map}    
      initialRegion={{
        latitude: currentUserData ? parseFloat(currentUserData.latitude) : 10.653987805083476,
        longitude: currentUserData ? parseFloat(currentUserData.longitude) : 122.97906514190291,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      >
      {(() => {
        if (currentUserData) { 
          return (
            <Marker
              title="This is you."
              coordinate={{ latitude : parseFloat(currentUserData.latitude), longitude : parseFloat(currentUserData.longitude) }}
            />
          )
        }
      })()}
          {/* {test.map((location, i) => {
            return (
              <Marker
              key={i}
              title={location.title}
              coordinate={{ latitude : location.latitude, longitude : location.longitude }}
              description="This is a marker in React Natve"
            />
            )
          })} */}
      
           {userData.map((location, i) => {
            return (
              <Marker
              key={i}
              title={location.title}
              coordinate={{ latitude : parseFloat(location.latitude), longitude : parseFloat(location.longitude) }}
              description="This is a marker in React Natve"
            />
            )
          })}
        
        
      
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