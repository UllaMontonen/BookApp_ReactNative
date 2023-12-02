import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchScreen from './SearchScreen';
import ReadingListScreen from './ReadingListScreen';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';

// Import Screens
import HomeScreen from './HomeScreen';
import ReadMoreScreen from './ReadMoreScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';


// Firebase instal komento tehty
//import { initializeApp } from 'firebase/app';
//import { getDatabase, push, ref, onValue } from 'firebase/database';

// Creating Tab Navigator for the whole app
const Tab = createBottomTabNavigator();

// Creating Stack Navigarot for moving between search and read more screens
const Stack = createNativeStackNavigator();


// jos haluaa headerin piiloon: 
// <Stack.Navigator screenOptions={{ headerShown: false }}>
function SearchNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchView"
        component={SearchScreen} />
      <Stack.Screen name="ReadMore"
        component={ReadMoreScreen} />
    </Stack.Navigator>
  )
}


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

            } else if (route.name === 'LogIn') {
              iconName = 'md-person';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: '#E28500' },
          tabBarActiveTintColor: '#432818',
          tabBarInactiveTintColor: 'white',
          headerStyle: { backgroundColor: '#E28500'},
          headerTintColor: 'white',
          sceneContainerStyle: {backgroundColor: 'white'},
          
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchNavigator} />
        <Tab.Screen name="ReadingList" component={ReadingListScreen} />
        <Tab.Screen name="LogIn" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
