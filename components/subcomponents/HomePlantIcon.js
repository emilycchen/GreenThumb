
import { Image, StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity} from 'react-native';
import { IconButton,Surface,Button } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function HomePlantIcon({id,plants}){
    const navigation = useNavigation();
    const plant = id < plants.length? plants[id]:null;
    const handlePress = ()=>{
        if (plant !== null){
            navigation.navigate("Plant Info",{plant:plant})
        }
    };
    
    return(
        <TouchableOpacity onPress={handlePress}>
            <Surface style={styles.surface}>
                <Image source={{width:75, height:75, uri: plant!==null? plant.iconFile:""}}/>
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