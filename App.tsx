import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Screens/Home';
import Favorite from './src/Screens/Favorite';
import ProfileScreen from './src/Screens/ProfileScreen';
import Loginform from './src/logincomponent/Login';
import Register from './src/logincomponent/Register';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Registerpopup from './src/logincomponent/popups/Registerpopup';
import Popups from './src/logincomponent/popups/Popupheandel';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Tabs = AnimatedTabBarNavigator();

function TabNavigator() {
  return (
    <Tabs.Navigator
    appearance={{
      floating: true,
      tabBarBackground: '#fff',
      activeTabBackgrounds: '#509494',
      whenActiveShow: 'icon-only',
      dotSize: 'small',
    }}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'cards-heart' : 'cards-heart-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          }

          return <Icon name={iconName ?? 'defaultIconName'} size={30} color={focused ? '#fff' : '#5F8575'} />;
        },
      })}
    >
      <Tabs.Screen name="Dashboard" component={Home} />
      <Tabs.Screen name="Favorite" component={Favorite} />
      <Tabs.Screen name="Account" component={ProfileScreen} />
    </Tabs.Navigator>

  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Login" component={Loginform} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Popups" component={Popups} />
        <Stack.Screen name="Registerpopup" component={Registerpopup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
