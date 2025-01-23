// import {Button, Dimensions,ScrollView,TouchableOpacity,StyleSheet,View,Text,Image, TouchableHighlight} from 'react-native';
// import {TextInput,Chip,SegmentedButtons,Surface} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';
// import {useState} from 'react';
// import { formatDistance, subDays,add,parse,format } from "date-fns";
// import supabase from '../supabaseClient';

// export default function AddPlant({route}){

//     let water_schedule = []

//     // plant API
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectedPlant, setSelectedPlant] = useState(null);

//     const API_TOKEN = '9iHPQV4igm0TwWTaRCFHBewJ9cswoP93ZvLGNdbxbbc'

//     const searchPlants = async (plant) => {
//       // if (!searchQuery.trim()) return;
//       setLoading(true);
//       let currentPage = 1;
//       try {
//         while (currentPage <= 10) {
//           const response = await fetch(`https://trefle.io/api/v1/plants?token=${API_TOKEN}&page=${currentPage}`);
//           // const response = await fetch(`https://trefle.io/api/v1/plants?token=${API_TOKEN}&q=${searchQuery}`);
//           const json = await response.json();
//           const plantDetails = json.data.map((plant) => ({
//             speciesName: plant.scientific_name,
//             observations: plant.observations,
//           }));
//           console.log(plantDetails);
//           setSearchResults((prevResults) => [...prevResults, ...(plantDetails || [])])
//           // setSearchResults(json.data || []);
//           currentPage += 1;
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     const selectPlant = (plant) => {
//       setSelectedPlant(plant);
//       setSpecies(plant.scientific_name || 'Unknown Species');
//       setSearchResults([]); // Clear search results
//       setSearchQuery(''); // Clear search query
//     };

//     const getFormattedDate = () => {
//       const today = new Date();
//       let day = today.getDate();
//       let month = today.getMonth()+1;
//       let year = today.getFullYear();
//       if (month < 10){
//         month = '0' + month;
//       }
//       if (day < 10){
//         day = '0' + day;
//       }
//       return(`${year}-${month}-${day}`);
//     }
//     const generateFutureDates = (lastWatered, freqWaterByDay) => {
//       let potentialWateringDates = [];
//       let count = 0;
//       let newDate = new Date();
//       let oldDate = parse(lastWatered, 'yyyy-MM-dd', new Date());
//       // generate watering dates within 60 days of last watering
//       while (count <= 60){
//         newDate = add(oldDate, {
//           days: freqWaterByDay
//         });
//         potentialWateringDates.push(format(newDate, 'yyyy-MM-dd'));
//         oldDate = newDate;
//         count += freqWaterByDay;
//       }
//       return(potentialWateringDates);
//     }

//     const handleSubmit = async () => {
//         //data and error vars

//         const {data, error} = await supabase
//           .from('Plants')
//           .insert([{owners_username, name, species, is_native, is_indoors,icon_file_path,water_frequency,water_record,water_schedule,notes}]) // inserts new row, vars must be same name as col names
    
//         if (error) {
//           console.log(error)
//           setFormError(error)
//         }
//         if (data){
//           console.log(data)
//           setFormError(null)
//         }
//         console.log('submitted')
//         navigation.navigate('Home',{username:owners_username})
//     }
//     //console.log(searchQuery)
//     //console.log(searchResults)

//     return (
//       <ScrollView style={{width:w,height:900}}>
//         <TextInput
//           label="Search Plants"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           onSubmitEditing={searchPlants}
//         />
//         {loading ? (
//           <Text>Searching...</Text>
//         ) : (
//           searchResults.map((plant) => (
//             <TouchableOpacity 
//               key={plant.id} 
//               onPress={() => selectPlant(plant)}
//               style={styles.searchResult}
//             >
//               <View style={styles.searchResultContent}>
//                 <Text>{plant.speciesName || 'No Name'}</Text>
//               </View>
//             </TouchableOpacity>
//           ))
//         )}
        
//         <View style={styles.input}>
//             {/* <TextInput label='Name' onChangeText={(text) => {setName(text)}}/> */}
//             <TextInput
//               label="Name"
//               value={name}
//               onChangeText={(text) => setName(text)}
//             />
//         </View>

//         <View style={styles.input}>
//             <TextInput label='Species' onChangeText={(text) => {setSpecies(text)}}/>
//         </View>
        
//         <SegmentedButtons
//           style={{margin:30}}
//           value={is_indoors}
//           onValueChange={setIsIndoors}
//           buttons={[
//             {
//               value: true,
//               label: 'Indoors',
//             },
//             {
//               value: false,
//               label: 'Outdoors',
//             },
//           ]}
//         />

//         <Chip style={{margin:30}} onPress={()=>{setIsNative(!is_native)}} mode='outlined' selected={is_native}>Native Plant?</Chip>

//         <View style={styles.row}>
//           <TouchableOpacity onPress={()=>setIconFilePath("https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg")}>
//             <Surface style={styles.surface}>
//               <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/7/70/Malva_moschata_Mitterbach_02.jpg"}}/>
//             </Surface>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={()=>setIconFilePath("https://upload.wikimedia.org/wikipedia/commons/f/f1/Green_plants_1.jpg")}>
//             <Surface style={styles.surface}>
//               <Image source={{width:75,height:75,uri:"https://upload.wikimedia.org/wikipedia/commons/f/f1/Green_plants_1.jpg"}}/>
//             </Surface>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.freqWaterByDayQue}>
//           <Text>Water every </Text>
//           <TextInput style={styles.shortInput} onChangeText={(text) => {setWaterFrequency(parseInt(text,10))}}/>
//           <Text> days </Text>
//         </View>

//         <View style={styles.input}>
//           <TextInput label='Last watered (yyyy-MM-dd)' onChangeText={(text) => {setWaterRecord([text])}}/>
//         </View>

//         <View style={styles.input}>
//           <TextInput label='Notes' onChangeText={(text) => {setNotes(text)}}/>
//         </View>
        
        

//         <View style={styles.submitBtn}>
//             <Button color='white' title="Add me!" onPress={()=>{
//               water_schedule = generateFutureDates(water_record[0],water_frequency)
//               //console.log(water_record)
//               //console.log(generateFutureDates(lastWatered,water_frequency))
//               handleSubmit()
//             }}/>
//         </View>
        
//       </ScrollView>
  
//     )
// }

// const styles = StyleSheet.create({
  
//   input:{
//     height:40,
//     width:250,
//     margin:30,
    
//   },
//   shortInput:{
//     height:40,
//     width:40,
//     margin:0,
    
//   },
//   submitBtn:{
//     backgroundColor:'green',
//     height:40,
//     width:100,
//     borderRadius: 10,
//     margin:30,
//   },
//   surface:{
//     height:100,
//     width:100,
//     borderRadius:20,
//     justifyContent:'center',
//     alignItems:'center'

//   },
//   row:{
//     width:'100%',
//     height:100,
//     flexDirection: 'row',
//     justifyContent: 'space-around'
//   },
//   freqWaterByDayQue:{
//     width:'100%',
//     height:40,
//     flexDirection:'row',
//     justifyContent: 'flex-start',
//     margin:30
//   },
//   dayChipRow:{
//     flexDirection:'row',
//   },
//   dayChip:{
//     width:100,
//     height:30
//   },
//   searchResult: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   searchResultContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

// })
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';

const API_TOKEN = '9iHPQV4igm0TwWTaRCFHBewJ9cswoP93ZvLGNdbxbbc';

export default function FindPlant() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'https://trefle.io/api/v1'

  const searchPlants = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setLoading(true);
    setSearchError(null);
    
    try {
        const response = await fetch(
            `${BASE_URL}/species/search?token=${API_TOKEN}&q=${encodeURIComponent(searchQuery)}`
          );
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const json = await response.json();
      
      if (json.data && Array.isArray(json.data)) {
        setSearchResults(json.data.map(plant => ({
          id: plant.id,
          scientific_name: plant.scientific_name,
        })));
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchError('Failed to search plants. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const selectPlant = async (plant) => {
    setSelectedPlant(plant);
    setSpecies(plant.scientific_name || 'Unknown Species');
    
    // Fetch detailed plant information to check native status
    try {
      const response = await fetch(
        `${BASE_URL}/plants/${plant.id}?token=${API_TOKEN}`
      );
      const json = await response.json();
      
      // Check if the plant is native to the United States
      const isNativeToUS = json.data.observations?.toLowerCase().includes('united states');
      setIsNative(isNativeToUS);
      
    } catch (err) {
      console.error('Error fetching plant details:', err);
    }
    
    setSearchResults([]); // Clear search results
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search for plants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchPlants} // Trigger search on Enter key
        />
        <TouchableOpacity onPress={searchPlants} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#34a853" style={styles.loader} />}

      {/* Search Results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id?.toString() || item.scientific_name}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>
              {item.scientific_name || 'Unknown Name'}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          !loading && searchQuery && (
            <Text style={styles.emptyText}>
              No results found for "{searchQuery}"
            </Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#34a853',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  resultItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 16,
  },
});
