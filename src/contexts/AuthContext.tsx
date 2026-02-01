
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "student" | "researcher";
    avatar?: string;
    savedItems?: string[]; // IDs of saved archives
}

interface AuthContextType {
    user: User | null;
    login: (email: string, role: "admin" | "student" | "researcher") => void;
    logout: () => void;
    toggleSave: (itemId: string) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Initialize from localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem("iarchive_user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (email: string, role: "admin" | "student" | "researcher") => {
        const newUser: User = {
            id: "u123",
            name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
            email,
            role,
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email,
            savedItems: []
        };
        setUser(newUser);
        localStorage.setItem("iarchive_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("iarchive_user");
    };

    const toggleSave = (itemId: string) => {
        if (!user) return;

        const currentSaved = user.savedItems || [];
        const isSaved = currentSaved.includes(itemId);

        const newSaved = isSaved
            ? currentSaved.filter(id => id !== itemId)
            : [...currentSaved, itemId];

        const updatedUser = { ...user, savedItems: newSaved };
        setUser(updatedUser);
        localStorage.setItem("iarchive_user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, toggleSave, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
