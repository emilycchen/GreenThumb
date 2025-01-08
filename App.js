
import { Image, StyleSheet, SafeAreaView, View, TouchableOpacity} from 'react-native';
import { IconButton,Surface,Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Articles from './components/Articles.js'
import AddPlant from './components/AddPlant.js'
import Badges from './components/Badges.js'
import PlantInfo from './components/PlantInfo.js'
import Calendar from './components/Calendar.js';
import PlantList from './components/PlantList.js';

// Home page
function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.gridRow}>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
          </Surface>
        </TouchableOpacity>
      </View>

      <View style={styles.gridRow}>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
          </Surface>
        </TouchableOpacity>
      </View>

      <View style={styles.gridRow}>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Plant Info")}>
          <Surface style={styles.surface}>
            <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
          </Surface>
        </TouchableOpacity>
      </View>

      <Button mode="outlined" onPress = {() => navigation.navigate('Plant Info')}>Plant Info</Button>
      
      <View style={styles.bannerBottom}>
        <TouchableOpacity onPress = {() => navigation.navigate('Plant List')}>
          <IconButton mode='contained' icon='barley' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('Add Plant')}>
          <IconButton mode='contained' icon='plus' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('Articles')}>
          <IconButton mode='contained' icon='newspaper-variant-multiple' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('Calendar')}>
          <IconButton mode='contained' icon='calendar' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => navigation.navigate('Badges')}>
          <IconButton mode='contained' icon='trophy' containerColor='green' iconColor='lightgreen'size={35}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Add Plant" component={AddPlant}/>
      <Stack.Screen name="Articles" component={Articles}/>
      <Stack.Screen name="Badges" component={Badges}/>
      <Stack.Screen name="Plant Info" component={PlantInfo}/>
      <Stack.Screen name="Calendar" component={Calendar}/>
      <Stack.Screen name="Plant List" component={PlantList}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e8e6',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  gridRow:{
    flexDirection:'row',
    justifyContent:'center'
  },
  bannerBottom:{
    width:'100%',
    height: 150,
    bottom:-30,
    //move down a bit
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  bottomBtn:{
    width:50,
    height:50,
    backgroundColor:'#97f043',
    borderRadius:25,
    margin:10
  },
  surface:{
    height:100,
    width:100,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    margin:10

  },
});
