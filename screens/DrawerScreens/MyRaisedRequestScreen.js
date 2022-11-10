import React, {useState} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, Modal, Pressable, Alert, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';
// import { TextInput } from 'react-native-gesture-handler';

import DropDownPicker from 'react-native-dropdown-picker';

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
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const MyRaisedRequestScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState({modalVisible: false});

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
      <View style={{padding: 10}}>
        <Button style={{marginHorizontal: 10}} title='Add Request' onPress={() => setModalVisible(true)}></Button>
      </View>
      <FlatList
        data={DATA}
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
              <Text style={styles.modalText}>Add New Blood Request</Text>
              <View style={styles.SectionStyle}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                containerStyle={{ width: "100%" }}
              />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput placeholder="Qty" style={styles.inputStyle}></TextInput>
              </View>
              <View styles={styles.viewButtons}>
                <Button
                  onPress={() => setModalVisible(!modalVisible)}
                  title="Save"
                />  
                <Button
                  onPress={() => setModalVisible(!modalVisible)}
                  title="Cancel"
                />  
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
    height: "85%",
    width: "85%",
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
    color: 'red',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: 'white',
    width: "100%"
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 5,
  },
  viewButtons: {
    flexDirection: 'row',
    marginVertical: 5
  }
});
 
export default MyRaisedRequestScreen;