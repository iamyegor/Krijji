import React, { ReactNode } from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import faintGlowImg from "@/assets/glows/faint-glow.png";
import ThemeSwitcher from "@/app/(currency-converter)/[lang]/(components)/ThemeSwitcher";
import LanguageSwitcher from "@/app/(currency-converter)/[lang]/(components)/LanguageSwitcher";
import DecorativeGlows from "@/app/(currency-converter)/[lang]/(components)/DecorativeGlows";

export default function CurrencyConverterLayout({ children }: { children: ReactNode }) {
    const selectedTheme = cookies().get("theme");
    const selectedLanguage = cookies().get("preferredLanguage");

    return (
        <div className="bg-bg min-h-screen text-txt pb-10 sm:pb-16 relative">
            <div className="container mx-auto px-4 py-8 relative">
                <header className="flex justify-between items-center mb-[80px]">
                    <ThemeSwitcher selectedTheme={selectedTheme?.value ?? null} />
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
