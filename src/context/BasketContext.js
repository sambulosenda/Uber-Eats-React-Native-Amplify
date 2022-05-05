import { Auth, DataStore } from 'aws-amplify';
import { createContext, useContext, useEffect, useState } from 'react';
import { BasketDish } from '../models';
import { User, Basket } from '../models';
import { useAuthContext } from './AuthContext';

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { sub, dbUser } = useAuthContext();

  const [basket, setBasket] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    DataStore.query(Basket, (b) =>
      b.restaurantID('eq', restaurant.id).userID('ed', dbUser.id)
    ).then((baskets) => setBasket(baskets[0]));
  }, [sub, restaurant]);

  const addDishToBacket = async (dish, quantity) => {
    //console.log('addDishToBacket', dish, quantity);

    let theBasket = basket || (await createNewBasket());
    DataStore.save(new BasketDish({ quantity, Dish: dish, basketID: theBasket.id }));
  };

  const createNewBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({
        userID: dbUser.id,
        restaurantID: restaurant.id,
      })
    );
    setBasket(newBasket);
    return newBasket;
  };

  return (
    <BasketContext.Provider value={{ addDishToBacket, setRestaurant, basket }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
