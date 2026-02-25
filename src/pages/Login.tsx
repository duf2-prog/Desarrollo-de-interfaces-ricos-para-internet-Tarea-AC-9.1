import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { FormattedMessage } from "react-intl";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await authService.signIn(email, password);
            console.log("Usuario autenticado:", userCredential.user);
            navigate("/");
        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
            setError(error.message);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <form
                className="w-full max-w-sm bg-white shadow-md rounded-lg px-6 py-6 space-y-4"
                onSubmit={handleLogin}
            >
                <h2 className="text-xl font-semibold text-center mb-2">
                    <FormattedMessage id="app.login" />
                </h2>

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <button
                    type="submit"
                    className="w-full mt-2 px-4 py-2 rounded bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
                >
                    <FormattedMessage id="app.login" />
                </button>

                {error && (
                    <p className="text-xs text-red-600 mt-2 text-center">{error}</p>
                )}
            </form>
        </div>
    );
};

export default Login;
