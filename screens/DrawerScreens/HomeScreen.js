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
      .then((response) => response.text())
      .then((responseJson) => {
        alert(responseJson);
        setLoading(false);
        // setBags(responseJson);
        console.log(bags);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }

  useEffect(()=>{
    // getAllBlood();
  }, []);

  if(currentUserData){
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            justifyContent: 'center',
          }}>
            {/* {bags.map(value => (
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
            ))} */}
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
                    TYPE A
                  </Text>
                  <View>
                    <Text style={{color: 'black', fontSize: 20}}>Bacolod: 10</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Talisay: 10</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Bago: 10</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Silay: 10</Text>
                  </View>
                </View>
            </View>
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
                    TYPE B
                  </Text>
                  <View>
                    <Text style={{color: 'black', fontSize: 20}}>Bacolod: 5</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Talisay: 6</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Bago: 8</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Silay: 9</Text>
                  </View>
                </View>
            </View>
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
                    TYPE AB
                  </Text>
                  <View>
                    <Text style={{color: 'black', fontSize: 20}}>Bacolod: 12</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Talisay: 7</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Bago: 4</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Silay: 3</Text>
                  </View>
                </View>
            </View>
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
                    TYPE A
                  </Text>
                  <View>
                    <Text style={{color: 'black', fontSize: 20}}>Bacolod: 2</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Talisay: 15</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Bago: 13</Text>
                    <Text style={{color: 'black', fontSize: 20}}>Silay: 22</Text>
                  </View>
                </View>
            </View>
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