import AboutUs from "@/app/(currency-converter)/[lang]/components/AboutUs/AboutUs";
import CryptoConversionBox from "@/app/(currency-converter)/[lang]/components/conversion-boxes/CryptoConversionBox";
import FiatConversionBox from "@/app/(currency-converter)/[lang]/components/conversion-boxes/FiatConversionBox";
import DecorativeGlows from "@/app/(currency-converter)/[lang]/components/DecorativeGlows";
import LanguageSpecificHeading from "@/app/(currency-converter)/[lang]/components/LanguageSpecificHeading";
import LanguageSwitcher from "@/app/(currency-converter)/[lang]/components/switchers/LanguageSwitcher";
import ThemeSwitcher from "@/app/(currency-converter)/[lang]/components/switchers/ThemeSwitcher";
import {
    PageTranslation,
    pageTranslations,
} from "@/app/(currency-converter)/[lang]/data/translations/pageTranslations";
import { getThemeTranslation } from "@/app/(currency-converter)/[lang]/data/translations/themeTranslations";
import LanguageCode, {
    isValidLanguageCode,
} from "@/app/(currency-converter)/[lang]/types/LanguageCode";
import Theme from "@/app/(currency-converter)/[lang]/types/Theme";
import { fetchConverterData } from "@/app/(currency-converter)/[lang]/utils/fetchConverterData";
import faintGlowImg from "@/assets/glows/faint-glow.png";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CurrencyConverter({ lang }: { lang: LanguageCode }) {
    const translation: PageTranslation = pageTranslations.find((t) => (t.lang = lang))!;
    const selectedTheme = cookies().get("theme") as { value: Theme | null };
    const themeNames = getThemeTranslation(lang as LanguageCode);

    const { fiat, crypto, cryptoLastUpdateDate } = await fetchConverterData(lang);

    if (!isValidLanguageCode(lang)) {
        notFound();
    }

    return (
        <div className="bg-bg min-h-screen text-txt relative pt-8">
            <div className="container mx-auto px-4 relative">
                <header className="flex justify-between items-center mb-[80px]">
                    <ThemeSwitcher
                        selectedTheme={selectedTheme?.value ?? null}
                        themeNames={themeNames}
                    />
                    <LanguageSwitcher selectedLanguage={lang} />
                </header>

                <main className="space-y-14">
                    <div className="bg-bg min-h-screen text-txt pb-10 sm:pb-24 lg:pb-32 relative">
                        <div className="relative">
                            <main>
                                <div className="text-center space-y-4 flex flex-col items-center mb-14">
                                    <p className="text-[80px] font-head leading-[1] font-bold">
                                        Krijji
                                    </p>
                                    <LanguageSpecificHeading
                                        lang={lang}
                                        title={translation.title}
                                        emphasisedTitle={translation.emphasisedTitle}
                                    />
                                    <p
                                        className={`text-[16px] sm:text-[18px] max-w-[600px]
                            ${lang == "ru" ? "font-sans-ru" : "font-sans"}
                        `}
                                    >
                                        {translation.description}
                                    </p>
                                </div>

                                <div className="space-y-6 sm:space-y-10 flex flex-col items-center mb-32">
                                    <div className="bg-cbox rounded-[30px] border border-bord p-10 backdrop-blur-md max-w-[1000px] w-full px-4 xs:px-6 md:px-12">
                                        <FiatConversionBox
                                            translation={{
                                                ...translation,
                                                ...translation.exchange,
                                            }}
                                            currencies={fiat}
                                            sansFont={lang == "ru" ? "font-sans-ru" : undefined}
                                            headingFont={
                                                lang == "ru"
                                                    ? "font-head-ru !font-normal"
                                                    : undefined
                                            }
                                        />
                                    </div>

                                    <div className="bg-cbox rounded-[30px] border border-bord p-10 backdrop-blur-md max-w-[1000px] w-full px-4 xs:px-6 md:px-12">
                                        <CryptoConversionBox
                                            translation={{
                                                ...translation,
                                                ...translation.crypto,
                                            }}
                                            fiatCurrencies={fiat}
                                            cryptoCurrencies={crypto}
                                            lastUpdatedDate={cryptoLastUpdateDate}
                                            locale={lang}
                                            sansFont={lang == "ru" ? "font-sans-ru" : undefined}
                                            headingFont={
                                                lang == "ru"
                                                    ? "font-head-ru !font-normal"
                                                    : undefined
                                            }
                                        />
                                    </div>
                                </div>

                                <AboutUs lang={lang} />
                            </main>
                        </div>
                    </div>
                </main>

                <Image
                    src={faintGlowImg}
                    alt="Faint glow"
                    className="hidden xl:block absolute top-[0px] -0 -right-[150px] w-[400px] h-[400px] pointer-events-none"
                    draggable={false}
                />
            </div>
            <DecorativeGlows />
        </div>
    );
}
