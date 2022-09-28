import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/user.interface";
import { useLocalStorage } from "./useLocalStorage";

export interface UseAuthProvider {
    user: User | null;
    login?(data: User): void;
    logout?(): void;
}

export const AuthContext = createContext<UseAuthProvider>({
    user: null
});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (data: User) => {
        setUser(data);
        if (data.role === 'admin' || data.role === 'superAdmin') {
            navigate("/auth/admin/dashboard", { replace: true });
        }
        if (data.role === 'user') {
            navigate("/auth/staff/dashboard", { replace: true });
        }
    };

    const logout = () => {
        setUser(null);
        navigate("/login", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

};

export const useAuth = () => {
    return useContext(AuthContext);
};
