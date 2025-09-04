// app/login.tsx

import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "./ui/Button";

const RegisterScreen = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/background/background.png")}
      style={styles.background}
      resizeMode="cover"
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
          <Text style={styles.subtitle}>Register</Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="email-address"
          />

          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="default"
          />


          <TextInput
            placeholder="Address"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="default"
          />

          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder="Repeat your password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
          />

      <Button
          text={"Register Now"}
          style={styles.loginButton}
        />

          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              onPress={() => router.push("/login")}
              style={styles.registerText}
            >
              Register Now
            </Text>
          </Text>
        </View>
      </View>
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
    paddingVertical: 5,
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
    fontFamily: 'Sora',
    fontWeight: "700",
    color: "#A0522D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: 'Sora',
    color: "#000",
    marginBottom: 10,
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
    paddingHorizontal: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    fontFamily: 'Sora',
    fontWeight: "400",
    color: "#000",
    fontSize: 12,
    marginBottom: 10,
  },
  registerText: {
    color: "#A0522D",
    fontWeight: "600",
  },
  logoView: {
    flexDirection: 'row'
  },
    loginButton: {
    width: "100%",
    marginBottom: 10
  },
});

export default RegisterScreen;

const router = useRouter();
