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
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }
  useFocusEffect(
    React.useCallback(() => {
      getAllBlood();
      console.log(bags)
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
              {bags.map((value) => (
                <View style={{
                  width: '100%',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  borderColor: '#717275cf',
                  borderWidth: 1,
                  padding: 5,
                  marginTop: 5    
                }}>
                  <View>
                    <Text style={{color: 'black', fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>
                      TYPE {value.blood_type ? value.blood_type : "N/A"}
                    </Text>
                    
                    {value.data.map((item) =>
                    <View style={{color: 'black'}}>
                      <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>{item.city} - {item.quantity}</Text>
                    </View>
                      )}
                  </View>
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