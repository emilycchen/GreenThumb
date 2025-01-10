import {Button, ScrollView,View, Text,StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Articles(){
    const navigation = useNavigation();
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infoBox}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.date}>Date</Text>
          <Text style={styles.summary}>Short summary</Text>
        </View>
      </ScrollView>
      
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
  },
  infoBox:{
    width:'95%',
    borderRadius:20,
    justifyContent:'flex-start',
    alignItems:'flex-start',
    margin:5,
    padding:15,
    backgroundColor:'white',
    margin:20
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    margin:5
  },
  date:{
    fontSize:10,
    margin:5
  },
  summary:{
    fontSize:15,
    margin:5
  }
})