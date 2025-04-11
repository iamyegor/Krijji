import { title, features } from "process";
import LanguageCode from "../../../types/LanguageCode";

interface AboutUsPageTranslation {
    title: string;
    subtitle: string;
    description: string;
    featuresTitle: string;
    features: {
        title: string;
        description: string;
    }[];
}

const aboutUsPageTranslations: Record<LanguageCode, AboutUsPageTranslation> = {
    en: {
        title: "About Us",
        subtitle: "Your Instant Currency and Crypto Conversion Companion",
        description:
            "Krijji is a convenient app for fast and accurate currency and cryptocurrency conversion. It allows users to instantly convert traditional currencies such as the US dollar, euro, ruble, and others into any cryptocurrencies, including Bitcoin, Ethereum, Litecoin, and many other digital assets. The converter supports reverse operations, allowing users to convert cryptocurrencies back into fiat money.",
        featuresTitle: "Our key features",
        features: [
            {
                title: "Currency-to-currency conversion",
                description:
                    "Easy transfer of amounts between fiat currencies with current exchange rates.",
            },
            {
                title: "Cryptocurrency to fiat conversion",
                description:
                    "Instant calculation of cryptocurrency value, such as Bitcoin or Ethereum, into traditional money.",
            },
            {
                title: "Wide range of supported currencies",
                description:
                    "A broad selection of traditional and digital currencies for conversion.",
            },
            {
                title: "Up-to-date rates",
                description:
                    "The app automatically updates currency and cryptocurrency exchange rates to ensure accurate calculations.",
            },
        ],
    },
    es: {
        title: "Sobre Nosotros",
        subtitle: "Tu Compañero Instantáneo de Conversión de Monedas y Criptomonedas",
        description:
            "Krijji es una aplicación conveniente para el cálculo rápido y preciso del intercambio de monedas y criptomonedas. Permite a los usuarios convertir instantáneamente monedas tradicionales como el dólar estadounidense, el euro, el rublo y otras, en cualquier criptomoneda, incluyendo Bitcoin, Ethereum, Litecoin y muchos otros activos digitales. El convertidor también admite operaciones inversas, permitiendo convertir criptomonedas nuevamente en dinero fiduciario.",
        featuresTitle: "Nuestras características principales",
        features: [
            {
                title: "Conversión de moneda a moneda",
                description:
                    "Fácil transferencia de montos entre monedas fiduciarias con tasas de cambio actuales.",
            },
            {
                title: "Conversión de criptomonedas a moneda fiduciaria",
                description:
                    "Cálculo instantáneo del valor de las criptomonedas, como Bitcoin o Ethereum, en dinero tradicional.",
            },
            {
                title: "Soporte para múltiples monedas",
                description: "Amplia gama de monedas tradicionales y digitales para la conversión.",
            },
            {
                title: "Tasas actualizadas",
                description:
                    "La aplicación actualiza automáticamente las tasas de cambio de monedas y criptomonedas para garantizar la precisión de los cálculos.",
            },
        ],
    },
    zh: {
        title: "关于我们",
        subtitle: "您的即时货币和加密货币转换伙伴",
        description:
            "Krijji 是一款方便的应用程序，用于快速准确地计算货币和加密货币的转换。它允许用户将美元、欧元、卢布等传统货币即时转换为包括比特币、以太坊、莱特币及其他多种数字资产在内的任何加密货币。该转换器支持反向操作，允许用户将加密货币转换回法定货币。",
        featuresTitle: "我们的主要功能",
        features: [
            {
                title: "货币对货币转换",
                description: "根据当前汇率轻松转换法定货币之间的金额。",
            },
            {
                title: "加密货币到法定货币的转换",
                description: "即时计算比特币或以太坊等加密货币的价值，并转换为传统货币。",
            },
            {
                title: "支持多种货币",
                description: "提供广泛的传统和数字货币供转换选择。",
            },
            {
                title: "最新汇率",
                description: "应用程序自动更新货币和加密货币汇率，以确保计算的准确性。",
            },
        ],
    },
    de: {
        title: "Über uns",
        subtitle: "Ihr sofortiger Begleiter für Währungs- und Krypto-Umrechnungen",
        description:
            "Krijji ist eine benutzerfreundliche App für die schnelle und genaue Berechnung des Währungs- und Kryptowährungstauschs. Sie ermöglicht es Benutzern, traditionelle Währungen wie den US-Dollar, Euro, Rubel und andere sofort in Kryptowährungen wie Bitcoin, Ethereum, Litecoin und viele andere digitale Vermögenswerte umzuwandeln. Der Konverter unterstützt auch die Umkehrung dieser Operationen, indem Kryptowährungen zurück in Fiat-Währungen umgerechnet werden können.",
        featuresTitle: "Unsere Hauptfunktionen",
        features: [
            {
                title: "Währungsumrechnung",
                description:
                    "Einfache Umrechnung von Beträgen zwischen Fiat-Währungen unter Berücksichtigung der aktuellen Wechselkurse.",
            },
            {
                title: "Umrechnung von Kryptowährungen in Fiat-Währungen",
                description:
                    "Sofortige Berechnung des Werts von Kryptowährungen wie Bitcoin oder Ethereum in traditionelles Geld.",
            },
            {
                title: "Unterstützung vieler Währungen",
                description:
                    "Große Auswahl an traditionellen und digitalen Währungen zur Umrechnung.",
            },
            {
                title: "Aktuelle Kurse",
                description:
                    "Die App aktualisiert die Wechselkurse von Währungen und Kryptowährungen automatisch, um genaue Berechnungen zu gewährleisten.",
            },
        ],
    },
    fr: {
        title: "À propos de nous",
        subtitle:
            "Votre compagnon instantané de conversion de devises et de cryptomonnaies",
        description:
            "Krijji est une application pratique pour le calcul rapide et précis de la conversion de devises et de cryptomonnaies. Elle permet aux utilisateurs de convertir instantanément des devises traditionnelles telles que le dollar américain, l'euro, le rouble, et d'autres, en cryptomonnaies comme le Bitcoin, l'Ethereum, le Litecoin, et de nombreux autres actifs numériques. Le convertisseur prend également en charge les opérations inverses, permettant de reconvertir les cryptomonnaies en monnaie fiduciaire.",
        featuresTitle: "Nos principales fonctionnalités",
        features: [
            {
                title: "Conversion de devise à devise",
                description:
                    "Transfert facile des montants entre devises fiduciaires avec les taux de change actuels.",
            },
            {
                title: "Conversion de cryptomonnaies en monnaie fiduciaire",
                description:
                    "Calcul instantané de la valeur des cryptomonnaies, comme le Bitcoin ou l'Ethereum, en argent traditionnel.",
            },
            {
                title: "Support de nombreuses devises",
                description:
                    "Large choix de devises traditionnelles et numériques pour la conversion.",
            },
            {
                title: "Taux actualisés",
                description:
                    "L'application met automatiquement à jour les taux de change des devises et des cryptomonnaies pour garantir la précision des calculs.",
            },
        ],
    },
    ru: {
        title: "О нас",
        subtitle: "Ваш мгновенный помощник по конвертации валют и криптовалют",
        description:
            "Krijji — это удобное приложение для быстрого и точного расчета обмена валют и криптовалют. Оно предоставляет пользователям возможность мгновенно конвертировать традиционные валюты, такие как доллар США, евро, рубль и другие, в любые криптовалюты, включая Bitcoin, Ethereum, Litecoin и множество других цифровых активов. Конвертер поддерживает обратные операции, позволяя конвертировать криптовалюты обратно в фиатные деньги.",
        featuresTitle: "Наши ключевые возможности",
        features: [
            {
                title: "Конвертация валют в валюты",
                description: "Легкий перевод сумм между фиатными валютами с учетом текущих курсов.",
            },
            {
                title: "Конвертация криптовалют в фиатные валюты",
                description:
                    "Мгновенный пересчет стоимости криптовалют, таких как Bitcoin или Ethereum, в традиционные деньги.",
            },
            {
                title: "Поддержка множества валют",
                description: "Широкий выбор традиционных и цифровых валют для конвертации.",
            },
            {
                title: "Актуальные курсы",
                description:
                    "Приложение автоматически обновляет курсы валют и криптовалют, обеспечивая точность расчетов.",
            },
        ],
    },
};

export default aboutUsPageTranslations;