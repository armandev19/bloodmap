import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, Modal, ToastAndroid, Alert, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Avatar, Card, Title, Paragraph, List } from 'react-native-paper';
import Loader from './../Components/loader';


const MyRaisedRequestScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState({modalVisible: false});
  const [toastMsg, setToastMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const [bloodtype, setBloodType] = useState();
  const [qty, setQty] = useState();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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

  const toastMessage = (toastMsg) => {
    ToastAndroid.showWithGravityAndOffset(
      toastMsg,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50
    )
  }

  const saveBloodRequest = () => {
    let dataToSend = {qty: qty, bloodtype: value};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    setLoading(true);
    fetch('http://192.168.1.6/bloodmap/insertBloodRequest.php', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        setLoading(false);
        alert(responseJson);
        if(responseJson.status === 'success') {
          console.log(responseJson.status)
        }else{
          console.log(responseJson.status);
        }
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  const getAllRequest = () => {
    setLoading
    fetch('http://192.168.1.6/bloodmap/fetchBloodRequest.php', {
      method: 'POST',
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setRequests(responseJson.data);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  useState(() => {
    getAllRequest();
  });
  
  

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

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    // <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    //   <Card.Title
    //     title={item.id}
    //     subtitle="Card Subtitle"
    //   />
    //   {/* <Text style={{color: 'black'}}>Reference: {item.id}</Text> 
    //   <Text style={{textAlign: "center"}}> QTY: {item.qty} </Text>
    //   <Text style={{color: 'black'}}>Blood Type: </Text>
    //   <Text style={{color: 'black'}}>{item.bloodtype}</Text> 
    //   <Text style={{color: 'black'}}>Purpose: {item.purpose}</Text> */}
    // </TouchableOpacity>
    <List.Item
    style={[styles.item, backgroundColor]}
    title={item.id}
    description={item.purpose}
    left={props => <List.Icon {...props} icon="camera" />}
    right={props => <List.Icon {...props} icon="camera" />}
    onPress={() => alert('asdasd')}
  />
  );
  

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
      />
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
          style={{height: 100}}
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
                <TextInput placeholder="Qty" placeholderTextColor={'black'} style={styles.inputStyle} onChangeText={(qty) =>
                    setQty(qty)
                  }></TextInput>
                <TextInput 
                  placeholder="Needed Date" 
                  placeholderTextColor={'black'} 
                  style={styles.inputStyle}
                  
                />
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1}}>
                  <View style={{flex: 1, padding: 10, margin: 0}}>
                    <Button
                      onPress={() => saveBloodRequest()}
                      title="Save"
                    />  
                  </View>
                  <View style={{flex: 1, padding: 10, margin: 0}}>
                    <Button
                      onPress={() => setModalVisible(!modalVisible)}
                      title="Cancel"
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
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    flex: 1,
    margin: 20,
  },
  viewButtons: {
    flexDirection: 'row',
    marginVertical: 5
  }
});
 
export default MyRaisedRequestScreen;