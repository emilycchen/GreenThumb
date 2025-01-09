import {Button, ScrollView,TouchableOpacity,StyleSheet,View,Text,Image, TouchableHighlight} from 'react-native';
import {TextInput,Chip,SegmentedButtons,Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export default function AddPlant(){
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [indoors, setIndoors] = useState('');
    const [iconFile, setIconFile] = useState('');
    const [native, setNative] = useState(false);
    const [waterWeek, setWaterWeek] = useState(0);
    const [waterDay, setWaterDay] = useState([]);

    

    return (
      <View >
      <ScrollView >
        
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
            <Chip style={styles.dayChip} onPress={()=>{setWaterDay((waterDay)=>[...waterDay, 'mon']);}} selected={waterDay.includes('mon')}> Mon</Chip>
            <Chip style={styles.dayChip} onPress={()=>{setWaterDay((waterDay)=>[...waterDay, 'tues']);}} selected={waterDay.includes('tues')}> Tues</Chip>
            <Chip style={styles.dayChip}> Wed</Chip>
          </View>
          <View style={styles.dayChipRow}>
            <Chip style={styles.dayChip}> Thurs</Chip>
            <Chip style={styles.dayChip}> Fri</Chip>
            <Chip style={styles.dayChip}> Sat</Chip>
            <Chip style={styles.dayChip}> Sun</Chip>
          </View>
        </View>

        <View style={styles.submitBtn}>2
            <Button color='white' title="Add me!" onPress={()=>console.log(name+species+indoors+native+iconFile+waterWeek+waterDay)}/>
        </View>
        
      </ScrollView>
      </View>
  
    )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    padding: 30,
    backgroundColor: 'lightgreen'
  },
  input:{
    height:40,
    width:300,
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