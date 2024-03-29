import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Import React and Component
import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
// Import Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DrawerNavigationRoutes from './screens/DrawerNavigationRoutes';
import DetailScreen from './screens/DetailScreen'
import DonationDetailsScreen from './screens/DonationDetailsScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import UserDetailsScreen from './screens/UserDetailsScreen'
import DonorsDetailsScreen from './screens/DonorsDetailsScreen'
import BloodPerCityScreen from './screens/BloodPerCityScreen'
import AddDonationScreen from './screens/AddDonationScreen'
import DonorsListScreen from './screens/DonorsListScreen'
import AddBloodBankScreen from './screens/AddBloodBankScreen'

import { Provider } from 'react-redux';
import { store } from './screens/redux/store';

const Stack = createStackNavigator();
 
const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
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


const App = () => {
  // global.url = "http://192.168.7.152/bloodmap/";
  // global.url = "http://192.168.29.123/bloodmap/";
  
  global.url = "https://homeworldconstruction.com/mobile/blood_saver/";
  // global.url = "http://192.168.1.10/bloodmap/";
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }else{
        AsyncStorage.removeItem('user_id');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        
        <Stack.Screen
          name="DetailScreen"
          title="REQUEST DETAILS"
          component={DetailScreen}
          options={{title: "REQUEST DETAILS"}}
        />
        <Stack.Screen
          name="DonationDetailsScreen"
          title="DONATION DETAILS"
          component={DonationDetailsScreen}
          options={{title: "DONATION DETAILS"}}
        />
        <Stack.Screen
          name="EditProfileScreen"
          title="EDIT PROFILE"
          component={EditProfileScreen}
          options={{title: "EDIT PROFILE"}}
        />
        <Stack.Screen
          name="UserDetailsScreen"
          title="USER DETAILS"
          component={UserDetailsScreen}
          options={{title: "USER DETAILS"}}
        />
        <Stack.Screen
          name="DonorsDetailsScreen"
          title="DONOR DETAILS"
          component={DonorsDetailsScreen}
          options={{title: "DONOR DETAILS"}}
        />
        <Stack.Screen
          name="BloodPerCityScreen"
          title="BLOOD PER CITY"
          component={BloodPerCityScreen}
          options={{title: "BLOOD PER CITY"}}
        />
        <Stack.Screen
          name="AddDonationScreen"
          title="NEW DONATION"
          component={AddDonationScreen}
          options={{title: "NEW DONATION"}}
        />
        <Stack.Screen
          name="DonorsListScreen"
          title="DONORS LIST"
          component={DonorsListScreen}
          options={{title: "DONORS LIST"}}
        />
         <Stack.Screen
          name="AddBloodBankScreen"
          title="Add Blood Bank"
          component={AddBloodBankScreen}
          options={{title: "ADD BLOOD BANK"}}
        />

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};
 
export default App;