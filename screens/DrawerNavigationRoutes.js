import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import AcceptedScreen from './DrawerScreens/AcceptedScreen';
import MyRaisedRequestScreen from './DrawerScreens/MyRaisedRequestScreen';
import DonationHistoryScreen from './DrawerScreens/DonationHistoryScreen';
import PastRequestScreen from './DrawerScreens/PastRequestScreen';
// import MapViewScreen from './DrawerScreens/MapViewScreen';

import BloodInventoryScreen from './DrawerScreens/BloodInventoryScreen';
import DonorsScreen from './DrawerScreens/DonorsScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import ProfileScreen from './DrawerScreens/ProfileScreen';
import UsersScreen from './DrawerScreens/UsersScreen';
import BloodBankScreen from './DrawerScreens/BloodBankScreen';

import NavigationDrawerHeader from './Components/NavigationDrawerHead';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'HOME', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const BloodInventoryScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="BloodInventoryScreen">
      <Stack.Screen
        name="BloodInventoryScreen"
        component={BloodInventoryScreen}
        options={{
          title: 'BLOOD BANK', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const DonorsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="DonorsScreen">
      <Stack.Screen
        name="DonorsScreen"
        component={DonorsScreen}
        options={{
          title: 'BLOOD DONORS', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const PastRequestStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="PastRequestScreen">
      <Stack.Screen
        name="PastRequest"
        component={PastRequestScreen}
        options={{
          title: 'PAST REQUEST', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MyProfileStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'MY PROFILE', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AcceptedRequestStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="AcceptedScreen">
      <Stack.Screen
        name="AcceptedRequest"
        component={AcceptedScreen}
        options={{
          title: 'ACCEPTED REQUESTS', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MyRaisedRequestStack = ({navigation, route}) => {
  return (
    <Stack.Navigator initialRouteName="MyRaisedRequestScreen">
      <Stack.Screen
        name="MyRaisedRequest"
        component={MyRaisedRequestScreen}
        options={{
          title: 'MY RAISED REQUEST', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const BloodBankStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="BloodBankScreen">
      <Stack.Screen
        name="Blood Banks"
        component={BloodBankScreen}
        options={{
          title: 'BLOOD BANKS', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const UsersScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="UsersScreen">
      <Stack.Screen
        name="Users List"
        component={UsersScreen}
        options={{
          title: 'USERS LIST', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = ({navgiation, route}) => {
  const[user_data, setUserData] = useState({});
  
  useFocusEffect(
    React.useCallback(() => {
        setTimeout(async () => {

            try {
                const userData = await AsyncStorage.getItem('user_id');
                if (userData !== null) {
                    let userDataArray = JSON.parse(userData);
                    setUserData(userDataArray);
                }
            } catch (e) {
                console.log(e);
            }
        });
    }, [])
  );
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, color: 'red', textColor: 'yellow',
        activeTintColor: 'red',
        activeBackgroundColor: 'white',
        inactiveTintColor: 'blue',
        inactiveBackgroundColor: 'white',
        itemStyle: {marginVertical: 5, color: 'red'},
        backgroundColor: '#cc0000'}}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{drawerLabel: 'HOME', drawerIcon: (({focused}) => <Icon name="home" size={30} color="#900" />)}}
        component={HomeScreenStack}
        initialParams={{ params : user_data}}
      />
      <Drawer.Screen
        name="BloodInventoryScreenStack"
        options={{drawerLabel: 'BLOOD INVENTORY', drawerIcon: (({focused}) => <Icon name="invert-colors" size={30} color="#900" />)}}
        component={BloodInventoryScreenStack}
        initialParams={{ params : user_data}}
      />
      <Drawer.Screen
        name="AcceptedScreen"
        options={{drawerLabel: 'ACCEPTED REQUEST', drawerIcon: (({focused}) => <Icon name="check-circle-outline" size={30} color="#900" />)}}
        component={AcceptedRequestStack}
        initialParams={{ params: user_data }}
      />
      <Drawer.Screen
        name="MyRaisedRequestScreen"
        options={{drawerLabel: 'MY RAISED REQUEST', drawerIcon: (({focused}) => <Icon name="playlist-add" size={30} color="#900" />)}}
        component={MyRaisedRequestStack}
        initialParams={{ params: user_data }}
      />
      <Drawer.Screen
        name="BloodBankScreen"
        options={{drawerLabel: 'BLOOD BANKS', drawerIcon: (({focused}) => <Icon name="domain" size={30} color="#900" />)}}
        component={BloodBankStack}
        initialParams={{ params: user_data }}
      />
      <Drawer.Screen
        name="MyProfileStack"
        options={{drawerLabel: 'MY PROFILE', drawerIcon: (({focused}) => <Icon name="account-box" size={30} color="#900" />)}}
        component={MyProfileStack}
        initialParams={{ params: user_data }}
      />
     {(() => {
        if (user_data.access == 'Admin') {
            return (
            <Drawer.Screen
              name="UsersScreenStack"
              options={{drawerLabel: 'USERS', drawerIcon: (({focused}) => <Icon name="people" size={30} color="#900" />)}}
              component={UsersScreenStack}
              initialParams={{ params: user_data }}
            />
        );
      }
    })()}
       
    </Drawer.Navigator>
  );
};
 
export default DrawerNavigatorRoutes;
