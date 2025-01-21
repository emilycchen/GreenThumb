import {Button, Dimensions,ScrollView,TouchableOpacity,StyleSheet,View,Text,Image, TouchableHighlight} from 'react-native';
import {TextInput,Chip,SegmentedButtons,Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import { formatDistance, subDays,add,parse,format } from "date-fns";
import supabase from '../supabaseClient';

export default function AddPlant({route}){
    const navigation = useNavigation();
    const h = Dimensions.get('screen').height;
    const w = Dimensions.get('screen').width;

    const {owners_username} = route.params 
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [is_native, setIsNative] = useState(false)
    const [is_indoors, setIsIndoors] = useState(false)
    const [icon_file_path, setIconFilePath] = useState('')
    const [water_frequency, setWaterFrequency] = useState('')
    const [water_record, setWaterRecord] = useState([])
    let water_schedule = []


    const API_TOKEN = '9iHPQV4igm0TwWTaRCFHBewJ9cswoP93ZvLGNdbxbbc'
    const BASE_URL = 'https://trefle.io/api/v1';

    const searchPlants = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const response = await fetch(
                `${BASE_URL}/plants/search?token=${API_TOKEN}&q=${encodeURIComponent(searchQuery)}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch plant data');
            }

            const data = await response.json();
            setSearchResults(data.data);
        } catch (err) {
            console.error('Error fetching plants:', err);
        } finally {
            setLoading(false);
        }
    };

    const selectPlant = (plant) => {
      setSelectedPlant(plant);
      setName(plant.common_name || '');
      setSpecies(plant.scientific_name || '');
      setIconFile(plant.image_url || '');
      setSearchResults([]); // Clear search results
      setSearchQuery(''); // Clear search query
    };

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
    const generateFutureDates = (lastWatered, freqWaterByDay) => {
      let potentialWateringDates = [];
      let count = 0;
      let newDate = new Date();
      let oldDate = parse(lastWatered, 'yyyy-MM-dd', new Date());
      // generate watering dates within 60 days of last watering
      while (count <= 60){
        newDate = add(oldDate, {
          days: freqWaterByDay
        });
        potentialWateringDates.push(format(newDate, 'yyyy-MM-dd'));
        oldDate = newDate;
        count += freqWaterByDay;
      }
      return(potentialWateringDates);
    }

    const handleSubmit = async () => {
        //data and error vars
        const {data, error} = await supabase
          .from('Plants')
          .insert([{owners_username, name, species, is_native, is_indoors,icon_file_path,water_frequency,water_record,water_schedule}]) // inserts new row, vars must be same name as col names
    
        if (error) {
          console.log(error)
          setFormError(error)
        }
        if (data){
          console.log(data)
          setFormError(null)
        }
        console.log('submitted')
        navigation.navigate('Home',{username:owners_username})
    }

    return (
      <ScrollView style={{width:w,height:900}}>
        
        <View style={styles.input}>
            <TextInput label='Name' onChangeText={(text) => {setName(text)}}/>
        </View>

        <View style={styles.input}>
            <TextInput label='Species' onChangeText={(text) => {setSpecies(text)}}/>
        </View>
        
        <SegmentedButtons
          style={{margin:30}}
          value={is_indoors}
          onValueChange={setIsIndoors}
          buttons={[
            {
              value: true,
              label: 'Indoors',
            },
            {
              value: false,
              label: 'Outdoors',
            },
          ]}
        />

        <Chip style={{margin:30}} onPress={()=>{setIsNative(!is_native)}} mode='outlined' selected={is_native}>Native Plant?</Chip>

        <View style={styles.row}>
          <TouchableOpacity onPress={()=>setIconFilePath("https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg")}>
            <Surface style={styles.surface}>
              <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
            </Surface>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setIconFilePath("https://upload.wikimedia.org/wikipedia/commons/f/f1/Green_plants_1.jpg")}>
            <Surface style={styles.surface}>
              <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/f/f1/Green_plants_1.jpg"}}/>
            </Surface>
          </TouchableOpacity>
        </View>

        <View style={styles.freqWaterByDayQue}>
          <Text>Water every </Text>
          <TextInput style={styles.shortInput} onChangeText={(text) => {setWaterFrequency(parseInt(text,10))}}/>
          <Text> days </Text>
        </View>

        <View style={styles.input}>
          <TextInput label='Last watered (yyyy-MM-dd)' onChangeText={(text) => {setWaterRecord([text])}}/>
        </View>
        
        

        <View style={styles.submitBtn}>
            <Button color='white' title="Add me!" onPress={()=>{
              water_schedule = generateFutureDates(water_record[0],water_frequency)
              //console.log(water_record)
              //console.log(generateFutureDates(lastWatered,water_frequency))
              handleSubmit()
            }}/>
        </View>
        
      </ScrollView>
  
    )
}

const styles = StyleSheet.create({
  
  input:{
    height:40,
    width:250,
    margin:30,
    
  },
  shortInput:{
    height:40,
    width:40,
    margin:0,
    
  },
  submitBtn:{
    backgroundColor:'green',
    height:40,
    width:100,
    borderRadius: 10,
    margin:30,
  },
  surface:{
    height:100,
    width:100,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'

  },
  row:{
    width:'100%',
    height:100,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  freqWaterByDayQue:{
    width:'100%',
    height:40,
    flexDirection:'row',
    justifyContent: 'flex-start',
    margin:30
  },
  dayChipRow:{
    flexDirection:'row',
  },
  dayChip:{
    width:100,
    height:30
  },

})