import {View, Text, TouchableOpacity,StyleSheet,Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Surface} from 'react-native-paper';
import { useState } from 'react';

export default function BadgeBlock({}){
    return(
        <TouchableOpacity id='trophy' onPress={handleClick}>
            <Surface style={styles.surface}>
                <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/4/48/Awards_of_Garik_Urumyan_2015.jpg"}}/>
            </Surface>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

})