import { pageTranslations } from "@/app/(currency-converter)/[lang]/data/translations/pageTranslations";
import CurrencyConverter from "@/components/CurrencyConverter/CurrencyConverter";
import LanguageCode from "./types/LanguageCode";

export async function generateStaticParams() {
    return pageTranslations.map((t) => ({
        lang: t.lang,
    }));
}

export default async function LanguageSpecificConverterPage({
    params,
}: {
    params: { lang: LanguageCode };
}) {
    return <CurrencyConverter lang={params.lang} />;
}
