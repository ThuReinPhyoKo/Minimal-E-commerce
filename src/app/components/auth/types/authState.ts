import { UserDetails } from "../user/userDetail"

export interface AuthState {
    user: typeof UserDetails | null;
    isAuthenticated: boolean;
    login: (user: typeof UserDetails) => void;
    logout: () => void;
}