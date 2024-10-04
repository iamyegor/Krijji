"use client";

import { useEffect } from "react";

export default function ThemeSelectProcessor() {
    useEffect(() => {
        const selectedTheme = localStorage.getItem("theme");

        if (selectedTheme) {
            document.body.classList.add(selectedTheme);
        } else if (window.matchMedia("(prefers-color-scheme: dark)")) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.add("light");
        }
    }, []);
    
    return null;
}
