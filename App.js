
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
      <Button color = "blue" title="Go to Add Plant" onPress = {() => navigation.navigate('Add Plant')}/>
      <Button color = "red" title="Go to Articles" onPress = {() => navigation.navigate('Articles')}/>
      <Button color = "green" title="Go to Badges" onPress = {() => navigation.navigate('Badges')}/>
      <Button color = "orange" title="Go to Plant Info" onPress = {() => navigation.navigate('Plant Info')}/>
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
