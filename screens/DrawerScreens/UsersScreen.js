import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, Modal, ToastAndroid, Alert, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Avatar, Card, Title, Paragraph, List } from 'react-native-paper';
import Loader from './../Components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const UsersScreen = ({navigation, route}) => {
  const [pastRequest, setPastRequest] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(false);
  const [noDonation, setNoDonation] = useState('No Data');

  const getAllUsers = async () => {
    setLoading(true)
    fetch(global.url+'fetchUsers.php', {
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
        setUsers(responseJson.data);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
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

  const tempDescription = (bloodtype, age, address) => {
    var temp = "Age: "+age+"\nAddress: "+address
    return temp
  }
  const Item = ({ item, onPress, backgroundColor, textColor }) => {
    return(
    <List.Item
      style={[styles.item, backgroundColor]}
      title={item.firstname.toUpperCase()+' '+item.middlename.toUpperCase()+' '+item.lastname.toUpperCase()}
      description={tempDescription(item.bloodtype, item.age, item.address)}
      left={props => <List.Icon {...props} icon="pencil-box-multiple" color="orange" />}
      right={props => 
        <View style={{flexDirection: 'row'}}>
          {item.status == 'Approved' ? (
            <Text style={{color: 'green', marginTop: 20, marginRight: 10, textTransform: 'uppercase', fontWeight: 'bold'}}>Approved</Text>
          ) : (
            <Text style={{color: 'orange', marginTop: 20, marginRight: 10, textTransform: 'uppercase', fontWeight: 'bold'}}>Pending</Text>
          )}
        {/* {(() => {
          if (item.access = 'Approved') { 
            return (
              <Text style={{color: 'orange', marginTop: 20, marginRight: 10, textTransform: 'uppercase', fontWeight: 'bold'}}>Pending</Text>
            )
          }else{
            return (
              <Text style={{color: 'orange', marginTop: 20, marginRight: 10, textTransform: 'uppercase', fontWeight: 'bold'}}>adasdasd</Text>
            )
          }
        })()} */}
        </View>
      }
      onPress={() => navigation.navigate('UserDetailsScreen', item)}
    />
    )
  };

  useFocusEffect(
    React.useCallback(() => {
        getAllUsers();
        
  console.log(setUsers);
    }, []),
);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader loading={loading} />
      
      {/* { noDonation == 'No Data' ? <Text style={{color: 'black', fontSize: 25, textAlign: 'center'}}>{noDonation}</Text> :  */}
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
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
 
export default UsersScreen;