import React, { ReactNode } from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import faintGlowImg from "@/assets/glows/faint-glow.png";
import ThemeSwitcher from "@/app/(currency-converter)/[lang]/(components)/ThemeSwitcher";
import LanguageSwitcher from "@/app/(currency-converter)/[lang]/(components)/LanguageSwitcher";
import DecorativeGlows from "@/app/(currency-converter)/[lang]/(components)/DecorativeGlows";
import { getThemeTranslation } from "@/app/(currency-converter)/[lang]/(data)/translations/themeTranslations";
import LanguageCode from "@/app/(currency-converter)/[lang]/(types)/LanguageCode";
import Theme from "@/app/(currency-converter)/[lang]/(types)/Theme";

export default function CurrencyConverterLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: { lang: string };
}) {
    const selectedTheme = cookies().get("theme") as { value: Theme };
    const selectedLanguage = cookies().get("preferredLanguage");
    const themeNames = getThemeTranslation(params.lang as LanguageCode);

    return (
        <div className="bg-bg min-h-screen text-txt relative pt-8">
            <div className="container mx-auto px-4 relative">
                <header className="flex justify-between items-center mb-[80px]">
                    <ThemeSwitcher
                        selectedTheme={selectedTheme?.value ?? null}
                        themeNames={themeNames}
                    />
                    <LanguageSwitcher selectedLanguage={selectedLanguage?.value ?? null} />
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
