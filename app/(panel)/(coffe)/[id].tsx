import DetailBar from "@/components/Details/DetailBar";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

const Detail = () => {

  return (
    <View style={styles.container}>
      <DetailBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Detail;