import type React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Role } from "../entities/entities";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user, roles } = useContext(AuthContext);

    if (!user || !roles || !roles.includes(Role.ADMIN)) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>
};

export default AdminRoute;