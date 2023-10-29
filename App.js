import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './Home'
import Search from './Search';
import ReadingList from './ReadingList';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';


// Firebase instal komento tehty


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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="ReadingList" component={ReadingList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}