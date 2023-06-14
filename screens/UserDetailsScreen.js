import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
const UserDetailsScreen = ({route, navigation}) => {
  
  const [loading, setLoading] = useState(false);
  const currentUserData = useSelector(selectUserData);
  const [donorType, setDonorType] = useState('');
  const [bloodCollection, setBloodCollection] = useState('');
  const [lastDonation, setLastDonation] = useState('');
  const [donations, setDonations] = useState('');
  
  const [bodywt, setBodtWt] = useState('');
  const [bloodpressure, setBloodPressure] = useState('');
  const [pulserate, setPulseRate] = useState('');
  const [generalappearance, setGeneralAppearance] = useState('');
  const [skin, setSkin] = useState('');
  const [heent, setHeent] = useState('');
  const [heart_lungs, setHeartLungs] = useState('');
  const [remarks, setRemarks] = useState('');

  const params = route.params;
  console.log(params)
  const approveUser = () => {
    let user_id = params.id
    let dataToSend = {
        user_id: user_id,
    };
    let formBody = [];
    setLoading(true);
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    setLoading(true);
    fetch(global.url+'approveUser.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status = 'success'){
        alert("User Approved!");
      }else{
        alert("Error approving user!");
      }
      setLoading(false);
      setTimeout(()=>{
       navigation.navigate('UsersScreenStack');
      }, 2000);
    })
    .catch((error) => {
      setLoading(false);
    });
  }

  const getMedicalInfo = () => {
    let dataToSend = {
        id: params.id,
    };
    let formBody = [];
    setLoading(true);
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    setLoading(true);
    fetch(global.url+'getUserMedicalInfo.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setDonorType(responseJson[0].type_of_donor);
      setLastDonation(responseJson.last_donation_date);
      setDonations(responseJson.donations);
      setBloodCollection(responseJson[0].collection_method);

      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
    });
  }

  const saveMedicalInfo = () => {
    let user_id = params.id
    let dataToSend = {
        user_id: user_id,
        blood_collection: bloodCollection,
        donor_type: donorType,
        bodywt: bodywt,
        bloodpressure: bloodpressure,
        pulserate: pulserate,
        generalappearance: generalappearance,
        skin: skin,
        heent: heent,
        heart_lungs: heart_lungs,
        remarks: remarks
    };
    let formBody = [];
    setLoading(true);
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    setLoading(true);
    fetch(global.url+'updateMedicalInfo.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status = 'success'){
        alert("Medical Information Updated!");
      }else{
        alert("Failed update!");
      }
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
    });
  }

  const changeToDonor = () => {
    let user_id = params.id
    let dataToSend = {
        user_id: user_id,
    };
    let formBody = [];
    setLoading(true);
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    setLoading(true);
    fetch(global.url+'changeToDonor.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status = 'success'){
        alert("User changed to Donor!");
        setTimeout(function(){
          navigation.navigate('UsersScreenStack');
        }, 2000)
      }else{
        alert("Failed update!");
      }
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
    });
  }

  useEffect(()=>{
    getMedicalInfo();
  }, [])

    return (
      <ScrollView style={{padding: 10, marginBottom: 10, paddingBottom: 10}}>
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 10}}>
          <Icon style={{color: '#8c8e91', fontSize: 150, textAlign: 'center', marginBottom: 30}} name="account"></Icon>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Name:</Text>
            <Text style={{color: 'black', fontWeight: 'bold', textTransform: 'uppercase'}}> {params.firstname} {params.middlename.charAt(0)}. {params.lastname} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Age:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.age} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Bloodtype:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.bloodtype ? params.bloodtype : 'N/A'} </Text>
          </Text>
          <Text style={{fontSize: 20}} selectable>
            <Text style={{color: '#030000'}}>Phone No:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}} > {params.phone_number ? params.phone_number : 'N/A'} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Gender:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.gender ? params.gender : 'N/A'} </Text>
          </Text>
          <Text style={{fontSize: 20, marginBottom: 20}}>
            <Text style={{color: '#030000'}}>User Type:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.access ? params.access : 'N/A'} </Text>
          </Text>
          {params.access == 'Donor' || params.access == 'Admin' ? (
            <View></View>
          ) : (
          <View>
            <Button onPress={changeToDonor} title="Change to Donor"></Button>
          </View>
          )}
          {currentUserData.access == 'Admin' && (params.status == "" ||  params.status == "Pending")? (
            <Button title="Approve" onPress={approveUser} style={{ alignContents: "center", marginTop: 10}}></Button>
          ) : (
            <View></View>
          )}
        </View>
        {currentUserData.access == 'Admin' && params.status == "Approved"? (
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 10, marginTop: 5}}>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>Donor Type: </Text>
            <TextInput value={donorType} placeholder="Donor Type" style={styles.textInputChild} onChangeText={(donorType) =>
                      setDonorType(donorType)}/>
          </View>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>Blood Collection: </Text>
            <TextInput value={bloodCollection} placeholder="Blood Collection" style={styles.textInputChild} onChangeText={(bloodCollection) =>
                      setBloodCollection(bloodCollection)}></TextInput>
          </View>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>No of Donations: </Text>
            <TextInput value={donations} editable={false} style={styles.textInputChild} ></TextInput>
          </View>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>Last Donation: </Text>
            <TextInput value={lastDonation} editable={false} style={styles.textInputChild} ></TextInput>
          </View>

          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>Body Wt: </Text>
            <TextInput value={bodywt} placeholder="Donor Type" style={styles.textInputChild} onChangeText={(bodywt) =>
                      setBodtWt(bodywt)}/>
          </View>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>Blood Pressure: </Text>
            <TextInput value={bloodpressure} placeholder="Blood Collection" style={styles.textInputChild} onChangeText={(bloodpressure) =>
                      setBloodPressure(bloodpressure)}></TextInput>
          </View>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>Pulse Rate: </Text>
            <TextInput value={pulserate} style={styles.textInputChild} onChangeText={(pulserate) =>
                      setPulseRate(pulserate)}></TextInput>
          </View>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>General Appearance: </Text>
            <TextInput value={generalappearance} style={styles.textInputChild} onChangeText={(generalappearance) =>
                      setGeneralAppearance(generalappearance)}></TextInput>
          </View>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>Skin: </Text>
            <TextInput value={skin} style={styles.textInputChild} onChangeText={(skin) =>
                      setSkin(skin)}></TextInput>
          </View>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>Heent: </Text>
            <TextInput value={heent} style={styles.textInputChild} onChangeText={(heent) =>
                      setHeent(heent)}></TextInput>
          </View>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>Heart/Lungs: </Text>
            <TextInput value={heart_lungs} style={styles.textInputChild} onChangeText={(heart_lungs) =>
                      setHeartLungs(heart_lungs)}></TextInput>
          </View>
          <View style={styles.item}>
            <Text adjustsFontSizeToFit style={styles.textTitle}>Remarks: </Text>
            <TextInput value={remarks} style={styles.textInputChild} onChangeText={(remarks) =>
                      setRemarks(remarks)}></TextInput>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Button title="Update Medical Info" onPress={saveMedicalInfo}></Button>
          </View>
        </View>
        ) : (
          <View></View>
        )}
      </ScrollView>
    )  
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 3,
    borderRadius: 3,
  },
  textTitle: {
    width: '30%',
    color: '#3d3d3d',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  textInputChild: {
    width: '65%',
    color: 'black',
    backgroundColor: 'white',
    alignSelf: 'center',
    fontSize: 18,
    borderColor: 'black',
    height: 32,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  })
 
export default UserDetailsScreen;