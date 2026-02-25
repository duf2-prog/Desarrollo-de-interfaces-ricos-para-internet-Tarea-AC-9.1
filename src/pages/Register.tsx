import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { userService } from "../services/userService";
import { FormattedMessage } from "react-intl";

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await authService.signUp(email, password);
            console.log("Usuario registrado:", userCredential.user);
            await userService.setUserRoles(userCredential.user.uid, {
                email: userCredential.user.email,
                roles: { admin: false }
            });

            setSuccess("Registro exitoso. Redirigiendo al menú...");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error: any) {
            console.error("Error al registrarse:", error);
            setError(error.message);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <form
                className="w-full max-w-sm bg-white shadow-md rounded-lg px-6 py-6 space-y-4"
                onSubmit={handleRegister}
            >
                <h2 className="text-xl font-semibold text-center mb-2">
                    <FormattedMessage id="app.register" />
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
                    <FormattedMessage id="app.register" />
                </button>

                {error && (
                    <p className="text-xs text-red-600 mt-2 text-center">{error}</p>
                )}
                {success && (
                    <p className="text-xs text-emerald-600 mt-2 text-center">
                        {success}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Register;
