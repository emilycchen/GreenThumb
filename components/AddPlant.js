import {Button, Dimensions,ScrollView,TouchableOpacity,StyleSheet,View,Text,Image, TouchableHighlight} from 'react-native';
import {TextInput,Chip,SegmentedButtons,Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export default function AddPlant({route}){
    const navigation = useNavigation();
    const h = Dimensions.get('screen').height;
    const w = Dimensions.get('screen').width;

    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [indoors, setIndoors] = useState('');
    const [iconFile, setIconFile] = useState('');
    const [native, setNative] = useState(false);
    const [waterWeek, setWaterWeek] = useState(0);

    // stores strings
    const [waterDay, setWaterDay] = useState([]);

    const onClickWaterChip = (day) => {

      if (!waterDay.includes(day)){
        
        setWaterDay([...waterDay, day]);
      } else {
        let temp = [];
        for (let str of waterDay){
          if (str !== day){
            temp.push(str);
          }
        }
        setWaterDay(temp);
      }
      console.log(waterDay);
      
    }

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

    const onSubmit = () => {
      const newPlant = {
        name: name,
        species: species,
        indoors: indoors === 'indoors' ? true : false,
        native: native,
        iconFile: iconFile,
        waterWeek: waterWeek,
        waterDay: waterDay,
        pastWaterings: [],
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

        <View style={styles.waterWeekQue}>
          <Text>Water every </Text>
          <TextInput style={styles.shortInput}/>
          <Text> weeks</Text>
        </View>
        
        <View style={styles.waterDayQue}>
          <Text>Select watering days</Text>
          <View style={styles.dayChipRow}>
            <Chip style={styles.dayChip} onPress={()=>{onClickWaterChip("mon");}} selected={waterDay.includes("mon")}> Mon</Chip>
            <Chip style={styles.dayChip} onPress={()=>{onClickWaterChip("tues");}} selected={waterDay.includes("tues")}> Tues</Chip>
            <Chip style={styles.dayChip} onPress={()=>{onClickWaterChip("wed");}} selected={waterDay.includes("wed")}> Wed</Chip>
          </View>
          <View style={styles.dayChipRow}>
            <Chip style={styles.dayChip} onPress={()=>{onClickWaterChip("thurs");}} selected={waterDay.includes("thurs")}> Thurs</Chip>
            <Chip style={styles.dayChip} onPress={()=>{onClickWaterChip("fri");}} selected={waterDay.includes("fri")}> Fri</Chip>
            <Chip style={styles.dayChip} onPress={()=>{onClickWaterChip("sat");}} selected={waterDay.includes("sat")}> Sat</Chip>
            <Chip style={styles.dayChip} onPress={()=>{onClickWaterChip("sun");}} selected={waterDay.includes("sun")}> Sun</Chip>
          </View>
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
  waterWeekQue:{
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
  waterDayQue:{
    flexDirection:'column',
    margin:30
  }

})