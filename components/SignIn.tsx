import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import Button from "./ui/Button";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert("Erro", error.message);
        return;
      }

      // Se chegou aqui, logou com sucesso
      if (data?.session) {
        router.push("/(panel)/(coffe)"); // Navega para a tela principal
      }
    } catch (e: any) {
      Alert.alert("Erro inesperado", e.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ImageBackground
      source={require("@/assets/images/background/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
             contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={styles.overlay}>
              <View style={styles.card}>
                <View style={styles.logoView}>
                  <Image
                    source={require("@/assets/images/background/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <Text style={styles.title}>Cafezito</Text>
                </View>
                <Text style={styles.subtitle}>Log-In</Text>

                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize={"none"}
                  secureTextEntry={true}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />

                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor="#aaa"
                  secureTextEntry
                  style={styles.input}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  autoCapitalize={"none"}
                />

                <Button
                  disabled={loading}
                  onPress={() => signInWithEmail()}
                  text={"Sign-In"}
                  style={styles.SignInButton}
                />

                <Text style={styles.footerText}>
                  Not registered yet?{" "}
                  <Text
                    onPress={() => router.push("/signUp")}
                    style={styles.SignUpText}
                  >
                    Sign-Up
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // escurece a imagem de fundo
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 10,
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontFamily: "Sora",
    fontWeight: "700",
    color: "#A0522D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "Sora",
    color: "#000",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    backgroundColor: "#A0522D",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    fontFamily: "Sora",
    color: "#000",
    fontSize: 14,
  },
  SignUpText: {
    color: "#A0522D",
    fontWeight: "600",
  },
  logoView: {
    flexDirection: "row",
  },
  SignInButton: {
    width: "100%",
    marginBottom: 10,
  },
});

export default SignInScreen;

const router = useRouter();
