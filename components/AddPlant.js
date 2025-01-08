import {Button, Pressable,TouchableOpacity,StyleSheet,View,Text,Image, TouchableHighlight} from 'react-native';
import {TextInput,RadioButton,SegmentedButtons,Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export default function AddPlant(){
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [indoors, setIndoors] = useState('');
    const [iconFile, setIconFile] = useState('');

    return (
      <View style={styles.container}>
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
      
        <View style={styles.submitBtn}>
            <Button color='white' title="Add me!" onPress={()=>console.log(name+species+indoors+iconFile)}/>
        </View>

        
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
  }


})