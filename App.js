// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Others
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// FIrebase Authentication
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./Firebase";
// Import Screens
import HomeScreen from './screens/HomeScreen';
import ReadMoreScreen from './screens/ReadMoreScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import ReadingListScreen from './screens/ReadingListScreen';

// App.js manages the navigation of the app. 
// The ReadBook app utilizes tab navigation for the bottom navigation and
// stack navigation to navigate between screens (Login and Register or Search and ReadMore). 
// Firebase Authentication has also been implemented


export default function App() {

  const auth = getAuth(app);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Creating a Tab Navigator for the whole app
  const Tab = createBottomTabNavigator();

  const Stack = createNativeStackNavigator();
  
  // Creating a Stack Navigarot for moving between search and read more screens
  const SearchStack = createNativeStackNavigator();

  // Creating a LogIn screen Stack navigation
  const LoginStack = createNativeStackNavigator();

  // Creating a Register screen Stack navigation
  const RegisterStack = createNativeStackNavigator();


  // Navigation between Seacrh view and ReadMore view
  function SearchNavigator() {
    return (
      <SearchStack.Navigator screenOptions={{ headerShown: false }}>
        <SearchStack.Screen name="SearchView" component={SearchScreen} />
        <SearchStack.Screen name="ReadMore" component={ReadMoreScreen} />
      </SearchStack.Navigator>
    )
  }

  // Navigation between LogIn view and Register view
  function RegisterNavigator() {
    return (
      <RegisterStack.Navigator screenOptions={{ headerShown: false }}>
        <RegisterStack.Screen name="LogIn" component={LoginScreen} />
        <RegisterStack.Screen name="Register" component={RegisterScreen} />
      </RegisterStack.Navigator>
    )
  }


  // Botton tab navigation
  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // Function tabBarIcon is given the focused state,
            // color and size params
            let iconName;
            if (route.name === 'Home') {
              iconName = 'md-home';
            } else if (route.name === 'Search') {
              iconName = 'md-search';
            } else if (route.name === 'ReadingList') {
              iconName = 'md-book';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: '#E28500' },
          tabBarActiveTintColor: '#432818',
          tabBarInactiveTintColor: 'white',
          headerStyle: { backgroundColor: '#E28500' },
          headerTintColor: 'white',
          sceneContainerStyle: { backgroundColor: 'white' },

        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchNavigator} />
        <Tab.Screen name="ReadingList" component={ReadingListScreen} />
      </Tab.Navigator>
    )
  }

  // LogIn navigation
  function LoginNavigator() {
    return (
      <LoginStack.Navigator initialRouteName='LoginStack'>
        <LoginStack.Screen name='ReadBook' component={RegisterNavigator} />
      </LoginStack.Navigator>
    )
  }


  // Currently not working as it should. app should be user. Now app used that the tabnavigator opens
  return (
    <NavigationContainer>
      {app ? <TabNavigator /> : <LoginNavigator />} 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
