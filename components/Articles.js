// import {Button, ScrollView,View, Text,StyleSheet} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import ArticleBlock from './subcomponents/ArticleBlock';

// export default function Articles(){
//     const navigation = useNavigation();

//     // data input
//     const articles = [
//       {
//         title:'How to plant seeds',
//         summary: 'This article tells you how to plant seeds. This article tells you how to plant seeds. This article tells you how to plant seeds.'
//       },
//       {
//         title:'How to trim bushes',
//         summary: 'This article tells you how to trim bushes.This article tells you how to trim bushes.This article tells you how to trim bushes.'
//       },
//       {
//         title:'How to plant seeds',
//         summary: 'This article tells you how to plant seeds. This article tells you how to plant seeds. This article tells you how to plant seeds.'
//       },
//       {
//         title:'How to plant seeds',
//         summary: 'This article tells you how to plant seeds. This article tells you how to plant seeds. This article tells you how to plant seeds.'
//       },
//       {
//         title:'How to plant seeds',
//         summary: 'This article tells you how to plant seeds. This article tells you how to plant seeds. This article tells you how to plant seeds.'
//       },

//     ];
//     return (
//       <ScrollView contentContainerStyle={styles.container}>
//         <ArticleBlock article={articles[0]}/>
//         <ArticleBlock article={articles[1]}/>
//         <ArticleBlock article={articles[2]}/>
//         <ArticleBlock article={articles[3]}/>
//         <ArticleBlock article={articles[4]}/>
//       </ScrollView>
      
      
//     )
// }

// const styles = StyleSheet.create({
//   container:{
//     width:'100%',
//     height:950,
//     flexDirection:'column',
//     justifyContent:'flex-start',
//     alignItems:'center',
//     padding: 30,
//   }
// })
import React from 'react';
import articlesData from './articles.json';
import {Button, ScrollView,View, Text,StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ArticlesList = () => {
  return (
    <View>
      {articlesData.map((article, index) => (
        <View key={index} style={styles.infoBox}>
          <Text style={styles.title}>{article?.title}</Text>
          <Text style={styles.sentence}>{article?.sentence}</Text>
        </View>      
      ))}
    </View>
  );
};

export default ArticlesList

const styles = StyleSheet.create({
  infoBox: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 14,
  }
});
