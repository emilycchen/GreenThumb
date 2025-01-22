import { NavigationContainer } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useState,useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Articles from './components/Articles.js'
import AddPlant from './components/AddPlant.js'
import Badges from './components/Badges.js'
import PlantInfo from './components/PlantInfo.js'
import PlantCalendar from './components/PlantCalendar.js';
import PlantList from './components/PlantList.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import FindNewPlant from './components/FindNewPlant.js';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Add Plant" component={AddPlant}/>
      <Stack.Screen name="Articles" component={Articles}/>
      <Stack.Screen name="Find New Plant" component={FindNewPlant} />
      <Stack.Screen name="Plant Info" component={PlantInfo}/>
      <Stack.Screen name="Plant Calendar" component={PlantCalendar}/>
      <Stack.Screen name="Plant List" component={PlantList}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}