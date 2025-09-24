import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { supabase } from "@/lib/supabase";
import { useTokenContext } from "@/context/useContext";
import { useRouter } from "expo-router";

type UserProfile = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

export function useUserProfile() {
  const { setToken, setUserId } = useTokenContext();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // 🔹 Buscar dados ao iniciar
  useEffect(() => {
    (async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return;

      setProfile((prev) => ({ ...prev, email: user.email ?? "" }));

      const { data, error } = await supabase
        .from("users")
        .select("name, address, phone")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile({
          name: data.name || "",
          email: user.email || "",
          address: data.address || "",
          phone: data.phone || "",
        });
      }
    })();
  }, []);

  // 🔹 Atualizar dados
  async function updateProfile() {
    setLoading(true);
    try {
      // Atualizar no auth (email / senha)
      const { error: authError } = await supabase.auth.updateUser({
        email: profile.email,
        password: password || undefined,
      });

      if (authError) throw new Error(authError.message);

      // Buscar userId
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado.");

      // Atualizar tabela users
      const { error: updateError } = await supabase
        .from("users")
        .update({
          name: profile.name,
          address: profile.address,
          phone: profile.phone,
        })
        .eq("id", user.id);

      if (updateError) throw new Error(updateError.message);

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (err: unknown) {
      if (err instanceof Error) Alert.alert("Erro", err.message);
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Logout
  async function logout() {
    await supabase.auth.signOut();
    setToken(undefined);
    setUserId(undefined);
    router.replace("/signIn");
  }

   const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { data, error } = await supabase
        .from("users")
        .select("name, address, phone")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile({
          name: data.name || "",
          email: user.email || "",
          address: data.address || "",
          phone: data.phone || "",
        });
      } else {
        setProfile({ name: "", email: user.email || "", address: "", phone: "" });
      }
    } catch (err) {
      console.log("Erro ao buscar perfil:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    setProfile,
    password,
    setPassword,
    loading,
    updateProfile,
    logout,
    loadingProfile,
    fetchProfile
  };
}
