import React from 'react';
import {View, Text, SafeAreaView, TextInput, Button} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';


const UserDetailsScreen = ({route, navigation}) => {
  const params = route.params
  
    return (
      <SafeAreaView style={{padding: 10}}>
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 10}}>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Firstname:</Text>
            <Text style={{color: 'orange', fontWeight: 'bold'}}> {params.firstname} </Text>
          </Text>
          {/* <Button title="Save" style={{ alignContents: "center"}}></Button> */}
        </View>
      </SafeAreaView>
    )  
};
 
export default UserDetailsScreen;