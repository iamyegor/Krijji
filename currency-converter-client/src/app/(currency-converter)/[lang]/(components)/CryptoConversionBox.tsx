"use client";

import Currency from "@/app/(currency-converter)/[lang]/(types)/Currency";
import React, { useEffect, useState } from "react";
import CurrencyCombobox from "@/app/(currency-converter)/[lang]/(components)/CurrencyCombobox";
import ExchangeSvg from "@/assets/exchange.svg";
import BlockChainSvg from "@/assets/fallbacks/blockchain.svg";
import { formatDateToLocaleTime } from "@/app/(currency-converter)/[lang]/(utils)/formatDateToLocaleTime";

interface CryptoConversionBoxProps {
    fiatCurrencies: Currency[];
    cryptoCurrencies: Currency[];
    lastUpdatedDate: number;
    translation: {
        title: string;
        subtitle: string;
        amount: string;
        convertedTo: string;
        rateLastUpdated: string;
    };
    locale: string;
    headingFont?: string;
    sansFont?: string;
}

const only_digits_commas_dots = /^[\d,.]+$/;

export default function CryptoConversionBox({
    translation,
    fiatCurrencies,
    cryptoCurrencies,
    lastUpdatedDate,
    locale,
    headingFont = "font-head",
    sansFont = "font-sans",
}: CryptoConversionBoxProps) {
    const [fromCurrency, setFromCurrency] = useState<Currency>(fiatCurrencies[0]);
    const [toCurrency, setToCurrency] = useState<Currency>(cryptoCurrencies[0]);
    const [amount, setAmount] = useState<string>("1,000");
    const [convertedAmount, setConvertedAmount] = useState<string>("0");

    function getFiatIconPath(icon: string) {
        return `${process.env.imageServerPath}/fiat/${icon}.svg`;
    }

    function getCryptoIconPath(icon: string) {
        return `${process.env.imageServerPath}/crypto/${icon}.png`;
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

    const handleFromCurrencyChange = (currency: Currency) => {
        setFromCurrency(currency);
    };

    const handleToCurrencyChange = (currency: Currency) => {
        setToCurrency(currency);
    };

    function isFiat(currency: Currency) {
        return fiatCurrencies.includes(currency);
    }

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
                <div className="space-y-2 flex-1 w-full">
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
                            onChange={handleFromCurrencyChange}
                            label="From"
                            currencies={isFiat(fromCurrency) ? fiatCurrencies : cryptoCurrencies}
                            getIconPath={isFiat(fromCurrency) ? getFiatIconPath : getCryptoIconPath}
                            fallbackSvg={
                                isFiat(fromCurrency) ? null : (
                                    <BlockChainSvg className="fill-txt w-6 h-6" />
                                )
                            }
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
                <div className="space-y-2 flex-1 w-full">
                    <p className="text-[16px] sm:text-[18px]">{translation.convertedTo}</p>
                    <div className="flex items-center justify-between py-3 px-4 rounded-2xl border border-input-bord space-x-4">
                        <input
                            className="text-[18px] xs:text-[20px] sm:text-[22px] font-medium outline-none bg-transparent w-full"
                            value={convertedAmount}
                            readOnly
                        />
                        <CurrencyCombobox
                            value={toCurrency}
                            onChange={handleToCurrencyChange}
                            label="To"
                            currencies={isFiat(toCurrency) ? fiatCurrencies : cryptoCurrencies}
                            getIconPath={isFiat(toCurrency) ? getFiatIconPath : getCryptoIconPath}
                            fallbackSvg={
                                isFiat(toCurrency) ? null : (
                                    <BlockChainSvg className="fill-txt w-6 h-6" />
                                )
                            }
                        />
                    </div>
                </div>
            </div>
            <div
                className={`flex items-center justify-between
            flex-col space-y-2 sm:space-y-3 md:space-y-0 md:flex-row ${sansFont}`}
            >
                <p className="text-base xs:text-[20px] font-medium text-center">
                    {`${formatNumber(1000)} ${fromCurrency.code} = ${formatNumber(
                        ((1000 * fromCurrency.rateToUsd) / toCurrency.rateToUsd).toFixed(2),
                    )} ${toCurrency.code}`}
                </p>
                <p className="text-[14px] xs:text-base md:text-[18px] text-txt-fd">
                    {translation.rateLastUpdated} {formatDateToLocaleTime(lastUpdatedDate, locale)}
                </p>
            </div>
        </div>
    );
}
