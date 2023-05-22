import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { Table, Row, Rows } from 'react-native-table-component';


const HomeScreen = ({navigation, props}) => {
  const [userData, setUserData] = useState({});
  const [tableHead, setTableHead] = useState(['A', 'B', 'AB', 'AB']);
  const [tableData, settableData] = useState([['1', '2', '3', '4'],
                                            ['a', 'b', 'c', 'd'],
                                            ['1', '2', '3', '456\n789'],
                                            ['a', 'b', 'c', 'd']])
  const currentUserData = useSelector(selectUserData);
 
  if(currentUserData){
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 16,
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              Welcome {currentUserData.firstname}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 16,
              color: 'black',
              fontWeight: 'bold',
              fontStyle: 'italic',
              textTransform: 'uppercase'
            }}>
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
      </View>
    </SafeAreaView>
  );
}
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: 'black' }
});
 
export default HomeScreen;