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

      const getDonationData = () => { 
      let dataToSend = {donor_id: route.params.donor_id};
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
        setLoading(false);
        setDonationData(responseJson.data);
        console.log(responseJson.data)
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
            title={"aadasd"}
            description={"asdasd"}
            left={props => <List.Icon {...props} icon="pencil-box-multiple" color="orange" />}
      />
      )
      };

      useFocusEffect(
            React.useCallback(() => {
                getDonationData();
            }, []),
      );

  const params = route.params
    return (
      <SafeAreaView style={{padding: 10}}>
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 8, marginBottom: 5}}>
          <Icon style={{color: '#8c8e91', fontSize: 100, textAlign: 'center', marginBottom: 20}} name="account"></Icon>
          <Text style={{fontSize: 17}}>
            <Text style={{color: '#030000'}}>Name:</Text>
            <Text style={{color: 'black', fontWeight: 'bold', textTransform: 'uppercase'}}> {params.firstname} {params.middlename.charAt(0)}. {params.lastname} </Text>
          </Text>
          <Text style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 17, flex: 1, flexDirection: 'row'}}>
                  <Text style={{color: '#030000'}}>Age:</Text>
                  <Text style={{color: 'black', fontWeight: 'bold'}}> {params.age} </Text>
            </Text>
            <Text style={{fontSize: 17, flex: 1, flexDirection: 'row'}}>
                  <Text style={{color: '#030000'}}>Bloodtype:</Text>
                  <Text style={{color: 'black', fontWeight: 'bold'}}> {params.bloodtype ? params.bloodtype : 'N/A'} </Text>
            </Text>
          </Text>
          <Text style={{fontSize: 17}} selectable>
            <Text style={{color: '#030000'}}>Phone No:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}} > {params.phone_number ? params.phone_number : 'N/A'} </Text>
          </Text>
          <Text style={{fontSize: 17}}>
            <Text style={{color: '#030000'}}>Gender:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.gender ? params.gender : 'N/A'} </Text>
          </Text>
          <Text style={{fontSize: 17}}>
            <Text style={{color: '#030000'}}>City:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.city ? params.city : 'N/A'} </Text>
          </Text>
        </View>
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 8, marginBottom: 5}}>
            <Text style={{color: '#030000', fontSize: 18, fontWeight: 'bold'}}>Donation Details</Text>
            <View>
                  <Text style={{color: '#030000'}}>Donor Type: <Text style={{fontWeight: 'bold'}}>{params.type_of_donor}</Text></Text>
                  <Text style={{color: '#030000'}}>No. of Donations: <Text style={{fontWeight: 'bold'}}>{params.no_of_donation}</Text></Text>
                  <Text style={{color: '#030000'}}>Last Donation: <Text style={{fontWeight: 'bold'}}>{params.date_last_donation}</Text></Text>
                  <Text style={{color: '#030000'}}>Method: <Text style={{fontWeight: 'bold'}}>{params.collection_method}</Text></Text>
            </View>
        </View>
        <FlatList
          data={donations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          style={{marginBottom: 15}}
        />
      </SafeAreaView>
    )  
};


const styles = StyleSheet.create({
      item: {
            flex: 1,
            marginVertical: 1,
            borderRadius: 5,
            padding: 0,
            borderWidth: 1,
            borderColor: '#cfcccc'
            },
})
 
export default DonorsDetailsScreen;