import {Button, ScrollView,View, Text,StyleSheet} from 'react-native';

export default function ArticleBlock({article}){
    return (
        <View style={styles.infoBox}>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.date}>{article.date}</Text>
            <Text style={styles.summary}>{article.summary}</Text>
        </View>
      
    )
}

const styles = StyleSheet.create({
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
