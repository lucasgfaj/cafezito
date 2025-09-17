import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Button from "@/components/ui/Button";
import { useTokenContext } from "@/context/useContext";

export default function AccountBar() {
  const { token, userId, setToken, setUserId } = useTokenContext();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  return (
     <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Feather name={isEditing ? "x" : "edit"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={name}
          onChangeText={setName}
          editable={isEditing}
          autoCapitalize="words"
        />

        <Text style={[styles.label, { marginTop: 24 }]}>Email</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.inputDisabled]}
          value={email}
          editable={isEditing}
          autoCapitalize="none"
          autoCorrect={false}
        />

           <Text style={[styles.label, { marginTop: 24 }]}>Address</Text>
        <TextInput
         style={[styles.input, !isEditing && styles.inputDisabled]}
          value={address}
          editable={isEditing}
          autoCapitalize="none"
          autoCorrect={false}
        />


   <Text style={[styles.label, { marginTop: 24 }]}>Phone</Text>
        <TextInput
       style={[styles.input, !isEditing && styles.inputDisabled]}
          value={phone}
          editable={isEditing}
          autoCapitalize="none"
          autoCorrect={false}
        />


          <Text style={[styles.label, { marginTop: 24 }]}>Password</Text>
        <TextInput
         style={[styles.input, !isEditing && styles.inputDisabled]}
          value={password}
          editable={isEditing}
          autoCapitalize="none"
          autoCorrect={false}
        />


        {isEditing && (
          <View style={styles.buttonWrapper}>
            <Button
              width="100%"
              height={50}
              borderRadius={12}
              icon="save"
              backgroundColor="#C67C4E"
              onPress={() => {}}
              text={loadingSave ? "Saving..." : "Save Changes"}
            />
          </View>
        )}

        <View style={styles.buttonWrapper}>
          <Button
            width="100%"
            height={50}
            borderRadius={12}
            icon="log-out"
            backgroundColor="#C67C4E"
            onPress={() => {}}
            text="Sign-Out"
          />
        </View>
      </View>
    </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  content: { alignItems: "center" },
  header: {
    backgroundColor: "#313131",
    paddingTop: 38,
    paddingBottom: 30,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: { color: "white", fontSize: 24, fontWeight: "bold" },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 80
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 4,
    color: "#444",
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
  },
  inputDisabled: { backgroundColor: "#e0e0e0", color: "#030000ff" },
  buttonWrapper: { marginTop: 24 },
});