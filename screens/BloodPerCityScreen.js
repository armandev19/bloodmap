import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, Button, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Divider, List} from 'react-native-paper';
import Loader from './Components/loader';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';




const BloodPerCityScreen = ({route, navigation}) => {
  
  const [loading, setLoading] = useState(false);
  const currentUserData = useSelector(selectUserData);
  const [selectedId, setSelectedId] = useState(null); 
  const [inventBag, setInventoryPerLoc] = useState([]);

  const params = route.params
  
  const getBloodPerCity = () => {
    setLoading(true)
    let postData = { blood_type: params.blood_type };
    let formBody = [];
    for (let key in postData) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(postData[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url + 'bloodPerCity.php', {
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
        setInventoryPerLoc(responseJson);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#edebeb" : "#edebeb";
    const color = item.id === selectedId ? '#edebeb' : '#edebeb';
    
    return (
      <Item
            item={item}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }} 
      />
    );
  };

  const Item = ({ item, onPress, backgroundColor, textColor }) => {
    return(
      <List.Item
          style={[styles.item, backgroundColor]}
          title={<Text style={{color: 'black', alignSelf: "center"}}>CITY</Text>}
          description={<View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{flex: 1}}>
              <Text style={{color: 'black'}}>CITY</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: 'black'}}>QUANTITY</Text>
            </View>
          </View>}
  
      />
    )
  }

  useEffect(() => {
    getBloodPerCity();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
        
  //     getBloodPerCity();
  //   }, []),
  // );
    return (
      <SafeAreaView style={{padding: 10}}>
        <Text style={{ color: 'black', fontSize: 25 }}>TYPE <Text style={{ color: 'black', fontWeight: 'bold' }}>{params.blood_type}</Text></Text>
        <Text style={{ color: 'black', fontSize: 20, marginTop: 10 }}>Available supply:</Text>

        {inventBag.map(value => (
          <View style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: '#717275cf',
            borderWidth: 1,
            marginTop: 3,
            padding: 5
          }}
          >
            <View style={{flex: 2}}>
              <Text style={{color: 'black', fontSize: 15}}>
                CITY: <Text style={{fontWeight: 'bold'}}>{value.city ? value.city.toUpperCase() : "N/A"}</Text>
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: 'black', fontSize: 15}}>
                QTY: <Text style={{fontWeight: 'bold'}}>{value.qty}</Text>
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Button onPress={() => navigation.navigate('DonorsListScreen', value.city)} title="Donors"></Button>
            </View>
          </View>
        ))}
      </SafeAreaView>
    )  
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginVertical: 1,
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 0
  },
})

export default BloodPerCityScreen;