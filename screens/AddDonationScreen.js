import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import Loader from './Components/loader';
import DropDownPicker from 'react-native-dropdown-picker';

const AddDonationScreen = ({navigation, route}) => {
    const params = route.params
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState('');
      
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [visible, setVisible] = useState(false);
    
    const [test, setTest] = useState([]);
    const [items, setItems] = useState([]);
    const [qty, setQty] = useState('');


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
    
    useEffect(() => {
      getDonors();
    }, [])

  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={{flex: 1, padding: 8, backgroundColor: '#fff', borderRadius: 5}}>
        <Loader loading={loading} />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={{ width: "100%" }}
            placeholder="Select Donor"
          />
          <TextInput placeholder="Qty" placeholderTextColor={'black'} keyboardType="numeric" style={styles.inputStyle} onChangeText={(qty) =>
              setQty(qty)
            }>
          </TextInput>
        {/* <Button icon="check-underline" buttonColor="black" mode="contained" style={{marginTop: 20}} onPress={() => updateUserData()}>
          Save
        </Button> */}
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
    marginTop: 10,
  },
})
 
export default AddDonationScreen;