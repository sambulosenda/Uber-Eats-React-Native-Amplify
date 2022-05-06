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
  const [basketDishes, setBasketDishes] = useState([]);

  const totalPrice = basketDishes.reduce(
    (sum, basketDish) => sum + basketDish.quantity * basketDish.Dish.price,
    0
  );

  useEffect(() => {
    DataStore.query(Basket, (b) =>
      b.restaurantID('eq', restaurant.id).userID('ed', dbUser.id)
    ).then((baskets) => setBasket(baskets[0]));
  }, [sub, restaurant]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketDish, (bd) => bd.basketID('eq', basket.id)).then(basketDishes);
    }
  }, [basket]);

  const addDishToBacket = async (dish, quantity) => {
    //console.log('addDishToBacket', dish, quantity);

    let theBasket = basket || (await createNewBasket());

    const newDish = await DataStore.save(
      new BasketDish({ quantity, Dish: dish, basketID: theBasket.id })
    );

    setBasketDishes([...basketDishes, newDish]);
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
    <BasketContext.Provider
      value={{ addDishToBacket, setRestaurant, restaurant, basket, basketDishes, totalPrice }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
