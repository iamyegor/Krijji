import React from "react";
import decorativeBlueGlow from "@/assets/glows/decorative-blue-glow.png";
import decorativeMeshBottomRight from "@/assets/meshes/decorative-mesh-bottom-right.png";
import decorativeMeshUpperLeft from "@/assets/meshes/decorative-mesh-upper-left.png";
import MoonSvg from "@/assets/themes/moon.svg";
import bottomFaintGlowImg from "@/assets/glows/faint-glow-bottom.png";
import leftFaintGlowImg from "@/assets/glows/faint-glow-left.png";
import faintGlowImg from "@/assets/glows/faint-glow.png";
import rightFaintGlowImg from "@/assets/glows/faint-glow-right.png";
import AngleDownSvg from "@/assets/angle-down.svg";
import americanFlagCircle from "@/assets/american-flag-circle.png";
import Image from "next/image";
import FiatConversionBox from "@/app/en/FiatConversionBox";
import CryptoConversionBox from "@/app/en/CryptoConversionBox";
import Currency from "@/app/en/types";
import { prioritizedCryptoCodes, prioritizedFiatCodes } from "@/app/en/prioritizedCurrencies";
import ThemeSwitcher from "@/app/en/ThemeSwitcher";
import { cookies } from "next/headers";

async function fetchConverterData() {
    const response = await fetch(`${process.env.server}/converter`, {
        next: {
            revalidate: 0,
        },
    });

    const data = (await response.json()) as {
        fiat: Currency[];
        crypto: Currency[];
        cryptoLastUpdateDate: number;
        fiatLastUpdateDate: number;
    };

    const orderedFiat = prioritizeCurrencies(data.fiat, prioritizedFiatCodes);
    const orderedCrypto = prioritizeCurrencies(data.crypto, prioritizedCryptoCodes);

    return {
        fiat: orderedFiat,
        crypto: orderedCrypto,
        cryptoLastUpdateDate: data.cryptoLastUpdateDate,
        fiatLastUpdateDate: data.fiatLastUpdateDate,
    };
}

function prioritizeCurrencies(currencies: Currency[], prioritizedCodes: string[]): Currency[] {
    const codePriorityMap = prioritizedCodes.reduce(
        (acc, code, index) => {
            acc[code] = index;
            return acc;
        },
        {} as { [key: string]: number },
    );

    return [...currencies].sort((a, b) => {
        const priorityA =
            codePriorityMap[a.code] !== undefined
                ? codePriorityMap[a.code]
                : Number.MAX_SAFE_INTEGER;
        const priorityB =
            codePriorityMap[b.code] !== undefined
                ? codePriorityMap[b.code]
                : Number.MAX_SAFE_INTEGER;
        return priorityA - priorityB;
    });
}

export default async function CurrencyConverterPage() {
    const { fiat, crypto, cryptoLastUpdateDate, fiatLastUpdateDate } = await fetchConverterData();
    const selectedTheme = cookies().get("theme");

    return (
        <div className="bg-bg min-h-screen text-txt pb-10 sm:1pb-16 relative">
            <div className="container mx-auto px-4 py-8 relative">
                <header className="flex justify-between items-center mb-[80px]">
                    <ThemeSwitcher selectedTheme={selectedTheme?.value ?? null} />
                    <div className="flex items-center space-x-3">
                        <Image
                            src={americanFlagCircle}
                            alt="American flag"
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                        />
                        <span className="text-[16px] sm:text-[18px] font-medium">English</span>
                        <AngleDownSvg className="h-[14px] sm:h-[18px] fill-txt" />
                    </div>
                </header>

                <main className="space-y-14">
                    <div className="text-center space-y-4">
                        <h1 className="text-[34px] sm:text-[40px] md:text-[44px] font-bold font-head tracking-[-.02em] leading-[1]">
                            <span className="">CURRENCY </span>
                            <span className="text-prim">CONVERTER</span>
                        </h1>
                        <p className="text-[16px] sm:text-[18px] font-sans">
                            Effortlessly convert fiat and crypto currencies with our fast and
                            accurate tool.
                        </p>
                    </div>

                    <div className="space-y-6 sm:space-y-10 flex flex-col items-center">
                        <div
                            className="bg-cbox rounded-[30px] border border-bord p-10 backdrop-blur-md max-w-[1000px] w-full
                        px-4 xs:px-6 md:px-12"
                        >
                            <FiatConversionBox
                                title="Exchange"
                                subtitle="Rates"
                                currencies={fiat}
                                lastUpdatedDate={fiatLastUpdateDate}
                            />
                        </div>

                        <div
                            className="bg-cbox rounded-[30px] border border-bord p-10 backdrop-blur-md max-w-[1000px] w-full
                         px-4 xs:px-6 md:px-12"
                        >
                            <CryptoConversionBox
                                title="Crypto"
                                subtitle="Currencies"
                                fiatCurrencies={fiat}
                                cryptoCurrencies={crypto}
                                lastUpdatedDate={cryptoLastUpdateDate}
                            />
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
            <Image
                src={decorativeBlueGlow}
                alt="Decorative blue glow"
                className="absolute top-[350px] md:top-[220px] left-[50%] transform -translate-x-1/2 right-[50%] w-[400px] h-[400px] xs:w-[500px] xs:h-[500px] object-cover pointer-events-none opacity-80"
                draggable={false}
            />

            <Image
                src={rightFaintGlowImg}
                alt="Faint glow"
                className="block xl:hidden absolute top-[110px] xs:top-[70px] sm:top-[20px] right-0 w-[400px] h-[400px] pointer-events-none"
                draggable={false}
            />

            <Image
                src={leftFaintGlowImg}
                alt="Faint glow"
                className="absolute top-[700px] xs:top-[680px] sm:top-[650px] md:top-[560px] lg:top-[450px] w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] left-0 pointer-events-none"
                draggable={false}
            />
            <Image
                src={decorativeMeshUpperLeft}
                alt="Decorative mesh"
                className="absolute top-0 left-0 w-[200px] xs:w-[250px] lg:w-[340px] xl:w-[400px] h-auto object-cover pointer-events-none opacity-mesh"
                draggable={false}
            />
            <Image
                src={decorativeMeshBottomRight}
                alt="Decorative mesh"
                className="absolute bottom-0 right-0 w-[320px] h-auto object-cover pointer-events-none opacity-mesh"
                draggable={false}
            />
            <Image
                src={bottomFaintGlowImg}
                alt="Faint glow"
                className="absolute -bottom-0 -right-0 w-[400px] h-[400px] pointer-events-none"
                draggable={false}
            />
        </div>
    );
}
