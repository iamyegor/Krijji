export const translations = [
    {
        lang: "en",
        title: "CURRENCY ",
        emphasisedTitle: "CONVERTER",
        description:
            "Effortlessly convert fiat and crypto currencies with our fast and accurate tool.",
        exchange: {
            title: "Exchange",
            subtitle: "Rates",
        },
        crypto: {
            title: "Crypto",
            subtitle: "Currencies",
        },
        amount: "Amount",
        convertedTo: "Converted to",
        rateLastUpdated: "Rate last updated at",
    },
    {
        lang: "zh",
        title: "货币转换",
        emphasisedTitle: "器",
        description: "使用我们快速准确的工具轻松转换法币和加密货币。",
        exchange: {
            title: "兑换",
            subtitle: "汇率",
        },
        crypto: {
            title: "加密",
            subtitle: "货币",
        },
        amount: "金额",
        convertedTo: "转换为",
        rateLastUpdated: "汇率最后更新于",
    },
    {
        lang: "fr",
        title: "CONVERTISSEUR DE ",
        emphasisedTitle: "DEVISES",
        description:
            "Convertissez sans effort les monnaies fiduciaires et crypto avec notre outil rapide et précis.",
        exchange: {
            title: "Échange",
            subtitle: "Taux",
        },
        crypto: {
            title: "Cryptomonnaies", // Fixed here
            subtitle: "",
        },
        amount: "Montant",
        convertedTo: "Converti en",
        rateLastUpdated: "Dernière mise à jour du taux à",
    },
    {
        lang: "es",
        title: "CONVERSOR DE ",
        emphasisedTitle: "MONEDAS",
        description:
            "Convierte sin esfuerzo monedas fiduciarias y criptomonedas con nuestra herramienta rápida y precisa.",
        exchange: {
            title: "Cambio",
            subtitle: "Tasas",
        },
        crypto: {
            title: "Cripto",
            subtitle: "Monedas",
        },
        amount: "Cantidad",
        convertedTo: "Convertido a",
        rateLastUpdated: "Última actualización de la tasa a las",
    },
    {
        lang: "de",
        title: "WÄHRUNGS",
        emphasisedTitle: "RECHNER",
        description:
            "Konvertieren Sie mühelos Fiat- und Kryptowährungen mit unserem schnellen und genauen Tool.",
        exchange: {
            title: "Umtausch",
            subtitle: "Kurse",
        },
        crypto: {
            title: "Krypto",
            subtitle: "Währungen",
        },
        amount: "Betrag",
        convertedTo: "Umgerechnet in",
        rateLastUpdated: "Letzte Kursaktualisierung um",
    },
    {
        lang: "ru",
        title: "КОНВЕРТЕР ",
        emphasisedTitle: "ВАЛЮТ",
        description:
            "Легко конвертируйте фиатные и криптовалюты с помощью нашего быстрого и точного инструмента.",
        exchange: {
            title: "Курсы",
            subtitle: "валют",
        },
        crypto: {
            title: "Крипто",
            subtitle: "валюты",
        },
        amount: "Сумма",
        convertedTo: "Конвертировано в",
        rateLastUpdated: "Последнее обновление курса в",
    },
];

export type Translation = (typeof translations)[0];
