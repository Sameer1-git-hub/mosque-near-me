import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Screens/Home';
import Favorite from './src/Screens/Favorite';
import ProfileScreen from './src/Screens/ProfileScreen';
import Loginform from './src/logincomponent/Login';
import Register from './src/logincomponent/Register';
import Popupform from './src/logincomponent/popups/Popupform';
import Map from './src/Screens/Map';
import Registerpopup from './src/logincomponent/popups/Registerpopup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Define your tab navigator screens
function TabNavigator() {
  return (
    <Tab.Navigator 
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Favorite') {
          iconName = focused ? 'cards-heart' : 'cards-heart-outline';
        } else if (route.name === 'Account') {
          iconName = focused ? 'account' : 'account-outline';
        }else if (route.name === 'Map') {
          iconName = focused ? 'map' : 'map-outline';
        }

        return <Icon name={iconName} size={30} color={'#0B7955'} />;
      },
    })}
     >
      <Tab.Screen name="Dashboard" component={Home}/>
      <Tab.Screen name="Favorite" component={Favorite}/>
      <Tab.Screen name="Account" component={ProfileScreen}/>
      <Tab.Screen name="Map" component={Map}/>
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Login" component={Loginform} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Popupform" component={Popupform} />
        <Stack.Screen name="Registerpopup" component={Registerpopup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}