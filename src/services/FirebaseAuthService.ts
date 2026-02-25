import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./firebaseConfig";
import { type IAuthService } from "../interfaces/IAuthServices";
import { Role } from "../entities/entities";
import { FirebaseDatabaseService } from "./FirebaseDatabaseService";

const auth = getAuth(app);

export class FirebaseAuthService implements IAuthService {
    private databaseService: FirebaseDatabaseService;

    constructor() {
        this.databaseService = new FirebaseDatabaseService();
    }

    signIn(email: string, password: string): Promise<any> {
        return signInWithEmailAndPassword(auth, email, password);
    }

    signUp(email: string, password: string): Promise<any> {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    signOut(): Promise<void> {
        return signOut(auth);
    }

    onAuthStateChanged(callback: (user: any) => void): () => void {
        return onAuthStateChanged(auth, callback);
    }

    getCurrentUser(): any | null {
        return auth.currentUser;
    }

    async getUserRoles(user: any): Promise<Role[]> {
        if (user.email === 'duf2@alu.ua.es') {
            return [Role.ADMIN];
        }
        return this.databaseService.getUserRoles(user.uid);
    }
}