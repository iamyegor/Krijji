"use client";

import { formatDateToLocaleTime } from "@/app/(currency-converter)/[lang]/components/conversion-boxes/utils/formatDateToLocaleTime";
import Currency from "@/app/(currency-converter)/[lang]/types/Currency";
import ExchangeSvg from "@/assets/exchange.svg";
import React, { useEffect, useState } from "react";
import CurrencyCombobox from "./components/CurrencyCombobox/CurrencyCombobox";

interface ConversionBoxProps {
    currencies: Currency[];
    translation: {
        title: string;
        subtitle: string;
        amount: string;
        convertedTo: string;
        accordingToCb: string;
    };
    headingFont?: string;
    sansFont?: string;
}

const only_digits_commas_dots = /^[\d,.]+$/;

export default function FiatConversionBox({
    translation,
    currencies,
    headingFont = "font-head",
    sansFont = "font-sans",
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
                className={`flex space-x-2 font-semibold leading-[1] tracking-[-.02em] mb-8
                justify-center md:justify-start text-[28px] xs:text-[34px] ${headingFont}`}
            >
                <h2 className="text-prim">{translation.title}</h2>
                <h3 className="">{translation.subtitle}</h3>
            </div>
            <div
                className={`flex justify-between items-center 
            flex-col lg:flex-row space-x-0 lg:space-x-4 mb-16 md:mb-10 ${sansFont}`}
            >
                <div
                    className="space-y-2 flex-1 
                w-full"
                >
                    <p className="text-[16px] sm:text-[18px]">{translation.amount}</p>
                    <div className="flex items-center justify-between py-3 px-4 rounded-2xl border border-input-bord space-x-4">
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
                    p-2 lg:p-4 lg:hover:bg-exch/15 mb-3 xs:mb-0 mt-7 lg:mt-9"
                >
                    <ExchangeSvg className="w-[30px] h-[30px] fill-exch" />
                </button>
                <div
                    className="space-y-2 flex-1
                w-full"
                >
                    <p className="text-[16px] sm:text-[18px]">{translation.convertedTo}</p>
                    <div className="flex items-center justify-between py-3 px-4 rounded-2xl border border-input-bord space-x-4">
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
                className={`flex items-center justify-between
            flex-col space-y-2 sm:space-y-3 md:space-y-0 lg:flex-row ${sansFont}`}
            >
                <p className="text-base xs:text-[20px] font-medium text-center">
                    {`${formatNumber(1000)} ${fromCurrency.code} = ${formatNumber(
                        ((1000 * fromCurrency.rateToUsd) / toCurrency.rateToUsd).toFixed(2),
                    )} ${toCurrency.code}`}
                </p>
                <p className="text-[14px] xs:text-base md:text-[18px] text-txt-fd text-center">
                    {translation.accordingToCb}
                </p>
            </div>
        </div>
    );
}
