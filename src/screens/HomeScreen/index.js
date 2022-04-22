import { StyleSheet, FlatList, View } from 'react-native';
import RestaurentItem from '../../components/RestaurentItem';

import restaurants from '../../../assets/data/restaurants.json';

export default function HomeScreen() {
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
