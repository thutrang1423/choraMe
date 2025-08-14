import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface LoginInputs {
  username: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: LoginInputs) => Promise<void>;
  logout: () => void;
  isAuthorized: (AllowedRoles: string[]) => boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  logout: () => {},
  isAuthorized: () => false,
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (inputs: LoginInputs) => {
    try {
      const res = await axios.post<User>(
        "http://localhost:3000/auth/login",
        inputs,
        { withCredentials: true }
      );
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    axios
      .post("http://localhost:3000/auth/logout", {}, { withCredentials: true })
      .catch((err) => console.error("Logout API error:", err));
  };

  //check quyền
  const isAuthorized = (AllowedRoles: string[]) => {
    if (!currentUser?.role) return false;
    return AllowedRoles.includes(currentUser.role);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<User>("http://localhost:3000/auth", {
          withCredentials: true,
        });
        setCurrentUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (error) {
        console.warn("Token hết hạn hoặc chưa đăng nhập");
        setCurrentUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, isAuthorized, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
