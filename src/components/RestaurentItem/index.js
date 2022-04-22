import { StyleSheet, View, Text, Image, StatusBar, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const RestaurentItem = ({ restaurant }) => {
  const navigation = useNavigation();

  // allows to send the restaurant object to the next screen
  const onPress = () => {
    navigation.navigate('Restaurant', { id: restaurant.id });
  };

  return (
    <Pressable onPress={onPress} style={styles.restuarentContainer}>
      <Image
        source={{
          uri: restaurant.image,
        }}
        style={styles.image}
      />

      {/* Makes it row */}
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subTitle}>
            $ {restaurant.deliveryFee} {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime}{' '}
            minutes
          </Text>
        </View>

        <View style={styles.rating}>
          <Text>{restaurant.rating}</Text>
        </View>
      </View>

      <StatusBar style="auto" />
    </Pressable>
  );
};

export default RestaurentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  restuarentContainer: {
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 5 / 3,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 5,
  },
  subTitle: {
    color: 'grey',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    backgroundColor: '#f8f8f8',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
