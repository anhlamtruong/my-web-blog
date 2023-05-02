import { createContext, useContext, useState, useEffect } from "react";
// Import your Firebase auth instance
import { User } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
interface AuthContextProps {
  user: User | null;
  loading: boolean;
}
interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
