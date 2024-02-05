"use client";

import React, { useEffect, useContext } from "react";

export const ThemeContext = React.createContext({});

export const ThemeProvider = ({ children }) => {


  const storedColor = typeof window !== "undefined" ? localStorage.getItem("color") : null;

  const defaultColor = "green"; // Set your default color here

  const [theme, setTheme] = React.useState({
    primary: storedColor !== "undefined" ? storedColor : defaultColor,
  });

  useEffect(() => {
    const style = document.documentElement.style;
    style.setProperty("--primary", theme.primary ?? defaultColor);
  }, [theme, defaultColor]);

  useEffect(() => {
    const storedColor = localStorage.getItem("color");
    if (storedColor && storedColor !== theme.primary) {
      setTheme((prevTheme) => ({
        ...prevTheme,
        primary: storedColor !== "undefined" ? storedColor : defaultColor,
      }));
    }
  }, [theme.primary, defaultColor]);





  // const storedColor = typeof window !== "undefined" ? localStorage.getItem("color") : null;

  // const [customTheme, setCustomTheme] = React.useState({
  //   primary: storedColor || "red",
  // });

  // useEffect(() => {
  //   const style = document.documentElement.style;
  //   style.setProperty("--primary", customTheme.primary ?? "red");
  //   setCustomTheme({ primary: storedColor || "red" });

  // }, [customTheme]);

  // useEffect(() => {
  //   const storedColor = localStorage.getItem("color");
  //   if (storedColor && storedColor !== customTheme.primary) {
  //     setCustomTheme((prevTheme) => ({
  //       ...prevTheme,
  //       primary: storedColor || "green", 
  //     }));

  //   }
  // }, [customTheme.primary]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};



export const useTheme = () => useContext(ThemeContext);
