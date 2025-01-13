import {Button, ScrollView, Text, StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import { Surface } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function PlantList(){
    const navigation = useNavigation();
    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
                <Surface style={styles.surface}>        
                    <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>        
                    <View style={styles.description}>    
                        <Text>Name</Text>
                        <Text>Species</Text>
                    </View>
                </Surface>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
                <Surface style={styles.surface}>        
                    <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>        
                    <View style={styles.description}>    
                        <Text>Name</Text>
                        <Text>Species</Text>
                    </View>
                </Surface>
            </TouchableOpacity>

        </ScrollView>
      </View>
  
    )
}

const styles = StyleSheet.create({
    container:{
        height:900,
        width:'100%',
        alignItems:'center'
    },
    surface:{
        height:150,
        width:300,
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
        margin:10
    },
})