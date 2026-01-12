import React, { createContext, useState, useEffect } from 'react';
import { loadTheme, saveTheme } from './preferences';

export type ThemeContextType = {
    dark: boolean;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        loadTheme().then(value => {
            if (typeof value === 'boolean') {
                setDark(value);
            }
        });
    }, []);

    const toggleTheme = () => {
        setDark(prev => {
            saveTheme(!prev);
            return !prev;
        });
    };

    return (
        <ThemeContext.Provider value={{ dark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
