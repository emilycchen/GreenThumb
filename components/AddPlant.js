import {Button, StyleSheet,View,Text,TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function AddPlant(){
    const navigation = useNavigation();
    return (
      <View>
        {/* <View style={styles.titlebox}/> */}
        {/* <Button title="Back To Home" onPress = {() => navigation.navigate('Home')}/> */}
        <Text>Name</Text>
        <View style={styles.input}>
          <TextInput />
        </View>
        <Text>Species</Text>
        <View style={styles.input}>
          <TextInput />
        </View>
        <Text>Growing indoors or outdoors?</Text>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <View style={{backgroundColor:'green',height:30,width:100}}>
            <Button color='white' title="indoors"/>
          </View>
          <View style={{backgroundColor:'green',height:30,width:100}}>
            <Button color='white' title="outdoors"/>
          </View>
        </View>

        
      </View>
  
    )
}

const styles = StyleSheet.create({
  titlebox:{
    backgroundColor: 'gold',
    width:'100%',
    height:100,
    borderRadius: 50
  },
  input:{
    backgroundColor: 'lightgray',
    borderRadius: 10,
    height:40,
    width:300,
    flexDirection: 'column',
    justifyContent:'center'
  }
})