
import { StyleSheet, Dimensions, SafeAreaView, View, TouchableOpacity} from 'react-native';
import { IconButton,Surface,Button } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import { Image } from 'expo-image';

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
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={plant!==null ? plant.icon_file_path : ''}/>
                </View>
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
      imageContainer:{
        height:75,
        width:75,
        alignSelf:'center',
      },
      image:{
        width: 75,height: 75,contentFit: 'contain'
      }
});