import {Button, Dimensions,ScrollView,TouchableOpacity,StyleSheet,View,Text,Image, TouchableHighlight} from 'react-native';
import {TextInput,Chip,SegmentedButtons,Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import { formatDistance, subDays,add,parse,format } from "date-fns";


export default function AddPlant({route}){
    const navigation = useNavigation();
    const h = Dimensions.get('screen').height;
    const w = Dimensions.get('screen').width;

    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [indoors, setIndoors] = useState('');
    const [iconFile, setIconFile] = useState('');
    const [native, setNative] = useState(false);
    const [freqWaterByDay, setFreqWaterByDay] = useState(0);
    const [lastWatered, setLastWatered] = useState("");



    // const onClickWaterChip = (day) => {

    //   if (!waterDay.includes(day)){
        
    //     setWaterDay([...waterDay, day]);
    //   } else {
    //     let temp = [];
    //     for (let str of waterDay){
    //       if (str !== day){
    //         temp.push(str);
    //       }
    //     }
    //     setWaterDay(temp);
    //   }
    //   console.log(waterDay);
      
    // }

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
      const potentialWateringDates = [];
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
    //console.log('addPlant generate future dates' + generateFutureDates('2025-01-03',7));
    //HOW TO TOGGLE BETWEEN STRING AND DATE
    // console.log('testing')
    // var dateObject = parse('2025-01-13', 'yyyy-MM-dd', new Date())
    // console.log(dateObject);
    // console.log(dateObject.getDate());
    // console.log(dateObject.getMonth());
    // console.log(dateObject.getFullYear());
    // console.log(dateObject.toDateString());
    // var dateString = format(dateObject, 'yyyy-MM-dd');
    // console.log(dateString)



    

    const onSubmit = () => {
      console.log('submitting')
      console.log(lastWatered + ' ' + freqWaterByDay)
      const newPlant = {
        name: name,
        species: species,
        indoors: indoors === 'indoors' ? true : false,
        native: native,
        iconFile: iconFile,
        freqWaterByDay: freqWaterByDay,
        pastWaterings: [lastWatered],
        potentialWaterings: generateFutureDates(lastWatered,freqWaterByDay),
        dateRegistered: getFormattedDate()
      }
      console.log(newPlant);
      navigation.navigate('Home',{newPlant:newPlant});
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
          value={indoors}
          onValueChange={setIndoors}
          buttons={[
            {
              value: 'indoors',
              label: 'Indoors',
            },
            {
              value: 'outdoors',
              label: 'Outdoors',
            },
          ]}
        />

        <Chip style={{margin:30}} onPress={()=>{setNative(!native)}} mode='outlined' selected={native}>Native Plant?</Chip>

        <View style={styles.row}>
          <TouchableOpacity onPress={()=>setIconFile("https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg")}>
            <Surface style={styles.surface}>
              <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
            </Surface>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setIconFile("https://upload.wikimedia.org/wikipedia/commons/f/f1/Green_plants_1.jpg")}>
            <Surface style={styles.surface}>
              <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/f/f1/Green_plants_1.jpg"}}/>
            </Surface>
          </TouchableOpacity>
        </View>

        <View style={styles.freqWaterByDayQue}>
          <Text>Water every </Text>
          <TextInput style={styles.shortInput} onChangeText={(text) => {setFreqWaterByDay(parseInt(text,10))}}/>
          <Text> days </Text>
        </View>

        <View style={styles.input}>
          <TextInput label='Last watered (yyyy-MM-dd)' onChangeText={(text) => {setLastWatered(text)}}/>
        </View>
        
        

        <View style={styles.submitBtn}>
            <Button color='white' title="Add me!" onPress={onSubmit}/>
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