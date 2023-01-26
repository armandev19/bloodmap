import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Import React and Component
import React from 'react';
 
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
// Import Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DrawerNavigationRoutes from './screens/DrawerNavigationRoutes';
import DetailScreen from './screens/DetailScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import UserDetailsScreen from './screens/UserDetailsScreen'
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
  // global.url = "http://192.168.1.6/bloodmap/";
  global.url = "https://homeworldconstruction.com/mobile/blood_saver/"
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
          title="Request Details"
          component={DetailScreen}
          options={{title: "Request Details"}}
        />
        <Stack.Screen
          name="EditProfileScreen"
          title="Edit Profile"
          component={EditProfileScreen}
          options={{title: "Edit Profile"}}
        />
        <Stack.Screen
          name="UserDetailsScreen"
          title="User Details"
          component={UserDetailsScreen}
          options={{title: "User Details"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};
 
export default App;