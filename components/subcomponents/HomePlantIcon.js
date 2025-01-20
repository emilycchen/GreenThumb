
import { Image, StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity} from 'react-native';
import { IconButton,Surface,Button } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function HomePlantIcon({display_id,plants}){
    const navigation = useNavigation();
    const plant = display_id < plants.length ? plants[display_id]:null;
    const handlePress = ()=>{
        if (plant !== null){
            navigation.navigate("Plant Info",{plant_id: plant.plant_id})
        }
    };
    
    return(
        <TouchableOpacity onPress={handlePress}>
            <Surface style={styles.surface}>
                <Image source={{width:75, height:75, uri: plant!==null? plant.icon_file_path:"https://upload.wikimedia.org/wikipedia/commons/1/18/Color-white.JPG"}}/>
            </Surface>
        </TouchableOpacity>
    );
    
}

const styles = StyleSheet.create({
    surface:{
        height:100,
        width:'100%',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        margin:10
    
      },
});