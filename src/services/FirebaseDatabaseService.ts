import { get, getDatabase, ref, remove, update } from "firebase/database";
import { Role } from "../entities/entities";
import type { IUserDatabaseService } from "../interfaces/IUserDatabaseService";
import { app } from "./firebaseConfig";

export class FirebaseDatabaseService implements IUserDatabaseService {
    
    async getUserRoles(uid: string): Promise<Role[]> {
        const db = getDatabase(app);
        const rolesRef = ref(db, `user/${uid}/roles`);
        const snapshot = await get(rolesRef);

        if(snapshot.exists()) {
            const rolesData = snapshot.val();
            const roles: Role[] = [];
            if (rolesData.admin === true) {
                roles.push(Role.ADMIN);
            }

            if (roles.length === 0) {
                roles.push(Role.USER);
            }
            return roles;
        }
        return [Role.USER];     
    }

    async getAllUsers() : Promise<any[]> {
        const db = getDatabase(app);
        const usersRef = ref(db, 'user');
        const snapshot = await get(usersRef);
        const data = snapshot.val();

        if(!data) return [];

        return Object.entries(data).map(([uid, userData]: any) => ({
            uid,
            email: userData.email,
            roles: userData.roles
        }));
    }   

    async setUserRole(uid: string, isAdmin: boolean): Promise<void> {

        const db = getDatabase(app);
        const rolesRef = ref(db, `user/${uid}/roles`);
        await update(rolesRef, { admin: isAdmin });    
    }

    async deleteUser(uid: string): Promise<void> {
        const db = getDatabase(app);
        const userRef = ref(db, `user/${uid}`);
        await remove(userRef);
    }
}