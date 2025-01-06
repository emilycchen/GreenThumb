
import { StyleSheet, SafeAreaView, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Articles from './components/Articles.js'
import AddPlant from './components/AddPlant.js'
import Badges from './components/Badges.js'
import PlantInfo from './components/PlantInfo.js'

// Home page
function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor:'red', width:100,height:100}}/>
      <Button color = "blue" title="Go to Add Plant" onPress = {() => navigation.navigate('Add Plant')}/>
      <Button color = "red" title="Go to Articles" onPress = {() => navigation.navigate('Articles')}/>
      <Button color = "green" title="Go to Badges" onPress = {() => navigation.navigate('Badges')}/>
      <Button color = "orange" title="Go to Plant Info" onPress = {() => navigation.navigate('Plant Info')}/>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Add Plant" component={AddPlant}/>
      <Stack.Screen name="Articles" component={Articles}/>
      <Stack.Screen name="Badges" component={Badges}/>
      <Stack.Screen name="Plant Info" component={PlantInfo}/>
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
