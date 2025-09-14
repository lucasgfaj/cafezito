import { useEffect, useState } from "react";
import { Coffe } from "@/types/coffeType";
import { getCoffees } from "@/services/coffeService";

export default function useCoffes(selectedCategory: string) {
  const [filteredCoffees, setFilteredCoffees] = useState<Coffe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCoffees() {
      setLoading(true);
      const coffees = await getCoffees();

      if (!coffees) {
        setFilteredCoffees([]);
        setLoading(false);
        return;
      }

      if (selectedCategory === "All Coffe") {
        setFilteredCoffees(coffees);
      } else {
        const filtered = coffees.filter((coffe) =>
          coffe.name.toLowerCase().includes(selectedCategory.toLowerCase())
        );
        setFilteredCoffees(filtered);
      }
      setLoading(false);
    }
    fetchCoffees();
  }, [selectedCategory]);
  return { filteredCoffees, loading};
}
