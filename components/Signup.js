import { StyleSheet, Text, TextInput, ScrollView,Image,KeyboardAvoidingView, Dimensions, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [formError, setFormError] = useState(null);
  const navigation = useNavigation();

  const h = Dimensions.get('screen').height;
  const w = Dimensions.get('screen').width;

  const handleSubmit = async () => {
    console.log('submitting')
    // form validation
    if (!username || !password || !location){
      setFormError("oops you didnt fill everything in")
      return
    }
    //data and error vars
    const {data, error} = await supabase
      .from('Users')
      .insert([{username, password, location}]) // inserts new row, vars must be same name as col names

    if (error) {
      console.log(error)
      setFormError(error)
    }
    if (data){
      console.log(data)
      setFormError(null)
    }
    console.log('submitted')
    navigation.navigate('Login')
  }

  return (
    <KeyboardAvoidingView style={{height:h,width:w,backgroundColor:'#f8f4ed',alignItems:'center'}} behavior='position'>
                <ScrollView contentContainerStyle={{height:h,alignItems:'center'}}>
                    <View style={styles.imageContainer}>
                        <Image style={{width: 250,height: 250,resizeMode: 'contain'}} source={require('../assets/logo.png')}/>
                    </View>
                    <View style={styles.textInputBox}>
                            <TextInput style={styles.textInput} placeholder='Username' onChangeText={(text) => setUsername(text)}/>
                    </View>
                    <View style={styles.textInputBox}>
                            <TextInput style={styles.textInput} placeholder='Password' onChangeText={(text) => setPassword(text)}/>
                    </View>
                    <View style={styles.textInputBox}>
                            <TextInput style={styles.textInput} placeholder='Location (U.S. State)' onChangeText={(text) => setLocation(text)}/>
                    </View>
                    
                    <Button color='#8f7c54' title="Sign Up" onPress={handleSubmit}/>
                    <Button color='#8f7c54' title="Already have an account? Log In" onPress={() => {navigation.navigate('Login')}}/>
                </ScrollView>
    </KeyboardAvoidingView>
    
  );
}


const styles = StyleSheet.create({
  textInputBox:{
      height:50,
      width:'90%',
      backgroundColor:'#e0dbcc',
      justifyContent:'center',
      borderRadius: 25,
      margin:5,
  },
  textInput:{
      height:40,
      width:'80%',
      backgroundColor:'#e0dbcc',
      left:15
  },
  imageContainer:{
      height:250,
      width:250,
      alignSelf:'center',
      margin:30
  },
})