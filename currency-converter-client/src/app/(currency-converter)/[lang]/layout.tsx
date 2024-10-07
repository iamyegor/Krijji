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
import { Head } from "next/document";
import { getMetaTagsTranslation } from "@/app/(currency-converter)/[lang]/(data)/translations/metaTagsTranslations";

export default function CurrencyConverterLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: { lang: string };
}) {
    const selectedTheme = cookies().get("theme") as { value: Theme };
    const themeNames = getThemeTranslation(params.lang as LanguageCode);
    const metaTags = getMetaTagsTranslation(params.lang as LanguageCode);

    if (!isValidLanguageCode(params.lang)) {
        notFound();
    }

    return (
        <div className="bg-bg min-h-screen text-txt relative pt-8">
            <Head>
                <title>{metaTags.title}</title>
                <meta name="description" content={metaTags.description} />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={metaTags.openGraph.title} />
                <meta property="og:description" content={metaTags.openGraph.description} />
                <meta property="og:image" content={metaTags.openGraph.image} />
                <meta property="og:url" content={metaTags.openGraph.url} />
                <meta property="og:locale" content={metaTags.openGraph.locale} />

                <meta name="twitter:card" content={metaTags.twitter.card} />
                <meta name="twitter:site" content={metaTags.twitter.site} />
                <meta name="twitter:title" content={metaTags.twitter.title} />
                <meta name="twitter:description" content={metaTags.twitter.description} />
                <meta name="twitter:image" content={metaTags.twitter.image} />
            </Head>
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
