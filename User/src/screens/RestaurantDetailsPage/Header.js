import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const DEFAULT_IMAGE = "https://www.gstatic.com/webp/gallery/1.jpg";

const Header = ({restaurant}) => {

  return (
    <View style={styles.page}>
      <Image source={{ uri: restaurant.image.startsWith("https") ? restaurant.image: DEFAULT_IMAGE, }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subTitle}>
          $ {restaurant.delieveryFee.toFixed(1)} {restaurant.minDeliveryTime}-
          {restaurant.maxDeliveryTime} minutes
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },

  subTitle: {
    color: "grey",
    fontSize: 15,
  },
  container: {
    margin: 10,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    height: 50,
    width: 50,
  },
});

export default Header;
