import {Button, StyleSheet,View,Text,ScrollView,Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { use, useState } from 'react';
import { Chip } from 'react-native-paper';
import { formatDistance, subDays,add } from "date-fns";
import supabase from '../supabaseClient';

{/* <Calendar 
          style={styles.calendar}
          onDayPress={day => {
            const str = day.dateString
            day.selected=true;
            day.selectedColor='green';
            setSelectedDay(str);
            console.log(selectedDay);
          }}
          
          markedDates={{
            [selectedDay]: {selected:true,marked:false,selectedColor:'green'},
            '2025-01-25':{selected:false,marked:true,dotColor:'orange'}
          }}
          
        /> */}

export default function PlantCalendar({route}){
  const {plants} = route.params;
  
  // save plants as a state var with only neccessary fields
  let temp = []
  for (let i = 0; i < plants.length; i++){
    let plant = {
      name: plants[i].name,
      water_record: plants[i].water_record,
      water_schedule: plants[i].water_schedule,
    }
    temp.push(plant)

  }
  const [plantsCopy, setPlantsCopy] = useState(temp)
  //console.log(plantsCopy)
  
    const getFormattedDate = () => {
      const today = new Date();
      let day = today.getDate();
      let month = today.getMonth()+1;
      let year = today.getFullYear();
      if (month < 10){
        month = '0' + month;
      }
      if (day < 10){
        day = '0' + day;
      }
      return(`${year}-${month}-${day}`);
    }
    
    const navigation = useNavigation();
    const [selectedDay, setSelectedDay] = useState(getFormattedDate());

    // marking dates initially
    let markedDates = {};
    let plantsPerDate = {};

    for (let plant of plantsCopy) {
      for (let date of plant.water_schedule){
        markedDates[date] = {selected:false,marked:true,dotColor:'dodgerblue'}
        if (date in plantsPerDate){
          plantsPerDate[date].push(plant.name);
        } else {
          plantsPerDate[date] = [plant.name];
        }
          
      }
  
    }
    // if (! selectedDay in plantsPerDate){
    //   plantsPerDate[selectedDay] = [];
    // }
    markedDates[selectedDay] = {selected:true,marked:false,selectedColor:'green'};

    const isWatered = (plantName,dateString) => {
      // find plant
      for (let plant of plantsCopy){
        if (plant.name === plantName){
          if (plant.water_record.includes(dateString)){
            return true;
          } else { return false; }
        }
      }
    }

    const getPlant = (plantName) => {
      for (let plant of plantsCopy){
        if (plant.name === plantName){
          return plant;
        }
      }
    }

    // console.log(getPlant('Purslane').water_record)
    // console.log(isWatered('Purslane','2025-01-01'))

    // UNUSED
    const fetchWaterRecord = (plantName) => {
      const [record,setRecord] = useState([])
      const fetchWaterRecordAux = async () => {
        const {data, error} = await supabase
            .from('Plants')
            .select()
            .eq('name', plantName) 
            .single()
        
        if (error) {
            console.log(error)
        }
        if (data){
          setRecord(data.water_record)
        }
      }
      fetchWaterRecordAux()
      return (record.slice())
    }
    // console.log('water record')
    // console.log(fetchWaterRecord('Purslane'))

    const setWaterRecord = async (plantName, water_record) => {
      const {data, error} = await supabase
          .from('Plants')
          .update({ water_record })
          .eq('name', plantName)
      
      if (error) {
          console.log(error)
      }
      if (data) {
        console.log('updated')
      }
    }



    return (
      <ScrollView contentContainerStyle={{height:900,backgroundColor: '#f8f4ed'}}>
        <Calendar 
          style={styles.calendar}
          onDayPress={day => {
            setSelectedDay(day.dateString);
          }}
          markedDates={markedDates}
        />
        <View style={styles.listContainer}>
          <ScrollView style={styles.listBox}>
            <Text style={styles.date}>{selectedDay} 💧</Text>
            <View style={{margin:10}}>
              {
                Array.from({ length: selectedDay in plantsPerDate ? plantsPerDate[selectedDay].length : 0 }).map((_, i) => 
                  <Chip 
                  selectedColor='#5e775f'
                  mode='outlined'
                  key={i} 
                  value={i + 1}
                  style={{margin: 5}}
                  onPress={() => {
                    const currentPlant = getPlant(plantsPerDate[selectedDay][i])
                    console.log(currentPlant.name)
                    console.log(isWatered(currentPlant.name,selectedDay))
                    if (!isWatered(currentPlant.name,selectedDay)){
                      // saving changes in tempWaterRecord
                      let tempWaterRecord = []
                      for (let date of currentPlant.water_record){
                        tempWaterRecord.push(date)
                      }
                      tempWaterRecord.push(selectedDay)
                      // saving tempWaterRecord to plantsCopy
                      let tempPlantsCopy = []
                      for (let i = 0; i < plantsCopy.length; i++){
                        let plant = {
                          name: plantsCopy[i].name,
                          water_record: currentPlant.name === plantsCopy[i].name ? tempWaterRecord : plantsCopy[i].water_record,
                          water_schedule: plantsCopy[i].water_schedule,
                        }
                        tempPlantsCopy.push(plant)
                      }
                      setPlantsCopy(tempPlantsCopy)
                      console.log('added selectedDay to water_record')
                      console.log(isWatered(currentPlant.name,selectedDay))} 
                  }}
                  selected={isWatered(plantsPerDate[selectedDay][i],selectedDay)}
                  >
                    {plantsPerDate[selectedDay][i]}
                  </Chip>
                )
              }
            </View>
          </ScrollView>
          <Button title='Save Changes' onPress={() => {
            for (let plant of plantsCopy){
              setWaterRecord(plant.name, plant.water_record)
            }
          }}/>
        </View>
      </ScrollView>
  
    )
}

const styles = StyleSheet.create({
  listContainer:{
    alignItems:'center'
  },
  calendar:{
    height:350,
  },
  listBox:{
    backgroundColor:'white',
    width: '90%',
    margin:10,
    borderRadius:50,
    padding: 20
  },
  date:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5e775f',
    paddingBottom: 10,
    
    alignSelf:'center'
  }
})
