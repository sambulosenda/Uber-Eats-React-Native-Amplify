import React, { useState, useEffect } from 'react';

import { StyleSheet, FlatList, View } from 'react-native';
import RestaurentItem from '../../components/RestaurentItem';
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';
//import restaurants from '../../../assets/data/restaurants.json';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    const results = await DataStore.query(Restaurant);
    setRestaurants(results);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurentItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
