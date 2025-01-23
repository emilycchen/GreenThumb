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
  const indoors = "https://live.staticflickr.com/4089/4843832442_97e559de33.jpg";
  

  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [is_native, setIsNative] = useState(false)
  const [is_indoors, setIsIndoors] = useState(false)
  const [icon_file_path, setIconFilePath] = useState('')
  const [water_frequency, setWaterFrequency] = useState([])
  const [water_record, setWaterRecord] = useState([])
  const [water_schedule, setWaterSchedule] = useState([])
  const [created_at, setCreatedAt] = useState(null)
  const [notes, setNotes] = useState('None')


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
              if (data.notes !== 0){
                setNotes(data.notes)
              }
              
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

      <ScrollView contentContainerStyle={{ width: w,height: 830,alignItems:'center',backgroundColor:'#f8f4ed'}}>
        <Image source={{width:'100%',height:200,uri:is_indoors? indoors:garden}}/> 
        <View style={styles.titleBox}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.species}>{species}</Text>
        </View>

        <View style={styles.box}>
          <View style={{height:70,width:70}}>
            <Image style={{height:70,width:70,resizeMode:'contain'}} source={require('../assets/13plantProfileIcon.png')}/>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.subtitle}>Last watered:</Text>
            <Text>{water_record? water_record[water_record.length-1] : 'No waterings'}</Text>
            <Text style={styles.subtitle}>Next watering:</Text>
            <Text>{nextWatering}</Text>
          </View>
        </View>

        <View style={{flexDirection:'row',alignSelf:'flex-start',alignItems:'center'}}>
          <View style={styles.imageBox}>
            <Image source={{height:125,width:125,uri:icon_file_path}}/>
          </View>
          <View style={{width:160, height:'80%'}}>
            <Text style={styles.subtitle}>Indoors?</Text>
            <Text>{is_indoors.toString()}</Text>
            <Text style={styles.subtitle}>Native Species?</Text>
            <Text>{is_native.toString()}</Text>
            <Text style={styles.subtitle}>Date Registered:</Text>
            <Text>{created_at}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.subtitle}>Notes</Text>
          <View style={styles.box}>
            <View style={{width:'90%',height:50}}>
              <Text>{notes}</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      
    )
}

const styles = StyleSheet.create({
  box:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
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
    margin:15,
    right:-30
  },
  titleBox:{
    alignItems: 'center',
    
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5e775f',
    paddingTop:20
  },
  species: {
    fontSize: 20,
    fontWeight: 400,
    color: '#acd963',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 800,
    color: '#5e775f',
    paddingTop: 5
  },
  
})