import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, Button, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Divider, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from './Components/loader';

import { useFocusEffect } from '@react-navigation/native';
const DonorsDetailsScreen = ({route, navigation}) => {
      
const [selectedId, setSelectedId] = useState(null);
const [loading, setLoading] = useState(false);
const [donations, setDonationData] = useState([]);
const [donationLists, setDonationLists] = useState([]);

const getDonationData = () => { 
  let dataToSend = {donor_id: route.params.id};
  let formBody = [];
  for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  setLoading(true)
  fetch(global.url+'donorDonations.php', {
    method: 'POST',
    body: formBody,
    headers: {
      'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    // alert(responseJson.data[0].donor_id)
    // alert(responseJson.data[0])
    setLoading(false);
    setDonationData(responseJson.data[0]);
    setDonationLists(responseJson.donations);
  })
  .catch((error) => {
    setLoading(false);
    console.error(error);
  });
}

const renderItem = ({ item }) => {
  const backgroundColor = item.id === selectedId ? "black" : "#black";
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
        title={"Date: "+item.donation_date}
        description={"asdasda"}
  />
  )
};

useEffect(()=>{
  getDonationData();
}, [])

  const params = route.params
    return (
      <SafeAreaView style={{padding: 10}}>
        <View style={{backgroundColor: 'white', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 8, marginBottom: 5}}>
          <Icon style={{color: '#8c8e91', fontSize: 100, textAlign: 'center', marginBottom: 20}} name="account"></Icon>
          <Text style={{color: '#030000', fontSize: 18, fontWeight: 'bold'}}>Personal Details</Text>
          <Text style={{fontSize: 17}}>
            <Text style={{color: '#030000'}}>Name: </Text>
            <Text style={{color: 'black', fontWeight: 'bold', textTransform: 'uppercase'}}> {params.firstname} {params.middlename.charAt(0)}. {params.lastname} </Text>
          </Text>
          <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
          }}>
            <View style={{flex: 1}}>
              <Text style={{color: '#030000'}}>Age:<Text style={{color: 'black', fontWeight: 'bold'}}> {params.age} </Text></Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: '#030000'}}>Bloodtype:<Text style={{color: 'black', fontWeight: 'bold'}}> {params.bloodtype ? params.bloodtype : 'N/A'} </Text></Text>
            </View>
          </View>
          <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
          }}>
            <View style={{flex: 1}} selectable>
              <Text style={{color: '#030000'}}>Phone No:
              <Text style={{color: 'black', fontWeight: 'bold'}} > {params.phone_number ? params.phone_number : 'N/A'} </Text></Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: '#030000'}}>Gender:
              <Text style={{color: 'black', fontWeight: 'bold'}}> {params.gender ? params.gender : 'N/A'} </Text></Text>
            </View>
          </View>

          <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
          }}>
            <View style={{flex: 1}}>
                <Text style={{
                  color: '#030000', 
                  fontSize: 16
                }}>
                  Address: <Text style={{color: 'black', fontWeight: 'bold'}}> {params.address ? params.address : 'N/A'} </Text>
                </Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{
                  color: '#030000',
                  fontSize: 16
                }}>
                  City: <Text style={{color: 'black', fontWeight: 'bold'}}> {params.city ? params.city : 'N/A'} </Text>
                </Text>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: 'white', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 8, marginBottom: 5}}>
            <Text style={{color: '#030000', fontSize: 18, fontWeight: 'bold'}}>Medical Details</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <View style={{flex: 1}}>
                <Text style={{
                  color: '#030000'
                }}>
                  Donor Type: <Text style={{fontWeight: 'bold'}}>{donations ? donations.type_of_donor: 'N/A' }</Text>
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: '#030000'}}>No. of Donations: <Text style={{fontWeight: 'bold'}}>{donations ? donations.no_of_donation : 0}</Text></Text>
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <View style={{flex: 1}}>
                <Text style={{color: '#030000'}}>Last Donation: <Text style={{fontWeight: 'bold'}}>{donations ? donations.date_last_donation : 'N/A'}</Text></Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: '#030000'}}>Method: <Text style={{fontWeight: 'bold'}}>{donations ? donations.collection_method : 'N/A'}</Text></Text>
              </View>
            </View>
        </View>
        <View style={{backgroundColor: 'white', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 8, marginBottom: 5}}>
          <Text style={{color: '#030000', fontSize: 18, fontWeight: 'bold'}}>Medical History</Text>
            {donationLists.map(value => (
              <View style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 5,
                borderColor: '#717275cf',
                borderWidth: 1,
                padding: 5,
                marginTop: 5,
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <View style={{flex: 1}}>
                    <Text style={{color: 'black'}}>Body wgt.: <Text style={{fontWeight: 'bold'}}>{value.body_weight}kg</Text></Text>
                    <Text style={{color: 'black'}}>Blood Pressure: <Text style={{fontWeight: 'bold'}}>{value.blood_pressure}</Text></Text>
                    <Text style={{color: 'black'}}>Pulse Rate: <Text style={{fontWeight: 'bold'}}>{value.pulse_rate}</Text></Text>
                    <Text style={{color: 'black'}}>Volume: <Text style={{fontWeight: 'bold'}}>{value.volume}L</Text></Text>
                    <Text style={{color: 'black'}}>Remarks: <Text style={{fontWeight: 'bold'}}>{value.remarks}L</Text></Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{color: 'black'}}>General Apperance: <Text style={{fontWeight: 'bold'}}>{value.general_appearance}</Text></Text>
                    <Text style={{color: 'black'}}>Skin: <Text style={{fontWeight: 'bold'}}>{value.skin}</Text></Text>
                    <Text style={{color: 'black'}}>Heent: <Text style={{fontWeight: 'bold'}}>{value.heent}</Text></Text>
                    <Text style={{color: 'black'}}>Heart/Lungs: <Text style={{fontWeight: 'bold'}}>{value.heart_and_lungs}</Text></Text>
                    <Text style={{color: 'black'}}>Date: <Text style={{fontWeight: 'bold'}}>{value.donation_date}</Text></Text>
                  </View>
                </View>
              </View>
            ))}
          {/* <FlatList
            data={donationLists}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            style={{marginBottom: 15, backgroundColor: 'white'}}
          /> */}
        </View>
      </SafeAreaView>
    )  
};


const styles = StyleSheet.create({
      item: {
            flex: 1,
            borderRadius: 5,
            padding: 0,
            borderWidth: 1,
            borderColor: '#cfcccc',
            },
})
 
export default DonorsDetailsScreen;