
import { StyleSheet, SafeAreaView, View} from 'react-native';
import { PaperProvider,Chip,Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Articles from './components/Articles.js'
import AddPlant from './components/AddPlant.js'
import Badges from './components/Badges.js'
import PlantInfo from './components/PlantInfo.js'
import Calendar from './components/Calendar.js';

// Home page
function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Button mode="outlined" textColor="white" buttonColor="green" onPress = {() => navigation.navigate('Add Plant')}>Add Plant</Button>
      <Button mode="outlined" onPress = {() => navigation.navigate('Articles')}>Articles</Button>
      <Button mode="outlined" onPress = {() => navigation.navigate('Badges')}>Badges</Button>
      <Button mode="outlined" onPress = {() => navigation.navigate('Plant Info')}>Plant Info</Button>
      <Button mode="outlined" onPress = {() => navigation.navigate('Calendar')}>Calendar</Button>
      <View style={styles.bannerBottom}>
        <View style={styles.bottomBtn}/>
        <View style={styles.bottomBtn}/>
        <View style={styles.bottomBtn}/>
        <View style={styles.bottomBtn}/>
      </View>
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
      <Stack.Screen name="Calendar" component={Calendar}/>
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
    backgroundColor: '#e6e8e6',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  bannerBottom:{
    width:'100%',
    height: 100,
    bottom:-30,
    //move down a bit
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  bottomBtn:{
    width:50,
    height:50,
    backgroundColor:'#97f043',
    borderRadius:25,
    margin:10
  }
});
