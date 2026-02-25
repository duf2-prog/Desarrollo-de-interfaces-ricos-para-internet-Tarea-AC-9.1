import { useEffect, useState } from "react";
import { FirebaseDatabaseService } from "../services/FirebaseDatabaseService";
import { FormattedMessage } from "react-intl";

const dbService = new FirebaseDatabaseService();

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            const data = await dbService.getAllUsers();
            setUsers(data);
            setLoading(false);
        };

        loadUsers();
    }, []);

    const toggleRole = async (uid: string, currentRole: boolean) => {
        await dbService.setUserRole(uid, !currentRole);

        setUsers(prev =>
            prev.map(u =>
                u.uid === uid ? { ...u, roles: { admin: !currentRole } } : u
            )
        );
    };

    if (loading) {
        return (
            <p className="mt-6 text-center text-gray-600">
                <FormattedMessage id="app.loadingUsers" />
            </p>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-8 px-4">
            <h2 className="text-xl font-semibold mb-4">
                <FormattedMessage id="app.userManagment" />
            </h2>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">
                                <FormattedMessage id="app.email" />
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">
                                <FormattedMessage id="app.userRol" />
                            </th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700">
                                <FormattedMessage id="app.userAction" />
                            </th>
                            <th className="px-4 py-2" />
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.uid} className="border-t">
                                <td className="px-4 py-2">{user.email}</td>
                                <td
                                    className={`px-4 py-2 font-semibold ${
                                        user.roles?.admin
                                            ? "text-emerald-700"
                                            : "text-slate-700"
                                    }`}
                                >
                                    {user.roles?.admin ? "ADMIN" : "USER"}
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        className={`px-3 py-1 rounded text-xs font-medium text-white transition ${
                                            user.roles?.admin
                                                ? "bg-amber-500 hover:bg-amber-600"
                                                : "bg-emerald-600 hover:bg-emerald-700"
                                        }`}
                                        onClick={() => toggleRole(user.uid, user.roles?.admin)}
                                    >
                                        {user.roles?.admin ? (
                                            <FormattedMessage id="app.userQuitAdmin" />
                                        ) : (
                                            <FormattedMessage id="app.userDoAdmin" />
                                        )}
                                    </button>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        className="px-3 py-1 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition"
                                        onClick={() => {
                                            dbService.deleteUser(user.uid);
                                            setUsers(prev =>
                                                prev.filter(u => u.uid !== user.uid)
                                            );
                                        }}
                                    >
                                        <FormattedMessage id="app.delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
