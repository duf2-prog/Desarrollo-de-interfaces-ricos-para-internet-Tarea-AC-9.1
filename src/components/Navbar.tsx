import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/AuthService";
import { Role } from "../entities/entities";
import { FormattedMessage } from "react-intl";
import { LanguageContext } from "../contexts/LangContext";

const Navbar: React.FC = () => {
    const { user, roles } = useContext(AuthContext);
    const navigate = useNavigate();
    const { changeLanguage, locale } = useContext(LanguageContext);

    const handleLogout = async () => {
        try {
            await authService.signOut();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <nav className="bg-slate-800 text-white">
            <ul className="max-w-6xl mx-auto flex items-center gap-4 px-4 py-3">
                <li>
                    <Link
                        to="/"
                        className="hover:text-emerald-300 transition text-sm font-medium"
                    >
                        <FormattedMessage id="app.menu" />
                    </Link>
                </li>

                {user && (
                    <li>
                        <Link
                            to="/cart"
                            className="hover:text-emerald-300 transition text-sm font-medium"
                        >
                            <FormattedMessage id="app.cart" />
                        </Link>
                    </li>
                )}

                {user && roles && roles.includes(Role.ADMIN) && (
                    <>
                        <li>
                            <Link
                                to="/stock"
                                className="hover:text-emerald-300 transition text-sm font-medium"
                            >
                                <FormattedMessage id="app.stock" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/users"
                                className="hover:text-emerald-300 transition text-sm font-medium"
                            >
                                <FormattedMessage id="app.users" />
                            </Link>
                        </li>
                    </>
                )}

                {!user && (
                    <>
                        <li>
                            <Link
                                to="/login"
                                className="hover:text-emerald-300 transition text-sm font-medium"
                            >
                                <FormattedMessage id="app.login" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="hover:text-emerald-300 transition text-sm font-medium"
                            >
                                <FormattedMessage id="app.register" />
                            </Link>
                        </li>
                    </>
                )}

                {user && (
                    <li className="ml-auto">
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 rounded bg-red-500 text-xs font-medium hover:bg-red-600 transition"
                        >
                            <FormattedMessage id="app.logout" />
                        </button>
                    </li>
                )}

                <li className={user ? "" : "ml-auto"}>
                    <select
                        id="language-select"
                        onChange={(e) => changeLanguage(e.target.value)}
                        value={locale}
                        className="bg-slate-700 border border-slate-600 text-xs rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                        <option value="en">
                            <FormattedMessage id="app.english" />
                        </option>
                        <option value="es">
                            <FormattedMessage id="app.spanish" />
                        </option>
                    </select>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
