import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, Modal, ToastAndroid, Alert, TextInput} from 'react-native';
import { Avatar, Card, Title, Paragraph, List } from 'react-native-paper';
import Loader from './../Components/loader';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';

const BloodBankScreen = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [banks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noDonation, setNoDonation] = useState('No Data');
  const [search, setSearch] = useState('');
  const currentUserData = useSelector(selectUserData);
  const getAllBloodBanks = () => {
    setLoading(true)
    fetch(global.url+'fetchBloodBank.php', {
      method: 'POST',
      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setLoading(false);
      setBloodBanks(responseJson.data);
    })
    .catch((error) => {
      setLoading(false);
      console.error(error);
    });
  }

  const getSearchedDonor = () => {
    setLoading(true)
    let postData = { search: search };
    let formBody = [];
    for (let key in postData) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(postData[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url + 'donors.php', {
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
        setBags(responseJson.data);
      })
      .catch((error) => {
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

  const tempDescription = (bloodtype, city) => {
    var temp = "TYPE "+bloodtype+"\nCITY: "+city;
    return temp;
  }
  const Item = ({ item, onPress, backgroundColor, textColor }) => {
    return(
    <List.Item
      style={[styles.item, backgroundColor]}
      title={item.blood_bank.toUpperCase()}
      // description={tempDescription(item.bloodtype, item.city)}
      left={props => <List.Icon {...props} icon="domain" color="black" />}
      right={props => 
        <View style={{flexDirection: 'row'}}>
        
        </View>
      }
      // onPress={() => navigation.navigate('DonorsDetailsScreen', item)}
    />
    )
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllBloodBanks();
    }, []),
);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader loading={loading} />
      { currentUserData && currentUserData.access == 'Admin' ? (
        <View style={{ padding: 8 }}>
          <Button style={{ marginHorizontal: 10 }} title='Add Blood Bank' onPress={() => navigation.navigate('AddBloodBankScreen')}></Button>
        </View>
      ) : (
        <View></View>
      )}
      {banks.length > 0 ? (
        <Text style={{ marginTop: -10 }}></Text>
      ) : (
        <Text style={{ color: 'black', fontSize: 25, textAlign: 'center', marginTop: 10 }}>No results found.</Text>
      )}
      {/* { noDonation == 'No Data' ? <Text style={{color: 'black', fontSize: 25, textAlign: 'center'}}>{noDonation}</Text> :  */}
        <FlatList
          data={banks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          style={{marginBottom: 5, marginTop: 5, flex: 1}}
        />
      {/* <View style={styles.searchBox}>
            <TextInput
            placeholder='Search Donors'
            placeholderTextColor={'black'}
            color='black'
            autoCapitalize='none'
            style={{flex: 1, padding: 0}}
            onChangeText={(search) => setSearch(search)}>
            </TextInput>
            <Icon name="magnify" size={30} color="black" onPress={()=>getSearchedDonor()}/>
      </View> */}
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
  },
  searchBox: {
      // position: 'absolute',
      marginTop: 1,
      marginBottom: 15,
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 10,
      width: '96%',
      alignSelf: 'center',
      borderRadius: 5,
      shadowColor: '#ccc',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 10
    }
});
 
export default BloodBankScreen;