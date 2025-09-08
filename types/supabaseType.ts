export interface SupabaseUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface SupabaseError {
  message: string;
}

export interface SupabaseSignUpResponse {
  user: SupabaseUser;
  session: {
    access_token: string;
    refresh_token: string;
    user: SupabaseUser;
  };
  error: SupabaseError | null;
}

export interface SupabaseSignUp {
    data: any;
    error: SupabaseError | null
}
