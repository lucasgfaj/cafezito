import { supabase } from "@/lib/supabase";
import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";

interface TokenContextProps {
  token: string | undefined;
  userId: string | undefined;
  setToken: (token: string | undefined) => void;
  setUserId: (id: string | undefined) => void;
  isLoading: boolean;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export default function TokenContextProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Erro ao buscar sessão:", error.message);
        return;
      }

      if (session) {
        setToken(session.access_token);
        setUserId(session.user.id);
        console.log("Sessão carregada:", session);
      } else {
        console.log("Nenhuma sessão encontrada.");
      }

      setIsLoading(false);
    };

    loadSession();
  }, []);


  const value: TokenContextProps = {
    token,
    userId,
    setToken,
    setUserId,
    isLoading
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}


export function useTokenContext() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("This hook must be used inside a TokenContextProvider!");
  }
  return context;
}
