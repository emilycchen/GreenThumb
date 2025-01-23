
import { Image, Text,StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity} from 'react-native';
import { IconButton,Surface,Button } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useState,useEffect} from 'react';
import HomePlantIcon from './subcomponents/HomePlantIcon';
import { formatDistance, startOfToday,differenceInDays, intervalToDuration, subDays,add,parse,format } from "date-fns";
import supabase from '../supabaseClient';
// Home page
export default function Home({route}) {
  
  const {username} = route.params

  const navigation = useNavigation();

  const [plants,setPlants] = useState([]);

  //console.log(username)

  // fetch user's plants
  useEffect( () => {
        const fetchPlants = async () => {
            const {data, error} = await supabase
            .from('Plants')
            .select(`*, Users(*)`)
            .eq('owners_username',username)
        
            if (error) {
                console.log(error)
            }
            if (data){
                let tempPlantList = []
                for (let item of data){
                    let plant = {
                        plant_id: item.plant_id,
                        name: item.name,
                        species: item.species,
                        is_native: item.is_native,
                        is_indoors: item.is_indoors,
                        icon_file_path: item.icon_file_path,
                        water_frequency: item.water_frequency,
                        water_record: item.water_record,
                        water_schedule: item.water_schedule,
                        created_at: item.created_at,
                        notes: item.notes
                    }
                    tempPlantList.push(plant)
                }
                setPlants(tempPlantList)
            }
        }
        
      fetchPlants()
        
      }
    )
    // console.log('plant list :')
    //console.log(plants)
    // console.log(username)
    //console.log('home')


  // date functions
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
//   for (let plant of plants){
//     const lastDay = parse(plant.potentialWaterings[plant.potentialWaterings.length-1], 'yyyy-MM-dd',new Date());
//     const firstDay = parse(plant.potentialWaterings[0], 'yyyy-MM-dd',new Date());
//     const today = startOfToday();
//     if (differenceInDays(lastDay,today) < 30){
//       addPotentialDates(plant.potentialWaterings,plant.freqWaterByDay,lastDay);
//     }
//     if (differenceInDays(today,firstDay) > 30){
//       deleteOldDates(plant.potentialWaterings,subDays(today,30));
//     }
//   }

  
// OLD CODE THAT ADDED PLANTS TO LIST
//   useEffect(() => {
//     if(route.params){
//       //setPlants([...plants,route.params.newPlant]);
//       const newPlants = [];
//       for (let i = 0; i < plants.length; i++){
//         newPlants.push(plants[i]);
//       }
//       newPlants.push(route.params.newPlant);
//       setPlants(newPlants);
//     }
//   },[route.params]);

  //console.log(plants);

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gridRow}>
        <HomePlantIcon display_id={0} plants={plants}/>
        <HomePlantIcon display_id={1} plants={plants}/>
        <HomePlantIcon display_id={2} plants={plants}/>
      </View>
      <View style={styles.gridRow}>
        <HomePlantIcon display_id={3} plants={plants}/>
        <HomePlantIcon display_id={4} plants={plants}/>
        <HomePlantIcon display_id={5} plants={plants}/>
      </View>
      <View style={styles.gridRow}>
        <HomePlantIcon display_id={6} plants={plants}/>
        <HomePlantIcon display_id={7} plants={plants}/>
        <HomePlantIcon display_id={8} plants={plants}/>
      </View>

      

      <Button mode="outlined" textColor='green' onPress = {() => navigation.navigate('Plant List',{plants:plants})}>All Plants</Button>
      
      <View style={styles.bannerBottom}>
        <TouchableOpacity onPress = {() => navigation.navigate('Add Plant',{owners_username: username})}>
          <IconButton mode='contained' icon='plus' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('Articles')}>
          <IconButton mode='contained' icon='newspaper-variant-multiple' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('Plant Calendar',{plants:plants})}>
          <IconButton mode='contained' icon='calendar' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('Login')}>
          <IconButton mode='contained' icon='door-open' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
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