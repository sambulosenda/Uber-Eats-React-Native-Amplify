import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useRoute, useNavigation } from '@react-navigation/native';
import restaurants from '../../../assets/data/restaurants.json';
import DishListItem from '../../components/DishListItem';
import Header from './Header';

const restaurant = restaurants[0];

function RestaurantDetailsPage() {
  // contains details from the previous screens
  const route = useRoute();
  const navigation = useNavigation();

  const { id } = route.params;
  console.log(id);

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
