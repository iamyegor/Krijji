import CheckSvg from "@/app/(currency-converter)/[lang]/components/AboutUs/assets/check.svg";
import CurrencyExchange from "@/app/(currency-converter)/[lang]/components/AboutUs/assets/currency-exchange.png";
import GlobeImg from "@/app/(currency-converter)/[lang]/components/AboutUs/assets/globe.png";
import Image from "next/image";
import LanguageCode from "../../types/LanguageCode";
import aboutUsPageTranslations from "./data/aboutUsPageTranslations";

interface AboutUsProps {
    lang: LanguageCode;
}

export default function AboutUs({ lang }: AboutUsProps) {
    const t = aboutUsPageTranslations[lang];

    const featuresTitleLastWord = t.featuresTitle.split(" ").pop();
    const featuresTitleFirstPart = t.featuresTitle.replace(` ${featuresTitleLastWord}`, "");

    const headFont = lang === "ru" ? "font-head-ru font" : "font-head font-bold";
    const sansFont = lang === "ru" ? "font-sans-ru" : "font-sans";
    const featureTitleFontWeight = lang === "ru" ? "font-medium" : "font-semibold";

    return (
        <div className="px-1 lg:px-10 space-y-10 xs:space-y-20 text-txt">
            <div className="flex flex-col md:flex-row gap-y-8 xs:gap-y-14 gap-x-8 lg:gap-x-16 items-center">
                <div className="space-y-7 w-full">
                    <div className={`space-y-3 tracking-[-.02em] leading-[1.1] ${headFont}`}>
                        <h2 className="text-[18px] xs:text-[24px] md:text-[20px] lg:text-[22px] mb-2">
                            {t.title}
                        </h2>
                        <h1 className="text-[22px] xs:text-[28px] sm:text-[32px] md:text-[26px] lg:text-[30px] mb-4">
                            <span className="text-[#1877f2]">Krijji:</span> {t.subtitle}
                        </h1>
                    </div>
                    <p
                        className={`text-[16px] sm:text-[18px] md:text-[16px] lg:text-[18px] ${sansFont}`}
                    >
                        {t.description}
                    </p>
                </div>
                <div className="flex items-center justify-center w-full max-w-[360px]">
                    <Image
                        className="w-full max-w-md"
                        alt="Currency exchange"
                        src={CurrencyExchange}
                    />
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-y-12 gap-x-8 items-center space-x-0 lg:space-x-8">
                <div className="flex items-center justify-center w-full max-w-[420px] px-1 md:px-0">
                    <Image className="w-full max-w-md" alt="Global connection" src={GlobeImg} />
                </div>
                <div className="w-full">
                    <h3
                        className={`text-[22px] xs:text-[28px] sm:text-[32px] md:text-[26px] lg:text-[30px] mb-7 ${headFont} leading-[1.1] tracking-[-.02em]`}
                    >
                        {featuresTitleFirstPart}{" "}
                        <span className="text-prim">{featuresTitleLastWord}</span>
                    </h3>
                    <ul className="space-y-6">
                        {t.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <CheckSvg className="w-5 h-5 mt-1 mr-4 flex-shrink-0 fill-prim" />
                                <div>
                                    <p className={`text-[16px] lg:text-[18px] ${sansFont}`}>
                                        <span className={featureTitleFontWeight}>
                                            {feature.title}:{" "}
                                        </span>
                                        {feature.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
