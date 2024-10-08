import {
    PageTranslation,
    pageTranslations,
} from "@/app/(currency-converter)/[lang]/data/translations/pageTranslations";
import { fetchConverterData } from "@/app/(currency-converter)/[lang]/utils/fetchConverterData";
import CryptoConversionBox from "./components/conversion-boxes/CryptoConversionBox";
import FiatConversionBox from "./components/conversion-boxes/FiatConversionBox";
import LanguageSpecificHeading from "./components/LanguageSpecificHeading";

export async function generateStaticParams() {
    return pageTranslations.map((t) => ({
        lang: t.lang,
    }));
}

export default async function CurrencyConverterPage({ params }: { params: { lang: string } }) {
    const translation: PageTranslation = pageTranslations.find((t) => t.lang === params.lang)!;

    const { fiat, crypto, cryptoLastUpdateDate, fiatLastUpdateDate } = await fetchConverterData(
        params.lang,
    );

    return (
        <div className="bg-bg min-h-screen text-txt pb-10 sm:pb-24 lg:pb-32 relative">
            <div className="relative">
                <main className="space-y-14">
                    <div className="text-center space-y-4 flex flex-col items-center">
                        <LanguageSpecificHeading
                            lang={params.lang}
                            title={translation.title}
                            emphasisedTitle={translation.emphasisedTitle}
                        />
                        <p
                            className={`text-[16px] sm:text-[18px] max-w-[600px]
                            ${params.lang == "ru" ? "font-sans-ru" : "font-sans"}
                        `}
                        >
                            {translation.description}
                        </p>
                    </div>

                    <div className="space-y-6 sm:space-y-10 flex flex-col items-center">
                        <div className="bg-cbox rounded-[30px] border border-bord p-10 backdrop-blur-md max-w-[1000px] w-full px-4 xs:px-6 md:px-12">
                            <FiatConversionBox
                                translation={{
                                    ...translation,
                                    ...translation.exchange,
                                }}
                                currencies={fiat}
                                sansFont={params.lang == "ru" ? "font-sans-ru" : undefined}
                                headingFont={
                                    params.lang == "ru" ? "font-head-ru !font-normal" : undefined
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
                                locale={params.lang}
                                sansFont={params.lang == "ru" ? "font-sans-ru" : undefined}
                                headingFont={
                                    params.lang == "ru" ? "font-head-ru !font-normal" : undefined
                                }
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
