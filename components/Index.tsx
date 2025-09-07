import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "./ui/Button";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/background/background.png")}
        style={styles.imageTop}
        resizeMode="cover"
      />

      <LinearGradient
        colors={["black", "black", "black"]}
        style={styles.bottomContainer}
      >
        <View style={styles.content}>
          <Text style={styles.textPrimary}>
            Fall in Love with{"\n"}Coffee in Blissful{"\n"}Delight!
          </Text>
          <Text style={styles.textMinimal}>
            Welcome to our cozy coffee corner, where{"\n"}every cup is a
            delightful for you.
          </Text>
          <Button
            width={345}
            height={60}
            backgroundColor="#C67C4E"
            borderRadius={12}
            text="Get Started"
            textColor="#fff"
            onPress={() => router.push("/login")}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageTop: {
    height: "65%",
    width: "100%",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
    gap: 20,
    marginBottom: 40,
  },
  textPrimary: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 48,
  },
  textMinimal: {
    color: "#A2A2A2",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
