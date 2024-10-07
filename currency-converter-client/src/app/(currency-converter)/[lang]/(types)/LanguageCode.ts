type LanguageCode = "en" | "es" | "zh" | "de" | "fr" | "ru";

export default LanguageCode;

export function isValidLanguageCode(lang: string): lang is LanguageCode {
    return ['en', 'es', 'zh', 'de', 'fr', 'ru'].includes(lang);
}