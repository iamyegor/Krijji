"use client";

import DeFlagImg from "@/assets/flags/de.svg";
import EnFlagImg from "@/assets/flags/en.svg";
import EsFlagImg from "@/assets/flags/es.svg";
import FrFlagImg from "@/assets/flags/fr.svg";
import RuFlagImg from "@/assets/flags/ru.svg";
import ZhFlagImg from "@/assets/flags/zh.svg";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Language {
    code: string;
    nativeName: string;
    flag: React.FC<React.SVGProps<SVGSVGElement>>;
}

const languages: Language[] = [
    { code: "en", nativeName: "English", flag: EnFlagImg },
    { code: "zh", nativeName: "中文", flag: ZhFlagImg },
    { code: "es", nativeName: "Español", flag: EsFlagImg },
    { code: "fr", nativeName: "Français", flag: FrFlagImg },
    { code: "ru", nativeName: "Русский", flag: RuFlagImg },
    { code: "de", nativeName: "Deutsch", flag: DeFlagImg },
];

interface LanguageSwitcherProps {
    selectedLanguage?: string | null;
}

export default function LanguageSwitcher({ selectedLanguage = null }: LanguageSwitcherProps) {
    const router = useRouter();
    const [currentLanguage, setCurrentLanguage] = useState<string>(selectedLanguage || "en");

    useEffect(() => {
        document.documentElement.lang = currentLanguage;
    }, [currentLanguage]);

    const handleLanguageChange = (languageCode: string) => {
        setCurrentLanguage(languageCode);
        setCookie("preferredLanguage", languageCode, { maxAge: 30 * 24 * 60 * 60 });
        router.push(`/${languageCode}`);
    };

    return (
        <div>
            <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="!bg-transparent space-x-2">
                    <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                    {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                            <div className="flex items-center space-x-2">
                                <lang.flag className="rounded-full flex-shrink-0 w-5 h-5" />
                                <span className="text-[16px] sm:text-[18px] text-txt">
                                    {lang.nativeName}
                                </span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
