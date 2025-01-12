import {Button, StyleSheet,View,Text,ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { useState } from 'react';
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

export default function PlantCalendar(){
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
    
    return (
      <View>
        <Calendar 
          style={styles.calendar}
          onDayPress={day => {
            setSelectedDay(day.dateString);
          }}
          
          markedDates={{
            [selectedDay]: {selected:true,marked:false,selectedColor:'green'},
            '2025-01-25':{selected:false,marked:true,dotColor:'orange'}
          }}
          
        />
        <View style={styles.listContainer}>
          <ScrollView style={styles.listBox}>
            <Text style={styles.date}>{selectedDay}</Text>
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
    backgroundColor:'lightgreen',
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
