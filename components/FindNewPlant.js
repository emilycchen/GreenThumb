import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

const API_TOKEN = '9iHPQV4igm0TwWTaRCFHBewJ9cswoP93ZvLGNdbxbbc';

export default function PlantList() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch plants from the API
  const fetchPlants = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://trefle.io/api/v1/plants?token=${API_TOKEN}&page=${currentPage}`
      );
      const json = await response.json();
      setPlants(json.data || []);
    } catch (err) {
      console.error('Error fetching plants:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlants();
  }, [currentPage]);

  // Handle pagination
  const goToNextPage = () => setCurrentPage((prev) => prev + 1);
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Render plant details when selected
  const renderPlantDetails = () => (
    <View style={styles.background}>
      <ScrollView>
        <View style={styles.infoBox}>
          <Text style={styles.pageTitle}>Plant Details</Text>
        </View>
        <View style={styles.articleBlock}>
          <Text style={styles.title}>
            Common Name: {selectedPlant.common_name || 'N/A'}
          </Text>
          <Text style={styles.sentence}>
            Species: {selectedPlant.scientific_name || 'N/A'}
          </Text>
          <Text style={styles.info}>
            Family: {selectedPlant.family || 'N/A'}
          </Text>
          <Text style={styles.info}>
            Genus: {selectedPlant.genus || 'N/A'}
          </Text>
          <Text style={styles.info}>
            Regions Found: {selectedPlant.observations || 'Unknown'}
          </Text>
          <Text style={styles.info}>
            Year Discovered: {selectedPlant.year || 'Unknown'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setSelectedPlant(null)} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // Render plant list with pagination controls
  const renderPlantList = () => (
    <View style={styles.background}>
      <ScrollView>
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
            style={[styles.paginationButton]}
          >
            <Text style={styles.paginationText}>{"←"}</Text>
          </TouchableOpacity>
          <Text style={styles.pageNumber}>Page {currentPage}</Text>
          <TouchableOpacity onPress={goToNextPage} style={styles.paginationButton}>
            <Text style={styles.paginationText}>{"→"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.pageTitle}>Plant Encyclopedia</Text>
        </View>
        {plants.map((plant, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedPlant(plant)}
          >
            <View style={styles.articleBlock}>
              <Text style={styles.title}>{plant.common_name || 'No Name'}</Text>
              <Text style={styles.info}>
                Species: {plant.scientific_name || 'Unknown'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
            style={[styles.paginationButton]}
          >
            <Text style={styles.paginationText}>{"←"}</Text>
          </TouchableOpacity>
          <Text style={styles.pageNumber}>Page {currentPage}</Text>
          <TouchableOpacity onPress={goToNextPage} style={styles.paginationButton}>
            <Text style={styles.paginationText}>{"→"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  return loading ? (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#34a853" />
    </View>
  ) : selectedPlant ? (
    renderPlantDetails()
  ) : (
    renderPlantList()
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f8f4ed',
    padding: 10,
    paddingTop: 20,
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
  info: {
    fontSize: 12,
    color: '#c2c1be',
    paddingTop: 2,
    paddingBottom: 2,
  },
  sentence: {
    fontSize: 12,
    color: '#5e775f',
    paddingTop: 5,
    paddingBottom: 3,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  paginationButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  paginationText: {
    color: '#5e775f',
    fontSize: 20,
    fontWeight: 'bold'
  },
  pageNumber: {
    color: '#5e775f',
    fontWeight: 600,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#5e775f',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
