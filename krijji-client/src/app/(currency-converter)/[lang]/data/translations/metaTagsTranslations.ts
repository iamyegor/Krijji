import LanguageCode from "@/app/(currency-converter)/[lang]/types/LanguageCode";

const metaTags: { [lang: string]: MetaTag } = {
    en: {
        lang: "en",
        openGraph: {
            title: "Сurrency converter | Krijji",
            description:
                "Krijji is a convenient app for fast and accurate currency and cryptocurrency conversion.",
            url: process.env.url + "en",
            locale: "en_US",
            image: "",
        },
        twitter: {
            card: "summary_large_image",
            site: process.env.url + "en",
            title: "Сurrency converter | Krijji",
            description:
                "Krijji is a convenient app for fast and accurate currency and cryptocurrency conversion.",
            image: "",
        },
        title: "Сurrency converter | Krijji",
        description:
            "Krijji is a convenient app for fast and accurate currency and cryptocurrency conversion.",
    },
    zh: {
        lang: "zh",
        openGraph: {
            title: "货币转换器 | Krijji",
            description: "Krijji 是一款方便的应用程序，用于快速准确地计算货币和加密货币的转换。",
            url: process.env.url + "zh",
            locale: "zh_CN",
            image: "",
        },
        twitter: {
            card: "summary_large_image",
            site: process.env.url + "zh",
            title: "货币转换器 | Krijji",
            description: "Krijji 是一款方便的应用程序，用于快速准确地计算货币和加密货币的转换。",
            image: "",
        },
        title: "货币转换器 | Krijji",
        description: "Krijji 是一款方便的应用程序，用于快速准确地计算货币和加密货币的转换。",
    },
    fr: {
        lang: "fr",
        openGraph: {
            title: "Currency converter | Krijji",
            description:
                "Krijji est une application pratique pour le calcul rapide et précis de la conversion de devises et de cryptomonnaies.",
            url: process.env.url + "fr",
            locale: "fr_FR",
            image: "",
        },
        twitter: {
            card: "summary_large_image",
            site: process.env.url + "fr",
            title: "Currency converter | Krijji",
            description:
                "Krijji est une application pratique pour le calcul rapide et précis de la conversion de devises et de cryptomonnaies.",
            image: "",
        },
        title: "Currency converter | Krijji",
        description:
            "Krijji est une application pratique pour le calcul rapide et précis de la conversion de devises et de cryptomonnaies.",
    },
    es: {
        lang: "es",
        openGraph: {
            title: "Convertidor de moneda | Krijji",
            description:
                "Krijji es una aplicación conveniente para el cálculo rápido y preciso del intercambio de monedas y criptomonedas.",
            url: process.env.url + "es",
            locale: "es_ES",
            image: "",
        },
        twitter: {
            card: "summary_large_image",
            site: process.env.url + "es",
            title: "Convertidor de moneda | Krijji",
            description:
                "Krijji es una aplicación conveniente para el cálculo rápido y preciso del intercambio de monedas y criptomonedas.",
            image: "",
        },
        title: "Convertidor de moneda | Krijji",
        description:
            "Krijji es una aplicación conveniente para el cálculo rápido y preciso del intercambio de monedas y criptomonedas.",
    },
    de: {
        lang: "de",
        openGraph: {
            title: "Währungsumrechner | Krijji",
            description:
                "Krijji ist eine benutzerfreundliche App für die schnelle und genaue Berechnung des Währungs- und Kryptowährungstauschs.",
            url: process.env.url + "de",
            locale: "de_DE",
            image: "",
        },
        twitter: {
            card: "summary_large_image",
            site: process.env.url + "de",
            title: "Währungsumrechner | Krijji",
            description:
                "Krijji ist eine benutzerfreundliche App für die schnelle und genaue Berechnung des Währungs- und Kryptowährungstauschs.",
            image: "",
        },
        title: "Währungsumrechner | Krijji",
        description:
            "Krijji ist eine benutzerfreundliche App für die schnelle und genaue Berechnung des Währungs- und Kryptowährungstauschs.",
    },
    ru: {
        lang: "ru",
        openGraph: {
            title: "Валютный калькулятор онлайн | Krijji",
            description:
                "Krijji — это удобное приложение для быстрого и точного расчета обмена валют и криптовалют.",
            url: process.env.url + "ru",
            locale: "ru_RU",
            image: "",
        },
        twitter: {
            card: "summary_large_image",
            site: process.env.url + "ru",
            title: "Валютный калькулятор онлайн | Krijji",
            description:
                "Krijji — это удобное приложение для быстрого и точного расчета обмена валют и криптовалют.",
            image: "",
        },
        title: "Валютный калькулятор онлайн | Krijji",
        description:
            "Krijji — это удобное приложение для быстрого и точного расчета обмена валют и криптовалют.",
    },
};

type MetaTag = {
    lang: LanguageCode;
    openGraph: OpenGraph;
    twitter: TwitterTag;
    title: string;
    description: string;
};

type OpenGraph = {
    title: string;
    description: string;
    url: string;
    image: string;
    locale: string;
};

type TwitterTag = {
    card: "summary_large_image";
    site: string;
    title: string;
    description: string;
    image: string;
};

export function getMetaTagsTranslation(language: LanguageCode): MetaTag {
    return metaTags[language];
}
