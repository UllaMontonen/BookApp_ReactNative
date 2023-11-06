import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchScreen from './SearchScreen';
import ReadingListScreen from './ReadingListScreen';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';
import HomeScreen from './HomeScreen';

// Firebase instal komento tehty

// Creating TabNavigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({  // Customizing navigator using screenOptions
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
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} /> 
        <Tab.Screen name="Search" component={SearchScreen} /> 
        <Tab.Screen name="ReadingList" component={ReadingListScreen} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}