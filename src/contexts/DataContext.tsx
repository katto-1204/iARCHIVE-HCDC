import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// --- Types ---
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Inactive";
    joined: string;
}

export interface Material {
    id: string;
    title: string;
    category: string;
    date: string;
    accessLevel: "public" | "restricted";
    views: number;
}

export interface Category {
    id: number;
    name: string;
    count: number;
    items: string;
    lastUpdated: string;
}

// --- Initial Data ---
const initialUsers: User[] = [
    { id: 1, name: "Admin User", email: "admin@gmail.com", role: "Admin", status: "Active", joined: "2023-01-10" },
    { id: 2, name: "Maria Santos", email: "maria@email.com", role: "Archivist", status: "Active", joined: "2023-05-15" },
    { id: 3, name: "Jose Garcia", email: "jose@email.com", role: "Researcher", status: "Inactive", joined: "2023-08-20" },
    { id: 4, name: "Ana Reyes", email: "ana@email.com", role: "Student", status: "Active", joined: "2023-10-05" },
    { id: 5, name: "Juan Dela Cruz", email: "juan@email.com", role: "Student", status: "Active", joined: "2023-11-12" },
];

const initialMaterials: Material[] = [
    { id: "1", title: "Class of 2023 Yearbook", category: "Yearbooks", date: "2023-12-15", accessLevel: "public", views: 245 },
    { id: "2", title: "Campus Centennial Photo Collection", category: "Photographs", date: "2023-11-20", accessLevel: "public", views: 120 },
    { id: "3", title: "Research Journal Volume 15", category: "Publications", date: "2023-10-01", accessLevel: "public", views: 89 },
    { id: "4", title: "Founding Charter Documents", category: "Documents", date: "1950-01-15", accessLevel: "restricted", views: 34 },
    { id: "5", title: "Class of 2022 Yearbook", category: "Yearbooks", date: "2022-12-15", accessLevel: "public", views: 156 },
    { id: "6", title: "Sports Championship Gallery", category: "Photographs", date: "2023-08-10", accessLevel: "public", views: 92 },
];

const initialCategories: Category[] = [
    { id: 1, name: "Yearbooks", count: 45, items: "Graduation photos, student lists", lastUpdated: "2023-12-15" },
    { id: 2, name: "Photographs", count: 1250, items: "Campus events, historical landmarks", lastUpdated: "2023-11-20" },
    { id: 3, name: "Publications", count: 85, items: "Research journals, newsletters", lastUpdated: "2023-10-01" },
    { id: 4, name: "Documents", count: 320, items: "Administrative records, charters", lastUpdated: "2023-09-15" },
    { id: 5, name: "Memorabilia", count: 120, items: "Institutional artifacts, awards", lastUpdated: "2023-08-10" },
];

// --- Context Definition ---
interface DataContextType {
    users: User[];
    addUser: (user: Omit<User, "id">) => void;
    updateUser: (id: number, user: Partial<Omit<User, "id">>) => void;
    deleteUser: (id: number) => void;

    materials: Material[];
    addMaterial: (material: Omit<Material, "id">) => void;
    updateMaterial: (id: string, material: Partial<Omit<Material, "id">>) => void;
    deleteMaterial: (id: string) => void;

    categories: Category[];
    addCategory: (category: Omit<Category, "id">) => void;
    updateCategory: (id: number, category: Partial<Omit<Category, "id">>) => void;
    deleteCategory: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// --- Helper to load from localStorage ---
function loadFromStorage<T>(key: string, fallback: T): T {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
}

// --- Provider ---
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(() => loadFromStorage("iarchive_users", initialUsers));
    const [materials, setMaterials] = useState<Material[]>(() => loadFromStorage("iarchive_materials", initialMaterials));
    const [categories, setCategories] = useState<Category[]>(() => loadFromStorage("iarchive_categories", initialCategories));

    // Persist to localStorage
    useEffect(() => { localStorage.setItem("iarchive_users", JSON.stringify(users)); }, [users]);
    useEffect(() => { localStorage.setItem("iarchive_materials", JSON.stringify(materials)); }, [materials]);
    useEffect(() => { localStorage.setItem("iarchive_categories", JSON.stringify(categories)); }, [categories]);

    // --- User CRUD ---
    const addUser = (user: Omit<User, "id">) => {
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        setUsers([...users, { ...user, id: newId }]);
    };
    const updateUser = (id: number, data: Partial<Omit<User, "id">>) => {
        setUsers(users.map(u => u.id === id ? { ...u, ...data } : u));
    };
    const deleteUser = (id: number) => {
        setUsers(users.filter(u => u.id !== id));
    };

    // --- Material CRUD ---
    const addMaterial = (material: Omit<Material, "id">) => {
        const newId = (materials.length > 0 ? Math.max(...materials.map(m => parseInt(m.id))) + 1 : 1).toString();
        setMaterials([...materials, { ...material, id: newId }]);
    };
    const updateMaterial = (id: string, data: Partial<Omit<Material, "id">>) => {
        setMaterials(materials.map(m => m.id === id ? { ...m, ...data } : m));
    };
    const deleteMaterial = (id: string) => {
        setMaterials(materials.filter(m => m.id !== id));
    };

    // --- Category CRUD ---
    const addCategory = (category: Omit<Category, "id">) => {
        const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
        setCategories([...categories, { ...category, id: newId }]);
    };
    const updateCategory = (id: number, data: Partial<Omit<Category, "id">>) => {
        setCategories(categories.map(c => c.id === id ? { ...c, ...data } : c));
    };
    const deleteCategory = (id: number) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    return (
        <DataContext.Provider value={{
            users, addUser, updateUser, deleteUser,
            materials, addMaterial, updateMaterial, deleteMaterial,
            categories, addCategory, updateCategory, deleteCategory,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
