import {Button, StyleSheet,View,Text,ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { useState } from 'react';
import { Chip } from 'react-native-paper';
import { formatDistance, subDays,add } from "date-fns";


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
    console.log(getFormattedDate());

    // marking dates initially
    let markedDates = {};
    let plantsPerDate = {};
    for (let plant of plants) {
      for (let date of plant.potentialWaterings){
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
    console.log(markedDates)

    const isWatered = (plantName,dateString) => {
      // find plant
      for (let plant of plants){
        if (plant.name === plantName){
          if (plant.pastWaterings.includes(dateString)){
            return true;
          } else { return false; }
        }
      }
    }
    
    return (
      <View>
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
                  <Chip key={i} 
                  value={i + 1}
                  style={{margin: 5}}
                  selected={isWatered(plantsPerDate[selectedDay][i],selectedDay)}>
                    {plantsPerDate[selectedDay][i]}
                  </Chip>
                )
              }
            </View>
          </ScrollView>
        </View>
        
      </View>
  
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
    height:200,
    margin:10,
    borderRadius:50,
    padding: 20
  },
  date:{
    fontSize:20,
    alignSelf:'center'
  }
})
