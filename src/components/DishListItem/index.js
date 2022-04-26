import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

function DishListItem({ dish }) {
    const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("Dish", {id: dish.id })}
     style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {dish.description}
        </Text>
        <Text style={styles.price}>${dish.price}</Text>
      </View>

      <View>{dish.image && <Image source={{ uri: dish.image }} style={styles.image} />}</View>
    </Pressable>
  );
}

export default DishListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'lightgrey',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  description: {
    color: 'grey',
  },
  price: {
    fontSize: 18,
  },
  image: {
    height: 100,
    aspectRatio: 1,
  },
});