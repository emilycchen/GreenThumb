import {Button, TextInput,Dimensions,ScrollView,TouchableOpacity,StyleSheet,View,Text, TouchableHighlight, KeyboardAvoidingView} from 'react-native';
import {Chip,SegmentedButtons,Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import { formatDistance, subDays,add,parse,format } from "date-fns";
import supabase from '../supabaseClient';
import { Image } from 'expo-image';
import icon1 from '../assets/14.png'

export default function AddPlant({route}){
    const navigation = useNavigation();
    const h = Dimensions.get('screen').height;
    const w = Dimensions.get('screen').width;

    // const iconFilePathArr = [[
    //   require('../assets/14.png'),
    //   require('../assets/15.png'),
    //   require('../assets/16.png')
    // ],
    // [
    //   require('../assets/17.png'),
    //   require('../assets/18.png'),
    //   require('../assets/19.png')
    // ],
    // [
    //   require('../assets/20.png'),
    //   require('../assets/21.png'),
    //   require('../assets/22.png')
    // ]
    // ]

    const iconFilePathArr = [[
      '/Users/lhui/Workspace/GreenThumb/assets/14.png',
      '/Users/lhui/Workspace/GreenThumb/assets/15.png',
      '/Users/lhui/Workspace/GreenThumb/assets/16.png'
    ],
    [
      '/Users/lhui/Workspace/GreenThumb/assets/17.png',
      '/Users/lhui/Workspace/GreenThumb/assets/18.png',
      '/Users/lhui/Workspace/GreenThumb/assets/19.png'
    ],
    [
      '/Users/lhui/Workspace/GreenThumb/assets/20.png',
      '/Users/lhui/Workspace/GreenThumb/assets/21.png',
      '/Users/lhui/Workspace/GreenThumb/assets/22.png'
    ]
    ]

    const test = ['../assets/14.png',
      '../assets/15.png',
      '../assets/16.png']

    const {owners_username} = route.params 
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [is_native, setIsNative] = useState(false)
    const [is_indoors, setIsIndoors] = useState(false)
    const [icon_file_path, setIconFilePath] = useState('')
    const [water_frequency, setWaterFrequency] = useState('')
    const [water_record, setWaterRecord] = useState([])
    const [notes, setNotes] = useState('')

    let water_schedule = []

    // plant API
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
          .insert([{owners_username, name, species, is_native, is_indoors,icon_file_path,water_frequency,water_record,water_schedule,notes}]) // inserts new row, vars must be same name as col names
    
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
    //console.log(searchQuery)
    //console.log(searchResults)

    return (
      <KeyboardAvoidingView style={{height:h,width:w,backgroundColor:'#f8f4ed',alignItems:'center'}} behavior='height'>
        <ScrollView contentContainerStyle={{width:w,height:1200,alignItems:'center'}}>
        <View >
          <TextInput 
            label="Search Plants"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={searchPlants}
          />
        </View>
        
        {searchResults.map((plant) => (
        
          <TouchableOpacity key={plant.id} onPress={() => selectPlant(plant)}>
            <Text>{plant.common_name || plant.scientific_name}</Text>
            {plant.image_url && <Image source={{ uri: plant.image_url }} style={{ width: 50, height: 50 }} />}
          </TouchableOpacity>
        ))}

        <View style={styles.textInputBox}>
            <TextInput style={styles.textInput} placeholder='Name' onChangeText={(text) => setName(text)}/>
        </View>
        
        <View style={styles.textInputBox}>
            <TextInput style={styles.textInput} placeholder='Species' onChangeText={(text) => {setSpecies(text)}}/>
        </View>

        

        <View style={styles.textInputBox}>
            <TextInput style={styles.textInput} placeholder='Last watered (yyyy-MM-dd)' onChangeText={(text) => {setWaterRecord([text])}}/>
        </View>

        <View style={styles.freqWaterByDayQue}>
          <Text>Water every </Text>
          <View style={styles.shortInput}>
            <TextInput onChangeText={(text) => {setWaterFrequency(parseInt(text,10))}}/>
          </View>
          <Text> days </Text>
        </View>

        <View style={styles.textInputBox}>
            <TextInput style={styles.textInput} placeholder='Notes' onChangeText={(text) => {setNotes(text)}}/>
        </View>
        
        <SegmentedButtons
          style={{margin:20}}
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

        <Chip style={{margin:30}} onPress={()=>{setIsNative(!is_native)}} mode='outlined' selected={is_native} selectedColor='#544e3d'>Native Plant?</Chip>
        <Text>Pick an icon</Text>
        <View style={styles.row}>
        {Array.from({ length: iconFilePathArr[0].length }).map((_, i) => (
            <TouchableOpacity onPress={()=>setIconFilePath(iconFilePathArr[0][i])}>
              <Surface style={styles.surface}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={iconFilePathArr[0][i]}/>
                </View>
              </Surface>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {Array.from({ length: iconFilePathArr[1].length }).map((_, i) => (
            <TouchableOpacity onPress={()=>setIconFilePath(iconFilePathArr[1][i])}>
              <Surface style={styles.surface}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={iconFilePathArr[1][i]}/>
                </View>
              </Surface>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {Array.from({ length: iconFilePathArr[2].length }).map((_, i) => (
            <TouchableOpacity onPress={()=>setIconFilePath(iconFilePathArr[2][i])}>
              <Surface style={styles.surface}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={iconFilePathArr[2][i]}/>
                </View>
              </Surface>
            </TouchableOpacity>
          ))}
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
      </KeyboardAvoidingView>
  
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
    backgroundColor:'#e0dbcc',
    justifyContent:'center',
    borderRadius: 10,
    padding:10
    
  },
  submitBtn:{
    backgroundColor:'#457a37',
    height:40,
    width:100,
    borderRadius: 20,
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
    justifyContent: 'space-around',
    margin:5
  },
  freqWaterByDayQue:{
    width:'100%',
    height:40,
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems:'center',
    margin:30,
    left:20

  },
  dayChipRow:{
    flexDirection:'row',
  },
  dayChip:{
    width:100,
    height:30
  },
  textInputBox:{
    height:50,
    width:'90%',
    backgroundColor:'#e0dbcc',
    justifyContent:'center',
    borderRadius: 25,
    margin:10
  },
  textInput:{
      height:40,
      width:'80%',
      backgroundColor:'#e0dbcc',
      left:15
  },
  longTextInput:{
    height:80,
    width:'90%',
    margin:10,
    backgroundColor:'green',
    flexDirection:'column',
    justifyContent:'flex-start',
    
  },
  longTextInputBox:{
    height:100,
    width:'90%',
    justifyContent:'flex-start',
    alignItems:'center',
    borderRadius: 25,
    margin:10,
    backgroundColor:'#e0dbcc',
  },
  imageContainer:{
    height:75,
    width:75,
    alignSelf:'center',
    margin:40
  },
  image:{
    width: 75,height: 75,contentFit: 'contain'
  }

})