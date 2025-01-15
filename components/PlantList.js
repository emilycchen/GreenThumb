import {Button, ScrollView, Text, StyleSheet,View,Image,TouchableOpacity, Dimensions} from 'react-native';
import { Surface } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import PlantListBlock from './subcomponents/PlantListBlock';

export default function PlantList({route}){
    const navigation = useNavigation();
    const {plants} = route.params;
    const h = Dimensions.get('screen').height;
    if (plants.length > 5){
      h += (plants.length-5)*110
    }

    return (
      <View>
        <ScrollView contentContainerStyle={{height: h,width:'100%', alignItems:'center'}}>
            {
                Array.from({ length: plants.length }).map((_, i) => 
                    <PlantListBlock key={i} value={i + 1} plant={plants[i]}/>
                  )
            }
        </ScrollView>
      </View>
  
    )
}

const styles = StyleSheet.create({

})