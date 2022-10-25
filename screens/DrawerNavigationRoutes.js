import React from 'react';
 
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
 
// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/ProfileScreen';
import AcceptedScreen from './DrawerScreens/AcceptedScreen';
import MyRaisedRequestScreen from './DrawerScreens/MyRaisedRequestScreen';


import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHead';
 
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
            backgroundColor: 'orange', //Set Header color
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
 
const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
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
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const AcceptedRequestStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="AcceptedScreen">
      <Stack.Screen
        name="AcceptedRequestScreen"
        component={AcceptedScreen}
        options={{
          title: 'Accepted Requests', //Set Header Title
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

const MyRaisedRequestStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="MyRaisedRequestScreen">
      <Stack.Screen
        name="MyRaisedRequestScreen"
        component={MyRaisedRequestScreen}
        options={{
          title: 'My Raised Requests', //Set Header Title
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
 
const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        textColor: 'yellow',
        activeTintColor: 'red',
        activeBackgroundColor: 'white',
        inactiveTintColor: 'blue',
        inactiveBackgroundColor: 'white',
        itemStyle: {marginVertical: 5, color: 'red'},
        backgroundColor: '#cc0000'
      }}
      screenOptions={{headerShown: false, color: 'red'}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{drawerLabel: 'Home'}}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="ProfileScreenStack"
        options={{drawerLabel: 'My Profile'}}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="AcceptedScreen"
        options={{drawerLabel: 'Accepted Request'}}
        component={AcceptedRequestStack}
      />
      <Drawer.Screen
        name="MyRaisedRequestScreen"
        options={{drawerLabel: 'My Raised Request'}}
        component={MyRaisedRequestStack}
      />
      <Drawer.Screen
        name="DonationHistoryScreen"
        options={{drawerLabel: 'Donation History'}}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="PastRequest"
        options={{drawerLabel: 'Past Requests'}}
        component={HomeScreenStack}
      />
       
    </Drawer.Navigator>
  );
};
 
export default DrawerNavigatorRoutes;
