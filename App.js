import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Basket from './src/screens/Basket';
import DishDetailsScreen from './src/screens/DishDetailsScreen';

import HomeScreen from './src/screens/HomeScreen';
import OrderDetails from './src/screens/OrderDetails';
import OrderScreen from './src/screens/OrderScreen';
import RestaurantDetailsPage from './src/screens/RestaurantDetailsPage';

//Wrap the whole app with the navigation
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

import { withAuthenticator } from 'aws-amplify-react-native';
import AuthContextProvider from './src/context/AuthContext';
import BasketContextProvider from './src/context/BasketContext';

function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <BasketContextProvider>
          <RootNavigator />
        </BasketContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
