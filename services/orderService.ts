import { supabase } from "@/lib/supabase";

// ---- Tipos ----
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
  coffees?: Coffee; // join (1 café por linha)
};

export type Order = {
  id: string;
  user_id: string;
  order_date: string;
  total: number;
  order_coffee: OrderCoffee[];
};

// ---- Listar pedidos de um usuário ----
export async function getOrdersByUser(userId: string): Promise<Order[] | null> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      user_id,
      order_date,
      total,
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
    console.error("Error fetching orders:", error);
    return null;
  }

  // ⚠️ O Supabase retorna coffees como array -> pegamos só o primeiro item
  const normalized = data.map((order: any) => ({
    ...order,
    order_coffee: order.order_coffee.map((oc: any) => ({
      ...oc,
      coffees: oc.coffees ? oc.coffees[0] ?? null : null,
    })),
  }));

  return normalized as Order[];
}

// ---- Criar pedido + cafés ----
type AddOrderInput = {
  user_id: string;
  coffees: {
    coffee_id: string;
    quantity: number;
    unit_price: number;
  }[];
};

export async function addOrder({
  user_id,
  coffees,
}: AddOrderInput): Promise<Order | null> {
  // calcular total
  const total = coffees.reduce(
    (sum, c) => sum + c.quantity * c.unit_price,
    0
  );

  // criar pedido
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id,
        order_date: new Date().toISOString(),
        total,
      },
    ])
    .select()
    .single();

  if (orderError) {
    console.error("Erro ao criar pedido:", orderError);
    return null;
  }

  // vincular cafés ao pedido
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
    console.error("Erro ao inserir cafés do pedido:", ocError);
    return null;
  }

  return orderData as Order;
}
