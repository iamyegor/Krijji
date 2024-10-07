"use client";

import { ThemeNames } from "@/app/(currency-converter)/[lang]/data/translations/themeTranslations";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

// Assuming these are your SVG components
import Theme from "@/app/(currency-converter)/[lang]/types/Theme";
import MoonSvg from "@/assets/themes/moon.svg";
import SunSvg from "@/assets/themes/sun.svg";

export default function ThemeSwitcher({
    selectedTheme,
    themeNames,
}: {
    selectedTheme: Theme | null;
    themeNames: ThemeNames;
}) {
    const [theme, setTheme] = useState<Theme>(selectedTheme ?? "dark");

    const toggleTheme = () => {
        const newTheme: Theme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);

        document.cookie = `theme=${newTheme}; path=/`;

        document.body.classList.remove("dark", "light");
        document.body.classList.add(newTheme);
    };

    function getThemeIcon(currentTheme: Theme) {
        return currentTheme === "light" ? (
            <motion.div
                key="sun"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <SunSvg className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
        ) : (
            <motion.div
                key="moon"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <MoonSvg className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
        );
    }

    return (
        <Button
            className="flex items-center space-x-2 cursor-pointer !rounded-lg overflow-hidden hover:!bg-txt/10 !text-txt"
            onClick={toggleTheme}
            variant="ghost"
        >
            <AnimatePresence mode="wait">{getThemeIcon(theme)}</AnimatePresence>
            <span className="text-[16px] sm:text-[18px] capitalize">{themeNames[theme]}</span>
        </Button>
    );
}
