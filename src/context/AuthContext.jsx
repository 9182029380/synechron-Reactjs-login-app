import {
    createContext,
    useContext,
    useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("loggedInUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    function signup(name, email, password) {
        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        const existingUser = users.find(
            (item) => item.email === email
        );

        if (existingUser) {
            return {
                success: false,
                message: "Email already registered.",
            };
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        const loggedInUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        };

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);

        return { success: true };
    }

    function login(email, password) {
        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        const foundUser = users.find(
            (item) =>
                item.email === email &&
                item.password === password
        );

        if (!foundUser) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        const loggedInUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
        };

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(loggedInUser)
        );

        setUser(loggedInUser);

        return { success: true };
    }

    function logout() {
        localStorage.removeItem("loggedInUser");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{ user, signup, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}