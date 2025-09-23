import { Feather } from "@expo/vector-icons";
import {
  ActivityIndicator,
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
import { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function AccountBar() {
  const {
    profile,
    setProfile,
    password,
    setPassword,
    loading,
    updateProfile,
    logout,
    loadingProfile,
  } = useUserProfile();

  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Mostra loading enquanto o perfil está carregando
  if (loadingProfile || !profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C67C4E" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              value={profile.name}
              onChangeText={(t) => setProfile({ ...profile, name: t })}
              editable={isEditing}
              autoCapitalize="words"
            />

            <Text style={[styles.label, { marginTop: 24 }]}>Email</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profile.email}
              onChangeText={(t) => setProfile({ ...profile, email: t })}
              editable={isEditing}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={[styles.label, { marginTop: 24 }]}>Address</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profile.address}
              onChangeText={(t) => setProfile({ ...profile, address: t })}
              editable={isEditing}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={[styles.label, { marginTop: 24 }]}>Phone</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={profile.phone}
              onChangeText={(t) => setProfile({ ...profile, phone: t })}
              editable={isEditing}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={[styles.label, { marginTop: 24 }]}>Password</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={password}
              onChangeText={setPassword}
              editable={isEditing}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />

            {isEditing && (
              <View style={styles.buttonWrapper}>
                <Button
                  width="100%"
                  height={50}
                  borderRadius={12}
                  icon="save"
                  backgroundColor="#C67C4E"
                  onPress={updateProfile}
                  text={loading ? "Saving..." : "Save Changes"}
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
                onPress={logout}
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
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
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
    marginBottom: 140,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#444",
  },
});
