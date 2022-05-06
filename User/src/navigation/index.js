import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailsPage from '../screens/RestaurantDetailsPage';
import OrderDetails from '../screens/OrderDetails';
import OrderScreen from '../screens/OrderScreen';

import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DishDetailsScreen from '../screens/DishDetailsScreen';
import Basket from '../screens/Basket';
import Profile from '../screens/ProfileScreen';
import { useAuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

  //Takes f
  const { dbUser } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbUser ? (
        <Stack.Screen name="MyTabs" component={MyTabs} />
      ) : (
        <Stack.Screen name="Profile" component={Profile} />
      )}
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} barStyle={{ backgroundColor: 'white' }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={color} /> }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="list-alt" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} /> }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Restaurants" component={HomeScreen} />
      <HomeStack.Screen
        name="Restaurant"
        component={RestaurantDetailsPage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Dish" component={DishDetailsScreen} />
      <HomeStack.Screen name="Basket" component={Basket} />
    </HomeStack.Navigator>
  );
};
export default RootNavigator;
