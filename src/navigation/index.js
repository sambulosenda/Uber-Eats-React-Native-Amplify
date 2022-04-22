import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailsPage from '../screens/RestaurantDetailsPage';
import OrderDetails from '../screens/OrderDetails';
import OrderScreen from '../screens/OrderScreen';

import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DishDetailsScreen from '../screens/DishDetailsScreen';
import Basket from '../screens/Basket';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyTabs" component={MyTabs} />
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: 'white' }}>
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
        component={OrderScreen}
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
      <HomeStack.Screen name="Restaurant" component={RestaurantDetailsPage} />
      <HomeStack.Screen name="Dish" component={DishDetailsScreen} />
      <HomeStack.Screen name="Dasket" component={Basket} />


    </HomeStack.Navigator>
  );
};
export default RootNavigator;