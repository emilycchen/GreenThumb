import {Button, Image, Text,View,StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { getDate, set } from 'date-fns';
import supabase from '../supabaseClient';
import { formatDistance, subDays,add, isAfter, parse } from "date-fns";


export default function PlantInfo({route}){
  const h = Dimensions.get('screen').height;
  const w = Dimensions.get('screen').width;
  const {plant_id} = route.params;
  const garden = "https://upload.wikimedia.org/wikipedia/commons/e/e0/Back_garden_-_Flickr_-_peganum_%281%29.jpg";
  const indoors = "https://upload.wikimedia.org/wikipedia/commons/d/d5/Potted_plants_featuring_tropicals.jpg";
  

  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [is_native, setIsNative] = useState(false)
  const [is_indoors, setIsIndoors] = useState(false)
  const [icon_file_path, setIconFilePath] = useState('')
  const [water_frequency, setWaterFrequency] = useState([])
  const [water_record, setWaterRecord] = useState([])
  const [water_schedule, setWaterSchedule] = useState([])
  const [created_at, setCreatedAt] = useState(null)
  const [notes, setNotes] = useState('')


    useEffect(() => {
        const fetchPlant = async () => {
            const {data, error} = await supabase
                .from('Plants')
                .select()
                .eq('plant_id', plant_id) 
                .single()
            
            if (error) {
                console.log(error)
            }
            if (data){
              setName(data.name)
              setSpecies(data.species)
              setIsNative(data.is_native)
              setIsIndoors(data.is_indoors)
              setIconFilePath(data.icon_file_path)
              setWaterFrequency(data.water_frequency)
              setWaterRecord(data.water_record)
              setWaterSchedule(data.water_schedule)
              setCreatedAt(data.created_at)
              setNotes(data.notes)
            }
            
        }
        fetchPlant()
        //console.log('fetched ' + plant_id)
        
    })

    let nextWatering = ''
    const findNextWatering = () => {
      for (let date of water_schedule){
        // next watering is either after today or on today if plant has not been watered today
        if (isAfter(parse(date, 'yyyy-MM-dd', new Date()), Date()) ||
            (getDate(parse(date, 'yyyy-MM-dd', new Date())) === getDate(Date()) && !water_record.includes(date))){
          //setNextWatering(date)
          nextWatering = date
          break
        }
      }
    }
    findNextWatering()

    //const [nextWatering, setNextWatering] = useState('')
    

    return (

      <ScrollView contentContainerStyle={{ width: w,height: 900,alignItems:'center'}}>
        <Image source={{width:'100%',height:200,uri:is_indoors? indoors:garden}}/> 
        <View style={styles.titleBox}>
          <Text style={{fontSize:30, margin:10}}>{name}</Text>
          <Text>{species}</Text>
        </View>

        <View style={styles.box}>
          <Image source={{width:70,height:70,uri:"https://upload.wikimedia.org/wikipedia/commons/f/f8/2006-02-13_Drop-impact.jpg"}}/>
          <View style={styles.textBox}>
            <Text>Watering</Text>
            <Text>Last watered:</Text>
            <Text>{water_record? water_record[water_record.length-1] : 'No waterings'}</Text>
            <Text>Next watering:</Text>
            <Text>{nextWatering}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row',alignSelf:'flex-start',alignItems:'center'}}>
          <View style={styles.imageBox}>
            <Image source={{width:125,height:125,uri:icon_file_path}}/>
          </View>
          <View>
            <Text>Indoors?</Text>
            <Text>{is_indoors.toString()}</Text>
            <Text>Native Species?</Text>
            <Text>{is_native.toString()}</Text>
            <Text>Status:</Text>
            <Text>Nothing here yet</Text>
            <Text>Date Registered:</Text>
            <Text>{created_at}</Text>
          </View>
        </View>

        <View>
          <Text>Notes</Text>
          <View style={styles.box}>
            <View style={{width:'90%',height:100}}>
              <Text>{notes}</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      
    )
}

const styles = StyleSheet.create({
  container:{
   
  },
  box:{
    flexDirection:'row',
    justifyContent:'flex-start',
    borderRadius:20,
    backgroundColor:'white',
    width:'90%',
    padding:20,
    margin:10
  },
  imageBox:{
    flexDirection:'row',
    justifyContent:'center',
    borderRadius:20,
    backgroundColor:'white',
    padding:20,
    margin:20
  },
  textBox:{
    width:'80%',
    margin:15
  },
  titleBox:{
    alignItems: 'center'
  },
  
})