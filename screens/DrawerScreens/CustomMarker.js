import React from 'react';
import {View, Text, SafeAreaView, TextInput, Button, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';


const CustomMarker = (title) => {
    return (
        <View style={styles.marker}>
          <Text style={styles.color}>{title}</Text>
        </View>
      );
}

 
const styles = StyleSheet.create({
    marker: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      backgroundColor: "#007bff",
      borderColor: "#eee",
      borderRadius: 5,
      elevation: 10,
    },
    text: {
    color: "#fff",   
    },
});
export default CustomMarker;