import React, { useState, useEffect } from "react";
import axios from "axios";

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(
          "https://perenual.com/api/v1/plants",
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_PLANT_API_KEY}`,
            },
            params: {
              page: 1,
              per_page: 10,
            },
          }
        );
        setPlants(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {plants.map((plant) => (
        <li key={plant.id}>{plant.common_name}</li>
      ))}
    </ul>
  );
};

export default FetchPlant;
