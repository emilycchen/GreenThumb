import {View, Text, TouchableOpacity,StyleSheet,Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Surface} from 'react-native-paper';
import { useState } from 'react';


export default function Badges(){
    const navigation = useNavigation();
    const [badgeList, setBadgeList] = useState([
      
    ]);
    const [selectedBadgeName,setSelectedBadgeName] = useState('');
    const [selectedBadgeInfo,setSelectedBadgeInfo] = useState('')
    
    const handleClick = (e) => {
      console.log([e.target.id]);
    }
    
    return (
      <View style={styles.container}>
        <View style={styles.gridRow}>
        <TouchableOpacity id='trophy' onPress={handleClick}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/4/48/Awards_of_Garik_Urumyan_2015.jpg"}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:""}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:""}}/>
          </Surface>
        </TouchableOpacity>
      </View>

      <View style={styles.gridRow}>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:""}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:""}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:""}}/>
          </Surface>
        </TouchableOpacity>
      </View>

      <View style={styles.gridRow}>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:""}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:""}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:""}}/>
          </Surface>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text>Badge description</Text>
      </View>

    </View>
  
    )
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:'100%',
    alignItems:'center',
  },
  surface:{
    height:100,
    width:'100%',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    backgroundColor:'white',

  },
  gridRow:{
    flexDirection:'row',
    justifyContent:'center',
    left:-10,
    bottom:-10
  },
  infoBox:{
    height:190,
    width:'90%',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    padding:10,
    backgroundColor:'white',
    margin:20
  }
})