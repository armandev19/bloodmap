import React from 'react';
import {View, Text, SafeAreaView, TextInput, Button, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserDetailsScreen = ({route, navigation}) => {
  console.log("params"+route.params.age)
  const params = route.params
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
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Gender:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.gender ? params.gender : 'N/A'} </Text>
          </Text>
          {/* <Button title="Save" style={{ alignContents: "center"}}></Button> */}
        </View>
      </SafeAreaView>
    )  
};
 
export default UserDetailsScreen;