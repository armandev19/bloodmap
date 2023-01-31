import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import CustomMarker from './CustomMarker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

const MapViewScreen = ({navigation}) => {
  const [input, setInput] = useState();
  const [userLatitude, setUserLatitude] = useState('10.629551823160902');
  const [userLongitude, setUserLongitude] = useState('122.9372239864562');
  
  const [currUserData, setCurrUserData] = useState({});
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
    let postData = {id: currentUserData.id};
    let formBody = [];
    for (let key in postData) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(postData[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url+'fetchUsers.php', {
      method: 'POST',
      body: formBody,
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

useFocusEffect(
  React.useCallback(() => {
      setTimeout(async () => {
          try {
              const userData = await AsyncStorage.getItem('user_id');
              if (userData !== null) {
                  let userDataArray = JSON.parse(userData);
                  setCurrUserData(userDataArray);
              }
          } catch (e) {
              console.log(e);
          }
      });
      console.log(currentUserData);
      setUserLatitude(currUserData.latitude);
      setUserLongitude(currUserData.longitude);
      getAllUsers();
  }, [])
);

// useEffect(()=>{
//   getAllUsers();
//   console.log("userdata", currentUserData);
// }, [])

const CustomMarker= (title) => {
  return (
    <View style={styles.markerText}>
      <Text style={styles.color}>{title}</Text>
    </View>
  );
}

if(currentUserData){
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Text style={{color: 'black'}}>{currentUserData.latitude}</Text>
      <MapView
      style={styles.map}    
      initialRegion={{
        latitude: Number(currentUserData.latitude),
        longitude: Number(currentUserData.longitude),
        // latitude: 10.6296582,
        // longitude: 122.9371353,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      >
      {(() => {
        if (currentUserData) { 
          return (
            <Marker
              coordinate={{ latitude : Number(currentUserData.latitude), longitude : Number(currentUserData.longitude) }}
              // coordinate={{ latitude :10.6296582, longitude : 122.9371353 }}
            >
             <View style={styles.marker}>
                <Text style={styles.markerText}>{currUserData.firstname}</Text>
              </View>
            </Marker>
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
      
           {/* {userData.map((location, i) => {
            return (
              <Marker
                key={i}
                coordinate={{ latitude : parseFloat(location.latitude), longitude : parseFloat(location.longitude) }}
                onPress={() => navigation.navigate('UserDetailsScreen', location)}
              >
                <View style={styles.marker}>
                  <Text style={styles.markerText}>{location.firstname}</Text>
                </View>
                
              </Marker>
            )
          })} */}
      </MapView>
    </View>
  );
}
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
  marker: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#007bff",
    borderRadius: 100,
    elevation: 10,
  },
  markerText: {
    color: "#fff",   
  },
  
});
 
export default MapViewScreen;