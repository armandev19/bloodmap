import React from 'react';
import {View, Text, SafeAreaView, TextInput, Button, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DonationDetailsScreen = ({route, navigation}) => {
  const params = route.params
    return (
      <SafeAreaView style={{padding: 10}}>
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 10}}>
          <Icon style={{color: '#8c8e91', fontSize: 150, textAlign: 'center', marginBottom: 30}} name="account"></Icon>
          
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Reference #:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.bld_request_number} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Donated Qty:</Text>
            <Text style={{color: 'black', fontWeight: 'bold', textTransform: 'uppercase'}}> {params.donated_qty} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Donator:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.donator} </Text>
          </Text>
          {/* <Button title="Save" style={{ alignContents: "center"}}></Button> */}
        </View>
      </SafeAreaView>
    )  
};
 
export default DonationDetailsScreen;