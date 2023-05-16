import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, Button, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
const UserDetailsScreen = ({route, navigation}) => {
  
  const [loading, setLoading] = useState(false);
  const currentUserData = useSelector(selectUserData);


  const approveUser = () => {
    let user_id = params.id
    let dataToSend = {
        user_id: user_id,
    };
    let formBody = [];
    setLoading(true);
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    setLoading(true);
    fetch(global.url+'approveUser.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status = 'success'){
        alert("User Approved!");
      }else{
        alert("Error approving user!");
      }
      setLoading(false);
      setTimeout(()=>{
       navigation.navigate('UsersScreenStack');
      }, 2000);
    })
    .catch((error) => {
      setLoading(false);
    });
  }

  const params = route.params
  console.log(currentUserData);
    return (
      <SafeAreaView style={{padding: 10}}>
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 10}}>
          <Icon style={{color: '#8c8e91', fontSize: 150, textAlign: 'center', marginBottom: 30}} name="account"></Icon>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Name:</Text>
            <Text style={{color: 'black', fontWeight: 'bold', textTransform: 'uppercase'}}> {params.firstname} {params.middlename.charAt(0)}. {params.lastname} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Age:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.age} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Bloodtype:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.bloodtype ? params.bloodtype : 'N/A'} </Text>
          </Text>
          <Text style={{fontSize: 20}} selectable>
            <Text style={{color: '#030000'}}>Phone No:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}} > {params.phone_number ? params.phone_number : 'N/A'} </Text>
          </Text>
          <Text style={{fontSize: 20, marginBottom: 20}}>
            <Text style={{color: '#030000'}}>Gender:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.gender ? params.gender : 'N/A'} </Text>
          </Text>
          {currentUserData.access == 'Admin' ? (
            <Button title="Approve" onPress={approveUser} style={{ alignContents: "center", marginTop: 10}}></Button>
          ) : (
            <Text></Text>
          )}
        </View>
      </SafeAreaView>
    )  
};
 
export default UserDetailsScreen;