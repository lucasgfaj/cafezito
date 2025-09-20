import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  AppState,
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
import {
  SupabaseError,
  SupabaseSignUp,
  SupabaseSignUpResponse,
  SupabaseUser,
} from "@/types/supabaseType";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    const { data, error }: SupabaseSignUp = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Error signing up: " + error.message);
      setLoading(false);
      return;
    }

    const { user }: { user: SupabaseUser } = data;

    try {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: user.id,
          email: user.email,
          name: name,
          phone: phone,
          address: address,
          created_at: new Date(),
        },
      ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      Alert.alert("Sign up successful! Please log in.");
      router.push("/signIn");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error saving user data: " + error.message);
      } else {
        Alert.alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
    /*if (!session) Alert.alert("Check your email for the login link!");
    setLoading(false);*/
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
          <Text style={styles.subtitle}>Register</Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="default"
            onChangeText={(text) => setName(text)}
            value={name}
            autoCapitalize={"none"}
          />

          <TextInput
            placeholder="E-mail"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize={"none"}
          />

          <TextInput
            placeholder="Address"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="default"
            onChangeText={(text) => setAddress(text)}
            value={address}
            autoCapitalize={"none"}
          />

          <TextInput
            placeholder="Phone"
            placeholderTextColor="#aaa"
            style={styles.input}
            keyboardType="default"
            onChangeText={(text) => setPhone(text)}
            value={phone}
            autoCapitalize={"none"}
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

          <TextInput
            placeholder="Repeat your password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            autoCapitalize={"none"}
          />

          <Button
            text={"Sign-Up"}
            style={styles.signUpButton}
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />

          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text
              onPress={() => router.push("/signIn")}
              style={styles.signInText}
            >
              Sign-In
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
    fontFamily: "Sora",
    fontWeight: "400",
    color: "#000",
    fontSize: 12,
    marginBottom: 10,
  },
  signInText: {
    color: "#A0522D",
    fontWeight: "600",
  },
  logoView: {
    flexDirection: "row",
  },
  signUpButton: {
    width: "100%",
    marginBottom: 10,
  },
});

export default SignUpScreen;

const router = useRouter();
