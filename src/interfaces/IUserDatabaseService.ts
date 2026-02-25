import type { Role } from "../entities/entities";

export interface IUserDatabaseService {
    getUserRoles(uid: string): Promise<Role[]>;
}