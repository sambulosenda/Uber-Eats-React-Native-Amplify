import { Auth, DataStore } from 'aws-amplify';
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../models';

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  const sub = authUser?.attributes?.sub;

  return (
    <BasketContext.Provider value={{ authUser, dbUser, sub, setDbUser }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
