import { supabase } from "@/lib/supabase";

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

export async function currentUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if(error){
    console.log("Error for get session", error);
    return null;
  }
  
  return session?.user ?? null;
}
