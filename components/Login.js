import { StyleSheet,KeyboardAvoidingView, Text,TextInput, View, Button, Dimensions, Image,ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
//import { TextInput} from 'react-native-paper';
import supabase from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("")
    const navigation = useNavigation()

    const h = Dimensions.get('screen').height;
    const w = Dimensions.get('screen').width;

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
        <KeyboardAvoidingView style={{height:h,width:w,backgroundColor:'#f8f4ed',alignItems:'center'}} behavior='position'>
            <ScrollView contentContainerStyle={{alignItems:'center'}}>
                <View style={styles.imageContainer}>
                    <Image style={{width: 250,height: 250,resizeMode: 'contain'}} source={require('../assets/logo.png')}/>
                </View>
                <View style={styles.textInputBox}>
                        <TextInput style={styles.textInput} placeholder='Username' onChangeText={(text) => setUsername(text)}/>
                    </View>
                    <View style={styles.textInputBox}>
                        <TextInput style={styles.textInput} placeholder='Password' onChangeText={(text) => setPassword(text)}/>
                    </View>
                
                <Button color='#8f7c54' title="Log In" onPress={handleLogin}/>
                <Button color='#8f7c54' title="Don't have an account? Sign Up" onPress={() => {navigation.navigate('Signup')}}/>
                <Text>{result}</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    textInputBox:{
        height:50,
        width:'90%',
        backgroundColor:'#e0dbcc',
        justifyContent:'center',
        borderRadius: 25,
        margin:10
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
        margin:40
    },
})