import { createContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "../services/AuthService";
import type { Role } from "../entities/entities";

interface AuthContextProps {
    user: any | null;
    roles: Role[] | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({ user: null, roles: null });

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [roles, setRoles] = useState<Role[] | null>(null);
  
    useEffect(() => {      
        const unsubscribe = authService.onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    const userRoles = await authService.getUserRoles(currentUser);
                    setRoles(userRoles);
                } catch (error) {
                    console.error('Error al obtener los roles:', error);
                    setRoles(null);
                }
            } else {
                setRoles(null);
            }
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, roles }}>
            { children }
        </AuthContext.Provider>
    );
};