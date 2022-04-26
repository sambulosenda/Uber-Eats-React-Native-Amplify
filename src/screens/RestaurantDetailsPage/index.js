import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useRoute, useNavigation } from '@react-navigation/native';
import DishListItem from '../../components/DishListItem';
import Header from './Header';

import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';

function RestaurantDetailsPage() {
  const [restaurant, setRestaurant] = useState(null);

  // contains details from the previous screens
  const route = useRoute();
  const navigation = useNavigation();

  const  id  = route.params?.id;

 
  const fetchRestaurant = async () => {
    const result = await DataStore.query(Restaurant, id);
    setRestaurant(result);
  };

  useEffect(() => {
    fetchRestaurant()
  }, []);



  if (!restaurant) {
    return <ActivityIndicator size={'large'} color="red" />;
  }
  
  console.log(restaurant)
  return (
    <View View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={restaurant.dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        onPress={useNavigation().goBack}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 10,
  },

  subTitle: {
    color: 'grey',
    fontSize: 15,
  },
  container: {
    margin: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    height: 50,
    width: 50,
  },
});

export default RestaurantDetailsPage;
