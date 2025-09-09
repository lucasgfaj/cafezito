import Location from "@/components/Panel/Location";
import SearchBar from "@/components/Panel/SearchBar";
import StoreList from "@/components/Panel/StoreList";
import CardImg from "@/components/ui/CardImg";
import Slider from "@/components/ui/Slider";
import { categorys } from "@/mocks/categorys";
import { products } from "@/mocks/products";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Home() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(categorys);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Coffe");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (selectedCategory === "All Coffe") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory]);

  const handleCategoryPress = (item: { id: string; name: string }) => {
    console.log("Selecionado:", item.name);
    setSelectedCategory(item.name);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topSection}>
        <Location />
        <SearchBar />
        <CardImg
          image={require("../../assets/images/art/coffe.png")}
          width={300}
          height={145}
          borderRadius={16}
        />
      </View>

      <View style={styles.bottomSection}>
        <Slider
          style={styles.slider}
          data={categories}
          width={90}
          height={30}
          backgroundColor="#C67C4E"
          textColor="white"
          borderRadius={8}
          onPressItem={handleCategoryPress}
        />
        <View style={styles.storeListContainer}>
          <StoreList products={filteredProducts} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topSection: {
    height: 260,
    backgroundColor: "#313131",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  bottomSection: {
    paddingBottom: 32,
  },
  slider: {
    marginTop: 100,
    marginLeft: 8,
  },
  storeListContainer: {
    marginLeft: 15,
  },
});
