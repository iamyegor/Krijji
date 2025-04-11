import LanguageCode from "@/app/(currency-converter)/[lang]/types/LanguageCode";

const themeTranslations = {
    en: {
        dark: "Dark",
        light: "Light",
    },
    es: {
        dark: "Oscuro",
        light: "Claro",
    },
    zh: {
        dark: "暗色",
        light: "亮色",
    },
    de: {
        dark: "Dunkel",
        light: "Hell",
    },
    fr: {
        dark: "Sombre",
        light: "Clair",
    },
    ru: {
        dark: "Темная",
        light: "Светлая",
    },
};

export type ThemeNames = {
    dark: string;
    light: string;
};

export type ThemeTranslations = {
    [key in LanguageCode]: ThemeNames;
};

export function getThemeTranslation(language: LanguageCode): ThemeNames {
    return themeTranslations[language];
}
