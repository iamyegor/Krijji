"use client";

import React, { useEffect, useState } from "react";
import ExchangeSvg from "@/assets/exchange.svg";
import Currency from "@/app/en/types";
import CurrencyCombobox from "@/app/en/CurrencyCombobox";

interface ConversionBoxProps {
    title: string;
    subtitle: string;
    currencies: Currency[];
    lastUpdatedDate: number;
}

const only_digits_commas_dots = /^[\d,.]+$/;

export default function FiatConversionBox({
    title,
    subtitle,
    currencies,
    lastUpdatedDate,
}: ConversionBoxProps) {
    const [fromCurrency, setFromCurrency] = useState<Currency>(currencies[0]);
    const [toCurrency, setToCurrency] = useState<Currency>(currencies[1]);
    const [amount, setAmount] = useState<string>("1,000");
    const [convertedAmount, setConvertedAmount] = useState<string>("0");

    function getIconPath(icon: string) {
        return `${process.env.imageServerPath}/fiat/${icon}.svg`;
    }

    useEffect(() => {
        convertCurrency();
    }, [fromCurrency, toCurrency, amount]);

    const convertCurrency = () => {
        const fromRate = fromCurrency.rateToUsd;
        const toRate = toCurrency.rateToUsd;
        const numericAmount = parseFloat(amount.replace(/,/g, "")) || 0;
        const result = (numericAmount * fromRate) / toRate;
        if (isNaN(result)) {
            return;
        }
        setConvertedAmount(formatNumber(result.toFixed(2)));
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatNumber = (num: string | number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || only_digits_commas_dots.test(value)) {
            setAmount(value);
        }
    };

    return (
        <div className="w-full">
            <div
                className="flex space-x-2 font-semibold font-head leading-[1] tracking-[-.02em] mb-8
                justify-center md:justify-start text-[28px] xs:text-[34px]"
            >
                <h2 className="text-prim">{title}</h2>
                <h3 className="">{subtitle}</h3>
            </div>
            <div
                className="flex justify-between items-center 
            flex-col lg:flex-row space-x-0 lg:space-x-4 mb-16 md:mb-10"
            >
                <div
                    className="space-y-2 flex-1 
                w-full"
                >
                    <p className="text-[16px] sm:text-[18px]">Amount</p>
                    <div className="flex items-center justify-between py-3 px-4 rounded-2xl border border-[#333333] space-x-4">
                        <input
                            className="text-[18px] xs:text-[20px] sm:text-[22px] font-medium outline-none bg-transparent w-full"
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        <CurrencyCombobox
                            value={fromCurrency}
                            onChange={(currency) => setFromCurrency(currency)}
                            label="From"
                            currencies={currencies}
                            getIconPath={getIconPath}
                        />
                    </div>
                </div>
                <button
                    onClick={swapCurrencies}
                    className="rounded-full transition-colors
                    p-2 lg:p-4 lg:hover:bg-txt/10 mb-3 xs:mb-0 mt-7 lg:mt-9"
                >
                    <ExchangeSvg className="w-[30px] h-[30px] fill-exch" />
                </button>
                <div
                    className="space-y-2 flex-1
                w-full"
                >
                    <p className="text-[16px] sm:text-[18px]">Converted to</p>
                    <div className="flex items-center justify-between py-3 px-4 rounded-2xl border border-[#333333] space-x-4">
                        <input
                            className="text-[18px] xs:text-[20px] sm:text-[22px] font-medium outline-none bg-transparent w-full"
                            value={convertedAmount}
                            readOnly
                        />
                        <CurrencyCombobox
                            value={toCurrency}
                            onChange={(currency) => setToCurrency(currency)}
                            label="To"
                            currencies={currencies}
                            getIconPath={getIconPath}
                        />
                    </div>
                </div>
            </div>
            <div
                className="flex items-center justify-between
            flex-col space-y-2 sm:space-y-3 md:space-y-0 md:flex-row
            "
            >
                <p className="text-base xs:text-[20px] font-medium text-center">
                    {`${formatNumber(1000)} ${fromCurrency.code} = ${formatNumber(
                        ((1000 * fromCurrency.rateToUsd) / toCurrency.rateToUsd).toFixed(2),
                    )} ${toCurrency.code}`}
                </p>
                <p className="text-[14px] xs:text-base md:text-[18px] text-txt-fd">
                    Rate last updated at {formatTime(lastUpdatedDate)}
                </p>
            </div>
        </div>
    );
}
