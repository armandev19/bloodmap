import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Loader from './Components/loader';
import DropDownPicker from 'react-native-dropdown-picker';

const AddDonationScreen = ({navigation, route}) => {
    const params = route.params
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState('');
      
    
    const [visible, setVisible] = useState(false);
    
    const [test, setTest] = useState([]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [qty, setQty] = useState('');



    const [openBB, setOpenBB] = useState(false);
    const [valueBB, setValueBB] = useState(null);
    const [banks, setBloodBanks] = useState([]);
    
    const getDonors = () => {
      setLoading(true);
      fetch(global.url+'getDonors.php', {
        method: 'POST',
        headers: {
          'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setItems(responseJson);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    
    const getBloodBanks = () => {
      setLoading(true); 
      fetch(global.url+'getBloodBanks.php', {
        method: 'POST',
        headers: {
          'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setBloodBanks(responseJson);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }

    const saveDonation = () => {
      setLoading(true);
      let dataToSend = { qty: qty, donor_id : value, bank : valueBB };
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.url+'saveDonation.php', {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.status == 'success'){
            alert('Success!');
          }else{
            alert('Failed!');
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    
    useEffect(() => {
      getDonors();
      getBloodBanks();
    }, [])

  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={{flex: 1, padding: 8, backgroundColor: '#fff', borderRadius: 5}}>
        <Loader loading={loading} />
        
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>ADD DONATION FORM</Text>
        <Text style={{color: 'black', fontSize: 15, marginTop: 30}}>DONOR</Text>
        <View
            style={{ zIndex: 9999 }}
        >
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={{ width: "100%", borderRadius: 1, alignItems: 'center' }}
            style={{ borderRadius: 5 }}
            labelStyle={{ fontWeight: "bold" }}
            textStyle={{ fontSize: 15 }}
            placeholderStyle={{ color: "grey", fontWeight: "bold", textAlign: 'center' }}
            disableBorderRadius={true}
            placeholder="Select Donor"
          />
        </View>
        <Text style={{color: 'black', fontSize: 15, marginTop: 10}}>BLOOD BANK</Text>
        <View
            style={{ zIndex: 8000 }}
        >
        <DropDownPicker
          open={openBB}
          value={valueBB}
          items={banks}
          setOpen={setOpenBB}
          setValue={setValueBB}
          setItems={setBloodBanks}
          containerStyle={{ width: "100%", zIndex: 8000, borderRadius: 1, alignItems: 'center' }}
          style={{ borderRadius: 5 }}
          labelStyle={{ fontWeight: "bold" }}
          textStyle={{ fontSize: 15 }}
          placeholderStyle={{ color: "grey", fontWeight: "bold", textAlign: 'center' }}
          disableBorderRadius={true}
          placeholder="Select Blood Bank"
        />
        </View>
        <Text style={{color: 'black', fontSize: 15, marginTop: 10}}>QUANTITY</Text>
        <TextInput placeholder="Enter quantity" placeholderTextColor={'black'} keyboardType="numeric" style={styles.inputStyle} onChangeText={(qty) =>
            setQty(qty)
          }>
        </TextInput>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.8}
          onPress={() => saveDonation()}>
          <Text style={styles.buttonTextStyle}>SAVE</Text>
        </TouchableOpacity>
        {/* <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#fff',
    marginBottom: 3,
    borderRadius: 3,
  },
  textTitle: {
    width: '30%',
    color: '#3d3d3d',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  textInputChild: {
    width: '65%',
    color: 'black',
    alignSelf: 'center',
    fontSize: 12,
    borderColor: 'black',
    height: 32,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputStyle: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    paddingHorizontal: 10,
    fontSize: 18
  },
  buttonStyle: {
    backgroundColor: '#00b300',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#00b300',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 80,
    marginTop: 15,
  },
  
  buttonTextStyle: {
    color: '#FFFFFF',
    padding: 8,
    fontSize: 20,
    fontWeight: 'bold'
  },
})
 
export default AddDonationScreen;