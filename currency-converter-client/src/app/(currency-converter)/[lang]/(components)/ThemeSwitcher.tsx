"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MoonSvg from "@/assets/themes/moon.svg";
import SunSvg from "@/assets/themes/sun.svg";
import { Button } from "@/components/ui/button";

export default function ThemeSwitcher({ selectedTheme }: { selectedTheme: string | null }) {
    const [theme, setTheme] = useState(selectedTheme ?? "dark");

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        
        document.cookie = `theme=${newTheme}; path=/`;
        
        document.body.classList.remove("dark", "light");
        document.body.classList.add(newTheme);
    };

    return (
        <Button
            className="flex items-center space-x-4 cursor-pointer !rounded-lg overflow-hidden hover:!bg-txt/10 !text-txt"
            onClick={toggleTheme}
            variant="ghost"
        >
            <AnimatePresence mode="wait">
                {theme === "light" ? (
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
                )}
            </AnimatePresence>
            <span className="text-[16px] sm:text-[18px] capitalize">{theme}</span>
        </Button>
    );
}
