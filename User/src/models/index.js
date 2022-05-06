// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED"
};

const { BasketDish, Dish, Order, OrderDish, Restaurant, Basket, User } = initSchema(schema);

export {
  BasketDish,
  Dish,
  Order,
  OrderDish,
  Restaurant,
  Basket,
  User,
  OrderStatus
};