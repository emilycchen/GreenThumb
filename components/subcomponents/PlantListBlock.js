import {View, Text, TouchableOpacity,StyleSheet,Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Surface} from 'react-native-paper';
import { useState } from 'react';

export default function PlantListBlock({plant}){
    const navigation = useNavigation();
    return(
       <TouchableOpacity onPress={()=>navigation.navigate("Plant Info",{plant_id:plant.plant_id})}>
            <Surface style={styles.surface}>        
                <Image source={{width:75,height:75,uri:plant.icon_file_path}}/>        
                <View style={styles.description}>    
                    <Text style={{fontSize: 20}}>{plant.name}</Text>
                    <Text>{plant.species}</Text>
                </View>
            </Surface>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    surface:{
        width:300,
        height:100,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:10,
        margin:10
    },
    description:{
        width: 190,
        height:100,
        margin:10,
        padding:30
    },
})