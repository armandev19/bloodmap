import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({navigation, props}) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const currentUserData = useSelector(selectUserData);
  const [bags, setBags] = useState([]);

  const getAllBlood = () => {
    setLoading(true)
    fetch(global.url + 'dashboard.php', {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
      }, 
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setBags(responseJson);
        console.log(responseJson)
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }
  useFocusEffect(
    React.useCallback(() => {
      getAllBlood();
    }, []),
  );

  if(currentUserData){
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            justifyContent: 'center',
          }}>
            {bags.length > 0 ? (
            <View
            style={{
              justifyContent: 'center',
            }}>
              {bags.map((category) => (
                <View style={{backgroundColor: 'white', marginTop: 5, padding: 5}} key={category.category}>
                  <View >
                    <Text style={{color: 'black', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 20}}>BLOOD BANK: {category.bank}</Text>
                  </View>
                  {category.items.length > 0 ? (
                    category.items.map((item) => (
                      <View style={{flexDirection: 'row', borderBottomColor: 'lightgray', borderBottomWidth: 1, padding: 2}}>
                      <View style={{flex: 1}}>
                        <Text style={{color: 'black', fontWeight: 'bold', textTransform: 'uppercase'}} key={item.id}>CITY: {item.city}</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={{color: 'black', fontWeight: 'bold', textTransform: 'uppercase'}} key={item.id}>QTY: {item.qty}</Text>
                      </View>
                    </View>
                  ))
                  ):(
                    <Text style={{color: 'black', fontSize: 15, textAlign: 'center'}}>No Data Found</Text>
                  )}
                  
                </View>
              ))}
            </View> 
            ) : (
              <View
              style={{
                justifyContent: 'center',
              }}>
                <Text style={{color: 'black', fontSize: 30, textAlign: 'center'}}>No Data Found</Text>
            </View> 
            )}
        </View>
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