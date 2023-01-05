import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import { Avatar, Card, Title, Paragraph, List } from 'react-native-paper';
import Loader from './../Components/loader';

const DonationHistoryScreen = (route) => {
  const [loading, setLoading] = useState(false);
  const [donationTransaction, setDonationTransaction] = useState('');
  const [noDonation, setNoDonation] = useState('No Donation');

  const getAllDonationTransaction = () => {
    setLoading(true)
    let postDataApproved = {userAccess: userdata.access, userID: userdata.id};
    let formBody = [];
    for (let key in postDataApproved) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(postDataApproved[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch('http://192.168.7.196/bloodmap/fetchDonation.php', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setDonationTransaction(responseJson.data);
        setNoDonation('');
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#f2f2f2" : "white";
    const color = item.id === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }} 
      />
    );
  };

  const tempDescription = (description, bloodtype, qty) => {
    var temp = "QTY: "+qty+"\nBLOODTYPE: "+bloodtype
    return temp
  }
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <List.Item
      style={[styles.item, backgroundColor]}
      title={item.qty}
      description={tempDescription(item.qty, item.qty, item.qty)}
      left={props => <List.Icon icon='checkbox-marked-outline' color="green"/>}
      right={props => 
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'green', marginTop: 20, marginRight: 10, textTransform: 'uppercase', fontWeight: 'bold'}}>Approved</Text>
        </View>
      }
      onPress={() => navigation.navigate('DetailScreen', item)}
    />
  );


  return (
    <SafeAreaView style={{flex: 1}}>
    <Loader loading={loading} />
    <Text style={{color: 'black', fontSize: 25, textAlign: 'center'}}>{noDonation}</Text>
    <FlatList
      data={donationTransaction}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      // extraData={selectedId}
      style={{marginBottom: 15}}
    />
    </SafeAreaView>
  );
};
 
export default DonationHistoryScreen;