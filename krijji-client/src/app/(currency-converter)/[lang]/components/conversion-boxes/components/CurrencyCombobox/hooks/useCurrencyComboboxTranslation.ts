import { useLanguage } from "@/hooks/useLanguage";
import { useMemo } from "react";

const translations = [
    {
        locale: "en",
        searchPlaceholder: "Search for a currency...",
        noCurrenciesFound: "No currency found.",
    },
    {
        locale: "ru",
        searchPlaceholder: "Искать валюту...",
        noCurrenciesFound: "Валюта не найдена.",
    },
    {
        locale: "es",
        searchPlaceholder: "Buscar una moneda...",
        noCurrenciesFound: "No se encontró ninguna moneda.",
    },
    {
        locale: "zh",
        searchPlaceholder: "搜索货币...",
        noCurrenciesFound: "未找到货币。",
    },
    {
        locale: "de",
        searchPlaceholder: "Währung suchen...",
        noCurrenciesFound: "Keine Währung gefunden.",
    },
    {
        locale: "fr",
        searchPlaceholder: "Rechercher une devise...",
        noCurrenciesFound: "Aucune devise trouvée.",
    },
];

export default function useCurrencyComboboxTranslation() {
    const lang = useLanguage();

    return useMemo(() => {
        return translations.find((translation) => translation.locale === lang) ?? translations[0];
    }, [lang]);
}
