
import { Image, StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity} from 'react-native';
import { IconButton,Surface,Button } from 'react-native-paper';
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
import HomePlantIcon from './components/subcomponents/HomePlantIcon.js';

// Home page
function Home({route}) {
  const navigation = useNavigation();
  const h = Dimensions.get('screen').height;
  const w = Dimensions.get('screen').width;

  const [plants,setPlants] = useState([
    {
      name: "Purple flower",
      species: "purple flower species",
      indoors: false,
      native: false,
      iconFile: "https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg",
      waterWeek: 1,
      waterDay: ["mon","wed","fri"],
      pastWaterings: ["2021-10-01","2021-11-01","2021-12-01"],
      dateRegistered: "2021-09-01"
    },
    {
      name: "Spider plant",
      species: "spider plant species",
      indoors: true,
      native: false,
      iconFile: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Green_plants_1.jpg",
      waterWeek: 2,
      waterDay: ["mon"],
      pastWaterings: ["2021-10-01","2021-11-01","2021-12-01"],
      dateRegistered: "2021-09-01"
    },

  ]);
  
  for (let i = 0; i < plants.length; i++){
    console.log(plants[i].name);
  }
  

  useEffect(() => {
    if(route.params){
      //setPlants([...plants,route.params.newPlant]);
      const newPlants = [];
      for (let i = 0; i < plants.length; i++){
        newPlants.push(plants[i]);
      }
      newPlants.push(route.params.newPlant);
      setPlants(newPlants);
    }
  },[route.params]);
  
  
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.gridRow}>
        <HomePlantIcon id={0} plants={plants}/>
        <HomePlantIcon id={1} plants={plants}/>
        <HomePlantIcon id={2} plants={plants}/>
      </View>
      <View style={styles.gridRow}>
        <HomePlantIcon id={3} plants={plants}/>
        <HomePlantIcon id={4} plants={plants}/>
        <HomePlantIcon id={5} plants={plants}/>
      </View>
      <View style={styles.gridRow}>
        <HomePlantIcon id={6} plants={plants}/>
        <HomePlantIcon id={7} plants={plants}/>
        <HomePlantIcon id={8} plants={plants}/>
      </View>

      

      <Button mode="outlined" textColor='green' onPress = {() => navigation.navigate('Plant List')}>All Plants</Button>
      
      <View style={styles.bannerBottom}>
        <TouchableOpacity onPress = {() => navigation.navigate('Add Plant')}>
          <IconButton mode='contained' icon='plus' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('Articles')}>
          <IconButton mode='contained' icon='newspaper-variant-multiple' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>2

        <TouchableOpacity onPress = {() => navigation.navigate('Plant Calendar')}>
          <IconButton mode='contained' icon='calendar' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('Badges')}>
          <IconButton mode='contained' icon='trophy' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#e6e8e6',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  gridRow:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    left:-10
  },
  bannerBottom:{
    width:'100%',
    height: 150,
    bottom:-30,
    //move down a bit
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  bottomBtn:{
    width:50,
    height:50,
    backgroundColor:'#97f043',
    borderRadius:25,
    margin:10
  },
  
});
