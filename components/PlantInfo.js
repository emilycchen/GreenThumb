import {Button, Image, Text,View,StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';

export default function PlantInfo({route}){
  const h = Dimensions.get('screen').height;
  const w = Dimensions.get('screen').width;
  const {plant} = route.params;
  const garden = "https://upload.wikimedia.org/wikipedia/commons/e/e0/Back_garden_-_Flickr_-_peganum_%281%29.jpg";
  const indoors = "https://upload.wikimedia.org/wikipedia/commons/d/d5/Potted_plants_featuring_tropicals.jpg";

    return (

      <ScrollView contentContainerStyle={{ width: w,height: 900,alignItems:'center'}}>
        <Image source={{width:'100%',height:200,uri:plant.indoors? indoors:garden}}/> 
        <View style={styles.titleBox}>
          <Text style={{fontSize:30}}>{plant.name}</Text>
          <Text>{plant.species}</Text>
        </View>

        <View style={styles.box}>
          <Image source={{width:70,height:70,uri:"https://upload.wikimedia.org/wikipedia/commons/f/f8/2006-02-13_Drop-impact.jpg"}}/>
          <View style={styles.textBox}>
            <Text>Last watered:</Text>
            <Text>{plant.pastWaterings[plant.pastWaterings.length-1]}</Text>
            <Text>Next watering:</Text>
            <Text>Nothing here yet</Text>
          </View>
        </View>

        <View style={{flexDirection:'row',alignSelf:'flex-start',alignItems:'center'}}>
          <View style={styles.imageBox}>
            <Image source={{width:125,height:125,uri:plant.iconFile}}/>
          </View>
          <View>
            <Text>Indoors?</Text>
            <Text>{plant.indoors.toString()}</Text>
            <Text>Native Species?</Text>
            <Text>{plant.native.toString()}</Text>
            <Text>Status:</Text>
            <Text>Nothing here yet</Text>
            <Text>Date Registered:</Text>
            <Text>{plant.dateRegistered}</Text>
          </View>
        </View>

        <View>
          <Text>More Info</Text>
          <View style={styles.box}>
            <View style={{width:'90%',height:200}}/>
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