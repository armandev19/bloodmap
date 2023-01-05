import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, Modal, ToastAndroid, Alert, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Avatar, Card, Title, Paragraph, List } from 'react-native-paper';
import Loader from './../Components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const PastRequestScreen = (navigation, route) => {
  const [pastRequest, setPastRequest] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState({modalVisible: false});
  const [toastMsg, setToastMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [bloodtype, setBloodType] = useState();
  const [qty, setQty] = useState();
  const [purpose, setPurpose] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [userdata, setUserData] = useState('');
  const [userAccess, setUserAccess] = useState(null);
  const [noDonation, setNoDonation] = useState('No Data');

  const getAllPastRequest = async () => {
    setLoading(true)
    try {
      await AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
        setUserData(value);
      });
    } catch (error) {
      console.log(error);
    }
    let postData = {userAccess: userdata.access, userID: userdata.id};
    let formBody = [];
    for (let key in postData) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(postData[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url+'fetchPastRequest.php', {
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
        setPastRequest(responseJson.data);
        setNoDonation('')
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
        backgroundColor={{ backgroundColor }}
        textColor={{ color }} 
        
      />
    );
  };

  const tempDescription = (description, bloodtype, qty) => {
    var temp = "QTY: "+qty+"\nBLOODTYPE: "+bloodtype
    return temp
  }
  const Item = ({ item, onPress, backgroundColor, textColor }) => {
    return(
    <List.Item
      style={[styles.item, backgroundColor]}
      title={item.request_number}
      description={tempDescription(item.purpose, item.bloodtype, item.qty)}
      left={props => <List.Icon {...props} icon="clock-alert-outline" color="orange" />}
      right={props => 
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'orange', marginTop: 20, marginRight: 10, textTransform: 'uppercase', fontWeight: 'bold'}}>Pending</Text>
        </View>
      }
      onPress={() => navigation.navigate('DetailScreen', item)}
    />
    )
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader loading={loading} />
      
      { noDonation == 'No Data' ? <Text style={{color: 'black', fontSize: 25, textAlign: 'center'}}>{noDonation}</Text> : 
        <FlatList
          data={pastRequest}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          style={{marginBottom: 15}}
        />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    marginVertical: 1,
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
 
export default PastRequestScreen;