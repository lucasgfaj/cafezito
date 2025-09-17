import { supabase } from "@/lib/supabase";

export async function getFavorite(userId: string, coffeeId: string) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .eq("coffee_id", coffeeId)
    .single();

  if (error && error.code !== "PGRST116") { // PGRST116 = not found
    console.error("Error fetching favorite:", error);
    return null;
  }
  return data;
}

export async function addFavorite(userId: string, coffeeId: string) {
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ user_id: userId, coffee_id: coffeeId }])
    .select()
    .single();

  if (error) {
    console.error("Error adding favorite:", error);
    return null;
  }
  return data;
}

export async function removeFavorite(userId: string, coffeeId: string) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("coffee_id", coffeeId);

  if (error) {
    console.error("Error removing favorite:", error);
    return false;
  }
  return true;
}
