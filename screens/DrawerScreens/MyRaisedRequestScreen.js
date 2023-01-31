import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, ToastAndroid, Alert, TextInput} from 'react-native';
import Modal from "react-native-modal";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Avatar, Card, Title, Paragraph, List } from 'react-native-paper';
import Loader from './../Components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';

const MyRaisedRequestScreen = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState({modalVisible: false});
  const [toastMsg, setToastMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [bloodtype, setBloodType] = useState();
  const [qty, setQty] = useState();
  const [purpose, setPurpose] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [userdata, setUserData] = useState({});
  const [userAccess, setUserAccess] = useState(null);

  const currentUserData = useSelector(selectUserData);
  const [items, setItems] = useState([
    {label: "A", value: 'A'},
    {label: "B", value: 'B'},
    {label: "AB", value: 'AB'},
    {label: "O", value: 'O'},
    {label: "A+", value: 'A+'},
    {label: "A-", value: 'A-'},
    {label: "B+", value: 'B+'},
    {label: "B-", value: 'B-'},
    {label: "AB+", value: 'AB+'},
    {label: "AB-", value: 'AB-'},
    {label: "O+", value: 'O+'},
    {label: "O-", value: 'O-'},
  ]);

  const [requests, setRequests] = useState([]);

  const saveBloodRequest = () => {
    let dataToSend = {qty: qty, bloodtype: value, purpose: purpose, userID: currentUserData.id };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    setLoading(true);
    fetch(global.url+'insertBloodRequest.php', {
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
      getAllRequest();
      setModalVisible(!modalVisible);
    })
    .catch((error) => {
      setLoading(false);
      console.error(error);
    });
  }

  const getAllRequest = () => {
    setLoading(true)
    let postData = {userAccess: userdata.access, userID: currentUserData.id};
    let formBody = [];
    for (let key in postData) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(postData[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url+'fetchBloodRequest.php', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        Accept: 'application/json',
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(responseJson => {
        console.log(responseJson.data)
        setRequests(responseJson.data)
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
      setLoading(false);
  }
  useEffect(() => {
    getAllRequest();
  }, []);

  // useFocusEffect(
  //   React.useCallback(()  => {
  //     // setTimeout(async () => {
        
  //     //   try {
  //     //       const userData = await AsyncStorage.getItem('user_id');
  //     //       if (userData !== null) {
  //     //           let userDataArray = JSON.parse(userData);
  //     //           setUserData(userDataArray);
  //     //       }
  //     //   } catch (e) {
  //     //       console.log(e);
  //     //   }
  //     // });
  //   }, [])
  // );

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
      <View style={{padding: 10}}>
        <Button style={{marginHorizontal: 10}} title='Add Request' onPress={() => setModalVisible(true)}></Button>
      </View>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        style={{marginBottom: 15}}
      />
      <View style={styles.centeredView}>
        <Modal
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>NEW BLOOD DONATION REQUEST</Text>
              <View style={styles.SectionStyle}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  containerStyle={{ width: "100%" }}
                  placeholder="Select Blood Type"
                />
                <TextInput placeholder="Qty" placeholderTextColor={'black'} keyboardType="numeric" style={styles.inputStyle} onChangeText={(qty) =>
                    setQty(qty)
                  }>
                </TextInput>
                <TextInput 
                  placeholder="Needed Date" 
                  placeholderTextColor={'black'} 
                  style={styles.inputStyle}
                  
                />
                <TextInput placeholder="Purpose" placeholderTextColor={'black'} style={styles.inputStyle} onChangeText={(purpose) =>
                    setPurpose(purpose)
                  }>
                </TextInput>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={{padding: 10, margin: 0}}>
                    <Button
                      onPress={() => saveBloodRequest()}
                      title="Save"
                    />  
                  </View>
                  <View style={{padding: 10, margin: 0}}>
                    <Button
                      onPress={() => setModalVisible(!modalVisible)}
                      title="Cancel"
                      style={{borderRadius: 10}}
                    />  
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
    alignItems: "center",
  },
  modalView: {
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
    elevation: 20,
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
  },
  SectionStyle: {
    margin: 20,
  },
  viewButtons: {
    flexDirection: 'row',
    marginVertical: 5
  }
});
 
export default MyRaisedRequestScreen;