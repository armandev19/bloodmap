import React from 'react';
import {View, Text, SafeAreaView, TextInput, Button} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';


const DetailScreen = ({route, navigation}) => {
  const params = route.params
  if(params.status === 'Approved'){
    return (
      <SafeAreaView style={{ padding: 10}}>
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 10}}>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Request #:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.request_number} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Qty:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.qty} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Remaining Qty:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.donated_qty} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Date Needed:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.date_needed} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Purpose:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.purpose} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Status:</Text>
            <Text style={{color: 'green', fontWeight: 'bold'}}> {params.status} </Text>
          </Text>
          <TextInput 
            placeholder='Enter quantity to donate' 
            placeholderTextColor="black"
            style={{ color: 'black', fontSize: 20, borderColor: 'black', borderWidth: 1, borderRadius: 5, backgroundColor: 'white', marginTop: 20, marginBottom: 10 }} 
          />
            <Button title="Save" style={{ alignContents: "center"}}></Button>
        </View>
      </SafeAreaView>
    )
  }else{
    return (
      <SafeAreaView style={{padding: 10}}>
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 10}}>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Request #:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.request_number} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Qty:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.qty} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Date Needed:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.date_needed} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Purpose:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.purpose} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Status:</Text>
            <Text style={{color: 'orange', fontWeight: 'bold'}}> {params.status} </Text>
          </Text>
          {/* <Button title="Save" style={{ alignContents: "center"}}></Button> */}
        </View>
      </SafeAreaView>
    )  
  }
};
 
export default DetailScreen;