import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { TextInput} from 'react-native-paper';
import supabase from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("")
    const navigation = useNavigation()

    // authentication
    const handleLogin = async () => {
        const {data, error} = await supabase
            .from('Users')
            .select()
            .eq('username', username) 
            .single()
        
        if (error) {
            console.log(error)
        }
        if (data){
            if (data.password === password){
                navigation.navigate('Home', {username: data.username})
            } else {
                setResult('Wrong password')
            }
            
        }
    }

    return(
        <View>
            <View style={{height:200,width:200}}>
                <Image style={{width: 200,height: 200,resizeMode: 'contain'}} source={require('../assets/1logo.png')}/>
            </View>
            <Text>Username</Text>
            <TextInput onChangeText={(text) => setUsername(text)}/>
            <Text>Password</Text>
            <TextInput onChangeText={(text) => setPassword(text)}/>
            <Button title="Log In" onPress={handleLogin}/>
            <Button title="Don't have an account? Sign Up" onPress={() => {navigation.navigate('Signup')}}/>
            <Text>{result}</Text>
        </View>
    )

}