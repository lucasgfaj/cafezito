import { supabase } from "@/lib/supabase";
import { Coffe } from "@/types/coffeType";

export async function getCoffees(): Promise<Coffe[] | null> {
    const { data, error } = await supabase
        .from('coffees')
        .select('*');

    if (error) {
        console.error('Error at fetching coffees:', error);
        return null; 
    }

    return data; 
}

export async function getCoffeeById(coffeeId: string): Promise<Coffe | null> {
    const { data, error } = await supabase
        .from('coffees')
        .select('*')
        .eq('id', coffeeId)
        .single();
        
    if (error) {
        console.error('Error at fetching coffee by ID:', error);
        return null; 
    }
    return data;
}
