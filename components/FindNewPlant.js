import React, { useState, useEffect } from 'react';
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

export default function PlantList() {
  const [plants, setPlants] = useState([]); // Store all plants
  const [selectedPlant, setSelectedPlant] = useState(null); // Store selected plant details
  const [loading, setLoading] = useState(false);

  // Fetch all plants from the first page
  const fetchPlants = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://trefle.io/api/v1/plants?token=${API_TOKEN}`);
      const json = await response.json();
      setPlants(json.data || []);
    } catch (err) {
      console.error('Error fetching plants:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  // Render individual plant details when selected
  const renderPlantDetails = () => (
    <View style={styles.detailsContainer}>
      <TouchableOpacity onPress={() => setSelectedPlant(null)} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to List</Text>
      </TouchableOpacity>
      <Text style={styles.plantName}>
        Common Name: {selectedPlant.common_name || 'N/A'}
      </Text>
      <Text style={styles.plantScientificName}>
        Species: {selectedPlant.scientific_name || 'N/A'}
      </Text>
      <Text style={styles.plantFamily}>
        Family: {selectedPlant.family || 'N/A'}
      </Text>
      <Text style={styles.plantYear}>
        Year Discovered: {selectedPlant.year || 'Unknown'}
      </Text>
    </View>
  );

  // Render list of all plants
  const renderPlantList = () => (
    <FlatList
      data={plants}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setSelectedPlant(item)} style={styles.resultItem}>
          <Text style={styles.resultText}>{item.common_name || item.scientific_name || 'Unnamed Plant'}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        !loading && <Text style={styles.emptyText}>No plants available.</Text>
      }
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Plant Encyclopedia</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#34a853" style={styles.loader} />
      ) : selectedPlant ? (
        renderPlantDetails() // Show selected plant details
      ) : (
        renderPlantList() // Show list of plants
      )}
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
