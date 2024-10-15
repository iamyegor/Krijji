import { getMetaTagsTranslation } from "@/app/(currency-converter)/[lang]/data/translations/metaTagsTranslations";
import LanguageCode from "@/app/(currency-converter)/[lang]/types/LanguageCode";
import { Metadata } from "next";

export function createMetadata(lang: LanguageCode): Metadata {
    const metaTags = getMetaTagsTranslation(lang);

    return {
        title: metaTags.title,
        description: metaTags.description,
        openGraph: {
            type: "website",
            title: metaTags.openGraph.title,
            description: metaTags.openGraph.description,
            images: [{ url: metaTags.openGraph.image }],
            url: metaTags.openGraph.url,
            locale: metaTags.openGraph.locale,
        },
        twitter: {
            card: "summary_large_image",
            site: metaTags.twitter.site,
            title: metaTags.twitter.title,
            description: metaTags.twitter.description,
            images: [metaTags.twitter.image],
        },
        alternates: {
            languages: {
                en: "/en",
                zh: "/zh",
                fr: "/fr",
                es: "/es",
                de: "/de",
                ru: "/ru",
            },
        },
    };
}
