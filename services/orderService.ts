import { supabase } from "@/lib/supabase";
import { Order, AddOrderInput } from "@/types/ordersType";

export async function getOrdersByUser(userId: string): Promise<Order[] | null> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      user_id,
      order_date,
      total,
      status_order,
      order_coffee (
        order_id,
        coffee_id,
        quantity,
        unit_price,
        coffees:coffee_id ( id, name, price )
      )
    `)
    .eq("user_id", userId)
    .order("order_date", { ascending: false });

  if (error) {
    return null;
  }

  const normalized = data.map((order: any) => ({
    ...order,
    order_coffee: order.order_coffee.map((oc: any) => ({
      ...oc,
      coffees: oc.coffees ? oc.coffees[0] ?? null : null,
    })),
  }));

  return normalized as Order[];
}

export async function addOrder({
  user_id,
  coffees,
}: AddOrderInput): Promise<Order | null> {
  const total = coffees.reduce(
    (sum, c) => sum + c.quantity * c.unit_price,
    0
  );

  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id,
        order_date: new Date().toISOString(),
        total,
        status_order: 2,
      },
    ])
    .select()
    .single();

  if (orderError) {
    return null;
  }

  const order_id = orderData.id;
  const orderCoffees = coffees.map((c) => ({
    order_id,
    coffee_id: c.coffee_id,
    quantity: c.quantity,
    unit_price: c.unit_price,
  }));

  const { error: ocError } = await supabase
    .from("order_coffee")
    .insert(orderCoffees);

  if (ocError) {
    return null;
  }

  return orderData as Order;
}
