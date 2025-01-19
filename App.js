
import { Image, Text,StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity} from 'react-native';
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
//import FetchPlant from './components/FetchPlant.js';
import HomePlantIcon from './components/subcomponents/HomePlantIcon.js';
import { formatDistance, startOfToday,differenceInDays, intervalToDuration, subDays,add,parse,format } from "date-fns";

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
      freqWaterByDay: 7,
      pastWaterings: ["2025-01-05","2025-01-12"],
      potentialWaterings: ["2025-01-12",'2025-01-19'],
      dateRegistered: "2021-09-01"
    },
    {
      name: "Spider plant",
      species: "spider plant species",
      indoors: true,
      native: false,
      iconFile: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Green_plants_1.jpg",
      freqWaterByDay: 14,
      pastWaterings: ["2025-01-09","2025-01-23"],
      potentialWaterings: ["2025-01-23",'2025-01-19'],
      dateRegistered: "2021-09-01"
    },
  ]);

  const generateFutureDates = (startDate, freqWaterByDay) => {
    const potentialWateringDates = [];
    let count = 0;
    let newDate = new Date();
    let oldDate = startDate;
    // generate watering dates within 60 days of last watering
    while (count <= 30){
      newDate = add(oldDate, {
        days: freqWaterByDay
      });
      potentialWateringDates.push(format(newDate, 'yyyy-MM-dd'));
      oldDate = newDate;
      count += freqWaterByDay;
    }
    return(potentialWateringDates);
  }
  
  // NEED FUNCTION TO GENERATE MORE POTENTIAL DATES AND DELETE OLD DATES
  

  const addPotentialDates = (potentialDates,freqWaterByDay,lastDay) => {
    let potentialDatesCopy = [];
    //copy
    for (let date in potentialDates){
      potentialDatesCopy.push(date);
    }
    // generate dates and add to copy
    const newDates = generateFutureDates(lastDay,freqWaterByDay);
    for (let date in newDates){
      potentialDatesCopy.push(date);
    }
    return (potentialDatesCopy);
  }

  const deleteOldDates = (potentialDates,earliestAllowed) => {
    let potentialDatesCopy = [];
    for (let date in potentialDates){
      if (isBefore(earliestAllowed,parse(date,'yyyy-MM-dd',new Date()))){
        potentialDatesCopy.push(date);
      }
    }
    return(potentialDatesCopy);
  }
  // THIS DOES NOT WORK, WAITING FOR DATABASE 
  for (let plant of plants){
    const lastDay = parse(plant.potentialWaterings[plant.potentialWaterings.length-1], 'yyyy-MM-dd',new Date());
    const firstDay = parse(plant.potentialWaterings[0], 'yyyy-MM-dd',new Date());
    const today = startOfToday();
    if (differenceInDays(lastDay,today) < 30){
      addPotentialDates(plant.potentialWaterings,plant.freqWaterByDay,lastDay);
    }
    if (differenceInDays(today,firstDay) > 30){
      deleteOldDates(plant.potentialWaterings,subDays(today,30));
    }
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

  console.log(plants);

  
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

      

      <Button mode="outlined" textColor='green' onPress = {() => navigation.navigate('Plant List',{plants:plants})}>All Plants</Button>
      
      <View style={styles.bannerBottom}>
        <TouchableOpacity onPress = {() => navigation.navigate('Add Plant')}>
          <IconButton mode='contained' icon='plus' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('Articles')}>
          <IconButton mode='contained' icon='newspaper-variant-multiple' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>2

        <TouchableOpacity onPress = {() => navigation.navigate('Plant Calendar',{plants:plants})}>
          <IconButton mode='contained' icon='calendar' containerColor='green' iconColor='lightgreen'size={35}/>
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
