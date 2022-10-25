import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
 
const MyRaisedRequestScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
              color: 'black'
            }}>
            Raised request screen
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
 
export default MyRaisedRequestScreen;