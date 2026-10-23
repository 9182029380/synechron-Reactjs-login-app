import {
    createContext,
    useContext,
    useState,
} from "react";

import {
    normalizeEmail,
    validateEmail,
    getPasswordError,
} from "../utils/validation";

const AuthContext = createContext(null);

const USERS_KEY = "training_app_users";
const SESSION_KEY = "training_app_session";

function readUsers() {
    try {
        const data = JSON.parse(
            localStorage.getItem(USERS_KEY) || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function readSession() {
    try {
        const session = JSON.parse(
            localStorage.getItem(SESSION_KEY) || "null"
        );

        if (
            session &&
            Number.isFinite(session.id) &&
            ["admin", "user"].includes(session.role) &&
            typeof session.name === "string" &&
            typeof session.email === "string"
        ) {
            const matchingUser = readUsers().find(
                (item) =>
                    item.id === session.id &&
                    item.role === session.role &&
                    item.email === normalizeEmail(session.email)
            );

            if (matchingUser) {
                return {
                    id: matchingUser.id,
                    name: matchingUser.name,
                    email: matchingUser.email,
                    role: matchingUser.role,
                };
            }
        }
    } catch {
        // Invalid session data is treated as logged out.
    }

    localStorage.removeItem(SESSION_KEY);
    return null;
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(readSession);

    function startSession(account) {
        const sessionUser = {
            id: account.id,
            name: account.name,
            email: account.email,
            role: account.role,
        };

        localStorage.setItem(
            SESSION_KEY,
            JSON.stringify(sessionUser)
        );

        setUser(sessionUser);
        return sessionUser;
    }

    function signup(name, email, password) {
        const cleanName = name.trim();
        const cleanEmail = normalizeEmail(email);

        if (!cleanName || !cleanEmail || !password) {
            return {
                success: false,
                message: "All fields are required.",
            };
        }

        if (!validateEmail(cleanEmail)) {
            return {
                success: false,
                message: "Enter a valid email address.",
            };
        }

        const passwordError = getPasswordError(password);

        if (passwordError) {
            return { success: false, message: passwordError };
        }

        const users = readUsers();

        const duplicate = users.some(
            (item) =>
                normalizeEmail(item.email) === cleanEmail
        );

        if (duplicate) {
            return {
                success: false,
                message: "This email is already registered.",
            };
        }

        const newUser = {
            id: Date.now(),
            name: cleanName,
            email: cleanEmail,
            password,
            role: "user",
        };

        users.push(newUser);
        saveUsers(users);

        startSession(newUser);

        return { success: true };
    }

    function login(email, password, expectedRole) {
        const cleanEmail = normalizeEmail(email);

        if (!cleanEmail || !password) {
            return {
                success: false,
                message: "Email and password are required.",
            };
        }

        if (!validateEmail(cleanEmail)) {
            return {
                success: false,
                message: "Enter a valid email address.",
            };
        }

        const account = readUsers().find(
            (item) =>
                normalizeEmail(item.email) === cleanEmail &&
                item.password === password &&
                item.role === expectedRole
        );

        if (!account) {
            return {
                success: false,
                message: "Invalid credentials or incorrect login type.",
            };
        }

        startSession(account);

        return { success: true };
    }

    function logout() {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
    }

    function resetPassword(email, newPassword) {
        const cleanEmail = normalizeEmail(email);

        if (!validateEmail(cleanEmail)) {
            return {
                success: false,
                message: "Enter a valid email address.",
            };
        }

        const passwordError = getPasswordError(newPassword);

        if (passwordError) {
            return { success: false, message: passwordError };
        }

        const users = readUsers();

        const index = users.findIndex(
            (item) =>
                normalizeEmail(item.email) === cleanEmail &&
                item.role === "user"
        );

        if (index === -1) {
            return {
                success: false,
                message: "No registered user found with this email.",
            };
        }

        users[index] = {
            ...users[index],
            password: newPassword,
        };

        saveUsers(users);

        return { success: true };
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                login,
                logout,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}