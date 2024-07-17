import { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
    login: string;
    name: string;
    role: string;
}

export interface AuthContextProps {
    user: User | null;
    authenticated: boolean;
    login: (login: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const login = localStorage.getItem('login');

        if (login) {
            const name = localStorage.getItem('name') || '';
            const role = localStorage.getItem('role') || '';
            setUser({ login, name, role });
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    const login = async (login: string, password: string) => {
        try {
            const response = await api.post('/login', { login, password });
            const userData: User = {
                login: response.data.login,
                name: response.data.name,
                role: response.data.role
            };
            localStorage.setItem('login', userData.login);
            localStorage.setItem('name', userData.name);
            localStorage.setItem('role', userData.role);
            setUser(userData);
            setAuthenticated(true);
        } catch (error) {
            // Aqui você pode lidar com o erro de login, por exemplo, exibir uma mensagem de erro
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    }

    const logout = () => {
        localStorage.removeItem('login');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        setUser(null);
        setAuthenticated(false);
    }

    if (loading) {
        return <h1>Carregando...</h1>
    }

    return (
        <AuthContext.Provider value={{ user, authenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
