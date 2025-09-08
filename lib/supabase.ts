import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  }
);

// Function to log current user details
async function logCurrentUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error fetching session:", error.message);
    return;
  }

  if (session && session.user) {
    const user = session.user;
    console.log("Logged-in user ID:", user.id);
    console.log("Logged-in user email:", user.email);
    console.log("Access Token:", session.access_token);
  } else {
    console.log("No user is currently logged in.");
  }
}

// Call the logCurrentUser function to log user data
logCurrentUser();
