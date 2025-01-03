import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function ThirdPage(){
    const navigation = useNavigation();
    return (
      <Button title="Back To Home" onPress = {() => navigation.navigate('Home')}/>
  
    )
}