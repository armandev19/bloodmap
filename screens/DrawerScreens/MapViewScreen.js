import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import CustomMarker from './CustomMarker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const MapViewScreen = ({navigation}) => {
  const [input, setInput] = useState();
  const [userLatitude, setUserLatitude] = useState('');
  const [userLongitude, setUserLongitude] = useState('');
  
  const [bloodtype, setBloodType] = useState('');
  const [currUserData, setCurrUserData] = useState({});
  const [userData, setUserCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUserData = useSelector(selectUserData);
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

  const searchBloodType = () =>{
    setLoading(true)
    let postData = {bloodtype: bloodtype};
    let formBody = [];
    for (let key in postData) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(postData[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url+'searchBloodType.php', {
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
      if(responseJson.data == ''){
        alert('No results found.')
      }
      setUserCollection(responseJson.data);
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
      console.error(error);
    });
  };

  useEffect(()=>{
    setUserLatitude(currUserData.latitude);
    setUserLongitude(currUserData.longitude);
    getAllUsers();
  }, [])

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
      provider={PROVIDER_GOOGLE}
      style={styles.map}    
      initialRegion={{
        latitude: Number(currentUserData.latitude),
        longitude: Number(currentUserData.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      >
      {(() => {
        if (currentUserData) { 
          return (
            <Marker
              key={currentUserData.id}
              coordinate={{ latitude : Number(currentUserData.latitude), longitude : Number(currentUserData.longitude) }}
              // coordinate={{ latitude :10.6296582, longitude : 122.9371353 }}
              title="You're here."
            >
            {/* <Image
                source={require('../Assets/human_map.png')}
                style={{width: 30, height: 35}}
                // resizeMode="contain"
                /> */}
            </Marker>
          )
        }
      })()}
        {userData.map((location, i) => {
          return (
            <Marker
              key={i}
              coordinate={{ latitude : Number(location.latitude), longitude : Number(location.longitude) }}
              onPress={() => navigation.navigate('UserDetailsScreen', location)}
              title={location.bloodtype}
            >
              {/* <Image
                source={require('../Assets/marker2.png')}
                style={{width: 30, height: 35}}
                // resizeMode="contain"
              /> */}
              {/* {location.id == currentUserData.id ? 
              <View style={styles.userMarker}>
                <Text style={styles.markerText}>{location.bloodtype}</Text>
              </View> : 
              <View style={styles.marker}>
                <Text style={styles.marker}>{location.bloodtype}</Text>
              </View> 
              } */}
            </Marker>
          )
        
      })}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder='Search Blood Type'
          placeholderTextColor={'black'}
          color='black'
          autoCapitalize='none'
          style={{flex: 1, padding: 0}}
          onChangeText={(bloodtype) => setBloodType(bloodtype)}>
        </TextInput>
        <Icon name="magnify" size={30} color="black" onPress={()=>searchBloodType()}/>
      </View>
    </View>
  );
}
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //the container will fill the whole screen.
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: "100%"
  },
  userMarker: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "red",
    borderRadius: 100,
    elevation: 10,
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
  searchBox: {
    position: 'absolute',
    marginTop: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10
  }
  
});
 
export default MapViewScreen;