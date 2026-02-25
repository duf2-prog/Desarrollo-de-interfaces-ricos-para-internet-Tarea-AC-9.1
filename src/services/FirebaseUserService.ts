import { get, getDatabase, ref, set, update } from "firebase/database";
import type { IUserService } from "../interfaces/IUserService";

export class FirebaseUserService implements IUserService {
    getAllUsers(): Promise<{ [uid: string]: any; }> {
        const db = getDatabase();
        return get(ref(db, 'users')).then(snapshot => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
            return {};
        });
    }

    updateUserAdminRole(uid: string, isAdmin: boolean): Promise<void> {
        const db = getDatabase();
        return update(ref(db, `users/${uid}/roles`), {admin: isAdmin });
    }

    setUserRoles(uid: string, roles: { [key: string]: any; }): Promise<void> {
        const db = getDatabase();
        return set(ref(db, `user/${uid}`), roles);
    }
}