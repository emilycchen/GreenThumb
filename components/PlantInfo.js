import {Button, Image, Text,View,StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';

export default function PlantInfo(){
    const navigation = useNavigation();
    const h = Dimensions.get('screen').height;
    const w = Dimensions.get('screen').width;
    console.log(Dimensions.get('screen').height);
    
    return (

      <ScrollView contentContainerStyle={{ width: w,height: 900,alignItems:'center'}}>
        <Image source={{width:'100%',height:200,uri:"https://upload.wikimedia.org/wikipedia/commons/b/bb/Spring_April_2010-3.jpg"}}/> 
        <View style={styles.titleBox}>
          <Text style={{fontSize:30}}>Name</Text>
          <Text>Species</Text>
        </View>

        <View style={styles.box}>
          <Image source={{width:50,height:50,uri:"https://upload.wikimedia.org/wikipedia/commons/6/61/Pr%C3%A9cipitation_5_mm_par_heure_pour_mod%C3%A8le_climat.png"}}/>
          <View style={styles.textBox}>
            <Text>Last watered</Text>
            <Text>Next watering</Text>
          </View>
        </View>

        <View style={{flexDirection:'row',alignSelf:'flex-start',alignItems:'center'}}>
          <View style={styles.imageBox}>
            <Image source={{width:125,height:125,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
          </View>
          <View>
            <Text>Location</Text>
            <Text>Native Species</Text>
            <Text>Status</Text>
            <Text>Date Registered</Text>
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