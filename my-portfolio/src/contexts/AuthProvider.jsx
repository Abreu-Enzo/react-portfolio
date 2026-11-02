import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getSession, onAuthChange } from "../services/authService";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ status: "loading", session: null });

  useEffect(() => {
    let ignore = false;
    let unsubscribe = null;

    getSession()
      .then((session) => {
        if (ignore) return;
        setAuth({ status: "ready", session });
        // A partir daqui, login e logout atualizam a sessão sozinhos.
        unsubscribe = onAuthChange((newSession) => setAuth({ status: "ready", session: newSession }));
      })
      .catch(() => {
        // Supabase não configurado ou fora do ar: trata como "sem login".
        if (!ignore) setAuth({ status: "ready", session: null });
      });

    return () => {
      ignore = true;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
