import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import { Avatar, Card, Title, Paragraph, List } from 'react-native-paper';
import Loader from './../Components/loader';

import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';

const DonationHistoryScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [donationTransaction, setDonationTransaction] = useState('');
  const [noDonation, setNoDonation] = useState('No Donation');
  
  const [selectedId, setSelectedId] = useState(null);
  const currentUserData = useSelector(selectUserData);

  const getAllDonationTransaction = () => {
    setLoading(true)
    let postDataApproved = {userAccess: currentUserData.access, userID: currentUserData.id};
    let formBody = [];
    for (let key in postDataApproved) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(postDataApproved[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url+'fetchDonation.php', {
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

  useEffect(() => {
    getAllDonationTransaction()
  }, [])

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

  const tempDescription = (qty, donator) => {
    var temp = "Donated Qty: "+qty+"\nDonated By: "+donator
    return temp
  }
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <List.Item
      style={[styles.item, backgroundColor]}
      title={item.bld_request_number}
      description={tempDescription(item.donated_qty, item.donator_name)}
      left={props => <List.Icon icon='checkbox-marked-outline' color="green"/>}
    />
  );


  return (
    <SafeAreaView style={{flex: 1}}>
    <Loader loading={loading} />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  modalView: {
    height: "50%",
    width: "90%",
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  selectDropdown: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 30,
    height: 40,
    borderColor: '#dadae8',
    backgroundColor: 'white',
    width: '80%'
  },
  inputStyle: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginTop: 10,
    flex: 1
  },
  SectionStyle: {
    flex: 1,
    margin: 20,
  },
  viewButtons: {
    flexDirection: 'row',
    marginVertical: 5
  }
});
export default DonationHistoryScreen;