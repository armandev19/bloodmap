import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, Modal, ToastAndroid, Alert, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.qty, textColor]}>{item.id}</Text><Text>{item.bloodtype}</Text>
  </TouchableOpacity>
);

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
    fetch('http://192.168.7.196/bloodmap/insertBloodRequest.php', {
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
    fetch('http://192.168.7.196/bloodmap/fetchBloodRequest.php', {
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
        console.log(responseJson.data);
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
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }} 
      />
    );
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