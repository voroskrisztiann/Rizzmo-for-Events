import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (
    email: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string,
    phone: string,
    birthYear: string,
    gender: string,
    termsAccepted: boolean,
    marketingAccepted: boolean,
    staySignedIn: boolean,
  ) => {
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: {
              role: role,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        },
      );
      if (signUpError) throw signUpError;
      if (!authData.user?.id) throw new Error("No user ID returned");

      // Create profile record
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          email,
          first_name: firstName,
          last_name: lastName,
          phone_number: phone,
          year_of_birth: birthYear || null,
          gender: gender ? parseInt(gender) : null,
          terms_accepted: termsAccepted,
          marketing_accepted: marketingAccepted,
          stay_signed_in: staySignedIn,
          role,
        },
      ]);
      if (profileError) throw profileError;

      // Sign in immediately after signup if email confirmation is disabled
      const { data: session, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        // If sign in fails due to email confirmation required, show a friendly message
        if (signInError.message.includes("Email not confirmed")) {
          throw new Error(
            "Please check your email to confirm your account before signing in.",
          );
        }
        throw signInError;
      }

      return session;
    } catch (error) {
      // If the error is about email confirmation, we still want to close the dialog
      // since the signup was successful
      if (error.message.includes("Email not confirmed")) {
        return null; // This will allow the dialog to close
      }
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
