import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput} from 'react-native-paper';
import supabase from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [formError, setFormError] = useState(null);
  const navigation = useNavigation();

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
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput onChangeText={(text) => setUsername(text)}/>
      <Text>Password</Text>
      <TextInput onChangeText={(text) => setPassword(text)}/>
      <Text>Location</Text>
      <TextInput onChangeText={(text) => setLocation(text)}/>
      <Button title="Sign Up" onPress={handleSubmit}/>
      <Button title='Already have an account? Log In' onPress={() => {navigation.navigate('Login')}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

