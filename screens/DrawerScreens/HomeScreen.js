import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';


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
        console.log(bags);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }

  useEffect(()=>{
    getAllBlood();
  }, []);

  if(currentUserData){
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            justifyContent: 'center',
          }}>
            {bags.map(value => (
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
                  <Text style={{color: 'black', fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>
                    TYPE {value.blood_type ? value.blood_type : "N/A"}
                  </Text>
                  <View style={{color: 'black'}}>
                    <Text>City: 10</Text>
                    <Text>City: 10</Text>
                    <Text>City: 10</Text>
                    <Text>City: 10</Text>
                  </View>
                </View>
              </View>
            ))}
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