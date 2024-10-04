"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import AngleDownSvg from "@/assets/angle-down.svg";
import ExchangeSvg from "@/assets/exchange.svg";
import gbpCurrency from "@/assets/gbp-currency.png";
import euroCurrency from "@/assets/euro-currency.png";

const CONVERSION_RATE = 1.2; // 1 GBP = 1.2 EUR

export interface ConversionBoxProps {
    title: string;
    subtitle: string;
    initialAmount: string;
    fromCurrency: string;
    toCurrency: string;
    fromCurrencyImg: StaticImageData;
    toCurrencyImg: StaticImageData;
}

export default function ConversionBox({
    title,
    subtitle,
    initialAmount,
    fromCurrency,
    toCurrency,
}: ConversionBoxProps) {
    const [fromAmount, setFromAmount] = useState(initialAmount);
    const [toAmount, setToAmount] = useState(
        (parseFloat(initialAmount) * CONVERSION_RATE).toFixed(2),
    );

    useEffect(() => {
        const convertedAmount = (parseFloat(fromAmount) * CONVERSION_RATE).toFixed(2);
        setToAmount(isNaN(Number(convertedAmount)) ? "0.00" : convertedAmount);
    }, [fromAmount]);

    return (
        <div className="w-full">
            <div className="flex space-x-2 text-[34px] font-semibold font-head leading-[1] tracking-[-.02em] mb-8">
                <h2 className="text-prim">{title}</h2>
                <h3 className="">{subtitle}</h3>
            </div>
            <div className="flex justify-between items-center space-x-8 mb-10">
                <div className="space-y-2 flex-1">
                    <p className="text-[18px]">Amount</p>
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-[#333333]">
                        <input
                            className="text-[22px] font-medium outline-none bg-transparent w-full"
                            value={fromAmount}
                            onChange={(e) => setFromAmount(e.target.value)}
                            type="number"
                        />
                        <div className="flex items-center space-x-3 flex-shrink-0">
                            <Image
                                src={fromCurrency === "GBP" ? gbpCurrency : euroCurrency}
                                alt={fromCurrency}
                                className="w-6 h-6 t-cover rounded-sm"
                            />
                            <span className="text-[22px] font-medium">{fromCurrency}</span>
                            <AngleDownSvg className="w-[22px] h-[22px] flex-shrink-0 fill-txt" />
                        </div>
                    </div>
                </div>
                <ExchangeSvg className="w-[30px] h-[30px] mt-9 fill-exch" />
                <div className="space-y-2 flex-1">
                    <p className="text-[18px]">Converted to</p>
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-[#333333]">
                        <input
                            className="text-[22px] font-medium outline-none bg-transparent"
                            value={toAmount}
                            readOnly
                        />
                        <div className="flex items-center space-x-3">
                            <Image
                                src={toCurrency === "GBP" ? gbpCurrency : euroCurrency}
                                alt={toCurrency}
                                className="w-6 h-6 object-cover rounded-sm"
                            />
                            <span className="text-[22px] font-medium">{toCurrency}</span>
                            <AngleDownSvg className="w-[22px] h-[22px] fill-txt" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-[20px] font-medium ">
                    £1.000 GBP = €{CONVERSION_RATE.toFixed(3)} EUR
                </p>
                <p className="text-[18px] text-txt-fd">
                    Rate last updated at 12:00 PM
                </p>
            </div>
        </div>
    );
}
