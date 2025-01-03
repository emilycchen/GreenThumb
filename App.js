
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableHighlight, Text, View, SafeAreaView, Alert,Image, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Articles from './components/Articles.js'
import AddPlant from './components/AddPlant.js'
import Badges from './components/Badges.js'
import PlantInfo from './components/PlantInfo.js'

function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Button color = "blue" title="Go to AddPlant" onPress = {() => navigation.navigate('AddPlant')}/>
      <Button color = "red" title="Go to Articles" onPress = {() => navigation.navigate('Articles')}/>
      <Button color = "green" title="Go to Badges" onPress = {() => navigation.navigate('Badges')}/>
      <Button color = "orange" title="Go to PlantInfo" onPress = {() => navigation.navigate('PlantInfo')}/>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddPlant" component={AddPlant}/>
      <Stack.Screen name="Articles" component={Articles}/>
      <Stack.Screen name="Badges" component={Badges}/>
      <Stack.Screen name="PlantInfo" component={PlantInfo}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
