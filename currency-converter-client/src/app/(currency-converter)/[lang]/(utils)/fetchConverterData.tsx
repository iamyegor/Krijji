import {
    prioritizedCryptoCodes,
    prioritizedFiatCodes,
} from "@/app/(currency-converter)/[lang]/(data)/prioritizedCurrencies";
import Currency from "@/app/(currency-converter)/[lang]/(types)/Currency";

export async function fetchConverterData() {
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
