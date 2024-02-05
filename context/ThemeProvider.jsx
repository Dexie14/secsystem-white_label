"use client";

import React, { useEffect, useContext } from "react";

export const ThemeContext = React.createContext({});

export const ThemeProvider = ({ children }) => {
  const storedColor = typeof window !== "undefined" ? localStorage.getItem("color") : null;

  const [customTheme, setCustomTheme] = React.useState({
    primary: storedColor || "black",
  });

  useEffect(() => {
    const style = document.documentElement.style;
    style.setProperty("--primary", customTheme.primary);
  }, [customTheme]);

  useEffect(() => {
    const storedColor = localStorage.getItem("color");
    if (storedColor && storedColor !== customTheme.primary) {
      setCustomTheme((prevTheme) => ({
        ...prevTheme,
        primary: storedColor,
      }));

    }
  }, [customTheme.primary]);

  return (
    <ThemeContext.Provider value={customTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
