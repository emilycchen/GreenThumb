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


import React from 'react';
import articlesData from './articles.json';
import {Linking, ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

const ArticlesList = () => {
  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={styles.infoBox}>
          <Text style={styles.pageTitle}>{"Articles"}</Text>
        </View> 
        {articlesData.map((article, index) => (
          <TouchableOpacity 
            key={index}
            onPress={() => Linking.openURL(article.url)}
          >
            <View style={styles.articleBlock}>
              <Text style={styles.title}>{article?.title || "No Title"}</Text>
              <Text style={styles.date}>{article?.date || "No Date"}</Text>
              <Text style={styles.sentence}>{article?.sentence || "No Description"}</Text>
            </View>      
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ArticlesList

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f8f4ed',
    padding: 10,
    paddingTop: 40
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5e775f',
    paddingBottom: 10,
  },
  infoBox: {
    padding: 5,
  },
  articleBlock: {
    backgroundColor: '#ffffff',
    padding: 13,
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5e775f',
  },
  date: {
    fontSize: 10,
    color: '#c2c1be',
    paddingTop: 2,
    paddingBottom: 2
  },
  sentence: {
    fontSize: 10,
    color: '#5e775f',
  },
});