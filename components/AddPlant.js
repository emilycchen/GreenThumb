import {Button, StyleSheet,View,Text,TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function AddPlant(){
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.question}>
          <Text>Name</Text>
          <View style={styles.input}>
            <TextInput />
          </View>
        </View>

        <View style={styles.question}>
          <Text>Species</Text>
          <View style={styles.input}>
            <TextInput />
          </View>
        </View>

        <View style={styles.question}>
          <Text>Indoors or outdoors?</Text>
          <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
            <View style={styles.multipleSelect}>
              <Button color='white' title="indoors"/>
            </View>
            <View style={styles.multipleSelect}>
              <Button color='white' title="outdoors"/>
            </View>
          </View>
        </View>

        <View style={styles.submitBtn}>
            <Button color='white' title="Add me!"/>
        </View>

        
      </View>
  
    )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    padding: 30,
    backgroundColor: 'lightgreen'
  },
  question:{
    padding:15
  },
  input:{
    backgroundColor: 'lightgray',
    borderRadius: 10,
    height:40,
    width:300,
    flexDirection: 'column',
    justifyContent:'center',
    padding:10
  },
  multipleSelect:{
    backgroundColor:'orange',
    height:40,
    width:100,
    borderRadius: 10
  },
  submitBtn:{
    backgroundColor:'green',
    height:40,
    width:100,
    borderRadius: 10,
    margin:30,
  },


})