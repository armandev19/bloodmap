import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Loader from './Components/loader';
import DropDownPicker from 'react-native-dropdown-picker';

const AddBloodBankScreen = ({navigation, route}) => {
    const params = route.params
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    const saveBloodBank = () => {
      setLoading(true);
      let dataToSend = { name: name };
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.url+'insertBloodBank.php', {
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
      // getDonors();
    }, [])

  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={{flex: 1, padding: 8, backgroundColor: '#fff', borderRadius: 5}}>
        <Loader loading={loading} />
        <Text style={{color: 'black', fontSize: 15, marginTop: 10}}>Name</Text>
        <TextInput placeholder="Enter Blood Bank" placeholderTextColor={'black'} style={styles.inputStyle} onChangeText={(name) =>
            setName(name)
          }>
        </TextInput>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.8}
          onPress={() => saveBloodBank()}>
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
 
export default AddBloodBankScreen;