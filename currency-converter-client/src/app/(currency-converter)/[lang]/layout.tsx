import DecorativeGlows from "@/app/(currency-converter)/[lang]/(components)/DecorativeGlows";
import LanguageSwitcher from "@/app/(currency-converter)/[lang]/(components)/LanguageSwitcher";
import ThemeSwitcher from "@/app/(currency-converter)/[lang]/(components)/ThemeSwitcher";
import { getThemeTranslation } from "@/app/(currency-converter)/[lang]/(data)/translations/themeTranslations";
import LanguageCode, {
    isValidLanguageCode,
} from "@/app/(currency-converter)/[lang]/(types)/LanguageCode";
import Theme from "@/app/(currency-converter)/[lang]/(types)/Theme";
import faintGlowImg from "@/assets/glows/faint-glow.png";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";
import { generateMetadata } from "./generateMetadata";

export { generateMetadata };

export default function CurrencyConverterLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: { lang: string };
}) {
    const selectedTheme = cookies().get("theme") as { value: Theme };
    const themeNames = getThemeTranslation(params.lang as LanguageCode);

    if (!isValidLanguageCode(params.lang)) {
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
                    <LanguageSwitcher selectedLanguage={params.lang} />
                </header>

                <main className="space-y-14">{children}</main>

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
