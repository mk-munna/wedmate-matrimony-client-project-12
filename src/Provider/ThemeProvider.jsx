import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const themeFromLocalStorage = localStorage.getItem("theme")
    const [theme, setTheme] = useState(themeFromLocalStorage);

    useEffect(() => {
        if (theme) {
            // save theme to local storage
            localStorage.setItem("theme", "true");
            document.querySelector("html").classList.add("dark")
        } else {
            localStorage.removeItem("theme");
            document.querySelector("html").classList.remove("dark")
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
