import { notFound } from "next/navigation";
import { pageTranslations } from "@/app/(currency-converter)/[lang]/(data)/translations/pageTranslations";
import { fetchConverterData } from "@/app/(currency-converter)/[lang]/(utils)/fetchConverterData";
import FiatConversionBox from "@/app/(currency-converter)/[lang]/(components)/FiatConversionBox";
import CryptoConversionBox from "@/app/(currency-converter)/[lang]/(components)/CryptoConversionBox";

export async function generateStaticParams() {
    return pageTranslations.map((t) => ({
        lang: t.lang,
    }));
}

export default async function CurrencyConverterPage({ params }: { params: { lang: string } }) {
    const translation = pageTranslations.find((t) => t.lang === params.lang);

    if (!translation) {
        notFound();
    }

    const { fiat, crypto, cryptoLastUpdateDate, fiatLastUpdateDate } = await fetchConverterData(
        params.lang,
    );

    return (
        <div className="bg-bg min-h-screen text-txt pb-10 sm:pb-24 lg:pb-32 relative">
            <div className="relative">
                <main className="space-y-14">
                    <div className="text-center space-y-4 flex flex-col items-center">
                        <h1
                            className={`text-[34px] sm:text-[40px] md:text-[44px] flex flex-wrap text-center justify-center 
                            ${params.lang == "ru" ? "font-head-ru leading-[1.2] font-medium !space-x-3" : "font-head tracking-[-.02em] leading-[1] font-bold "}
                            ${translation.title.includes(" ") && "space-x-2"}
                            `}
                        >
                            <span className="">{translation.title}</span>
                            <span className="text-prim">{translation.emphasisedTitle}</span>
                        </h1>
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
                                lastUpdatedDate={fiatLastUpdateDate}
                                locale={params.lang}
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
