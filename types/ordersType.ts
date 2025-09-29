export type Coffee = {
  id: string;
  name: string;
  price: number;
};

export type OrderCoffee = {
  order_id: string;
  coffee_id: string;
  quantity: number;
  unit_price: number;
  coffees?: Coffee;
};

export type Order = {
  id: string;
  user_id: string;
  order_date: string;
  total: number;
  status_order: number;
  order_coffee: OrderCoffee[];
};

export type AddOrderInput = {
  user_id: string;
  coffees: {
    coffee_id: string;
    quantity: number;
    unit_price: number;
  }[];
};