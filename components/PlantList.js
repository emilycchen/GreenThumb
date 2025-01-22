// export default function PlantList({route}){
//     const navigation = useNavigation();
//     const {plants} = route.params;
//     const h = Dimensions.get('screen').height;
//     if (plants.length > 5){
//       h += (plants.length-5)*110
//     }

//     return (
//       <View>
//         <ScrollView contentContainerStyle={{height: h,width:'100%', alignItems:'center'}}>
//             {
              
//                 Array.from({ length: plants.length }).map((_, i) => 
//                     <PlantListBlock key={i} value={i + 1} plant={plants[i]}/>
//                   )
//             }
//         </ScrollView>
//       </View>
  
//     )
// }
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlantListBlock from './subcomponents/PlantListBlock';

const PlantList = ({ route }) => {
  const { plants } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.background}>
      <ScrollView>
        <View style={styles.infoBox}>
          <Text style={styles.pageTitle}>My Plants</Text>
        </View>
        {Array.from({ length: plants.length }).map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate('Plant Info', { plant_id: plants[i].plant_id })}
          >
            <View style={styles.plantBlock}>
              <Image
                source={{ uri: plants[i]?.icon_file_path }}
                style={styles.plantImage}
                resizeMode="cover"
              />
              <View style={styles.plantText}>
                <Text style={styles.name}>{plants[i]?.name || "Unnamed Plant"}</Text>
                <Text style={styles.species}>{plants[i]?.species || "No Species"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PlantList;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f8f4ed',
    padding: 10,
    paddingTop: 40,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5e775f',
    paddingBottom: 10
  },
  infoBox: {
    padding: 5,
  },
  plantBlock: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 20,
    marginBottom: 7,
    alignItems: 'flex-start'
  },
  plantImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginRight: 10,
  },
  plantText: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: 800,
    color: '#5e775f',
    paddingTop: 5
  },
  species: {
    fontSize: 12,
    fontWeight: 400,
    color: '#acd963',
  },
});