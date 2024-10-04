import React from "react";
import decorativeBlueGlow from "@/assets/decorative-blue-glow.png";
import decorativeMeshBottomRight from "@/assets/decorative-mesh-bottom-right.png";
import decorativeMeshUpperLeft from "@/assets/decorative-mesh-upper-left.png";
import MoonSvg from "@/assets/moon.svg";
import AngleDownSvg from "@/assets/angle-down.svg";
import americanFlagCircle from "@/assets/american-flag-circle.png";
import faintGlowImg from "@/assets/faint-glow.png";
import Image from "next/image";
import ConversionBox from "@/app/en/ConversionBox";

function fetchAllExchangeRates() {
    return [
        { icon: "USD", code: "USD", name: "United States Dollar", rateToUsd: 1 },
        { icon: "EUR", code: "EUR", name: "Euro", rateToUsd: 1.1 },
        { icon: "GBP", code: "GBP", name: "British Pound", rateToUsd: 1.31 },
        { icon: "JPY", code: "JPY", name: "Japanese Yen", rateToUsd: 0.0067 },
    ];
}

export default function CurrencyConverter() {
    const allExchangeRates = fetchAllExchangeRates();

    return (
        <div className="bg-bg min-h-screen text-txt pb-16 relative">
            <div className="container mx-auto px-4 py-8 relative">
                <header className="flex justify-between items-center mb-[80px]">
                    <div className="flex items-center space-x-4">
                        <MoonSvg className="w-6 h-6" />
                        <span className="text-[18px]">Dark</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Image
                            src={americanFlagCircle}
                            alt="American flag"
                            className="w-6 h-6 rounded-full"
                        />
                        <span className="text-[18px]">English</span>
                        <AngleDownSvg className="w-[18px] h-[18px] fill-txt" />
                    </div>
                </header>

                <main className="space-y-14">
                    <div className="text-center space-y-4">
                        <h1 className="text-[44px] font-bold font-head tracking-[-.02em] leading-[1]">
                            <span className="">CURRENCY </span>
                            <span className="text-prim">CONVERTER</span>
                        </h1>
                        <p className="text-[18px] font-sans">
                            Effortlessly convert fiat and crypto currencies with our fast and
                            accurate tool.
                        </p>
                    </div>

                    <div className="space-y-10 flex flex-col items-center">
                        <div className="bg-cbox rounded-[30px] border border-bord p-10 px-12 backdrop-blur-md max-w-[1000px] w-full">
                            <ConversionBox
                                title="Exchange"
                                subtitle="Rates"
                                initialAmount="1000"
                                fromCurrency="GBP"
                                toCurrency="EUR"
                            />
                        </div>

                        <div className="bg-cbox rounded-[30px] border border-bord p-10 px-12 backdrop-blur-md max-w-[1000px] w-full">
                            <ConversionBox
                                title="Crypto"
                                subtitle="Currencies"
                                initialAmount="1000"
                                fromCurrency="GBP"
                                toCurrency="EUR"
                            />
                        </div>
                    </div>
                </main>

                <Image
                    src={faintGlowImg}
                    alt="Faint glow"
                    className="absolute top-[0px] right-0 xl:-right-[150px] w-[300px] h-[300px] xl:w-[400px] xl:h-[400px] pointer-events-none"
                    draggable={false}
                />
                <Image
                    src={faintGlowImg}
                    alt="Faint glow"
                    className="absolute top-[450px] -left-[320px] w-[400px] h-[400px] pointer-events-none"
                    draggable={false}
                />

                <Image
                    src={decorativeBlueGlow}
                    alt="Decorative blue glow"
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] object-cover pointer-events-none opacity-90"
                    draggable={false}
                />
            </div>
            <Image
                src={decorativeMeshUpperLeft}
                alt="Decorative mesh"
                className="absolute top-0 left-0 w-[420px] h-auto object-cover pointer-events-none"
                draggable={false}
            />
            <Image
                src={decorativeMeshBottomRight}
                alt="Decorative mesh"
                className="absolute bottom-0 right-0 w-[320px] h-auto object-cover pointer-events-none"
                draggable={false}
            />
            {/*<Image*/}
            {/*    src={faintGlowImg}*/}
            {/*    alt="Faint glow"*/}
            {/*    className="absolute -bottom-0 -right-0 w-[400px] h-[400px] pointer-events-none"*/}
            {/*    draggable={false}*/}
            {/*/>*/}
        </div>
    );
}
