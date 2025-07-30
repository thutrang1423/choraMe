import {createContext, useState, useEffect, ReactNode} from "react";
import axios from "axios";

export interface User {
    id: string;
    username: string;
    email: string;
    role?: string;
}

export interface LoginInputs {
    username: string;
    password: string;
}

interface AuthContextType {
    currentUser: User | null;
    login: (inputs: LoginInputs) => Promise<void>;
    logout:() => void;
}

export const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    login: async () => {},
    logout:() => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContextProvider = ({children}: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    const login = async(inputs: LoginInputs): Promise<void> => {
        try{
            const res = await axios.post<User>(
                "http://localhost:3000/auth/login",
                inputs,
                {withCredentials: true}
            );
            setCurrentUser(res.data);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
