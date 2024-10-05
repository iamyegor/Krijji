import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ArrowDownSvg from "@/assets/angle-down.svg";
import Currency from "@/app/en/types";
import React, { ReactNode, useState } from "react";
import { Check } from "lucide-react";
import { AutoSizer, List } from "react-virtualized";
import FallbackImage from "@/app/en/FallbackImage";
import MoneyBillSvg from "@/assets/fallbacks/money-bill.svg";
import useMediaQueries from "@/hooks/useMediaQueries";

export default function CurrencyCombobox({
    value,
    onChange,
    label,
    currencies,
    getIconPath,
    fallbackSvg = null,
}: {
    value: Currency;
    onChange: (value: Currency) => void;
    label: string;
    currencies: Currency[];
    getIconPath: (icon: string) => string;
    fallbackSvg?: ReactNode;
}) {
    const { isMdScreen } = useMediaQueries();
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCurrencies = currencies.filter(
        (currency) =>
            currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            currency.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const renderRow = ({
        index,
        key,
        style,
    }: {
        index: number;
        key: string;
        style: React.CSSProperties;
    }) => {
        const currency = filteredCurrencies[index];
        return (
            <CommandItem
                key={key}
                value={`${currency.code} ${currency.name}`}
                onSelect={(selectedValue) => {
                    const selectedCurrency = currencies.find(
                        (c) => `${c.code} ${c.name}` === selectedValue,
                    );
                    if (selectedCurrency) {
                        onChange(selectedCurrency);
                    }
                    setOpen(false);
                }}
                style={style}
            >
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-3">
                        <FallbackImage
                            src={getIconPath(currency.code)}
                            alt={currency.code}
                            width={24}
                            height={24}
                            className="w-6 h-6 object-cover rounded-md"
                            fallbackSvg={
                                fallbackSvg ? (
                                    fallbackSvg
                                ) : (
                                    <MoneyBillSvg className="fill-txt w-6 h-6" />
                                )
                            }
                        />
                        <span className="text-base">{currency.code}</span>
                    </div>
                    {currency === value && (
                        <Check className="w-5 h-5 text-neutral-300 flex-shrink-0" />
                    )}
                </div>
            </CommandItem>
        );
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="flex items-center flex-shrink-0 !px-0 text-[16px] sm:text-[18px]"
                    aria-label={label}
                    variant="dropdown"
                >
                    <div className="flex items-center space-x-2.5">
                        <FallbackImage
                            src={getIconPath(value.code)}
                            alt={value.code}
                            width={24}
                            height={24}
                            className="w-5 h-5 sm:w-6 sm:h-6 object-cover rounded-sm sm:rounded-md"
                            fallbackSvg={
                                fallbackSvg ? (
                                    fallbackSvg
                                ) : (
                                    <MoneyBillSvg className="w-6 h-6 fill-txt" />
                                )
                            }
                        />
                        <span>{value.code}</span>
                        <ArrowDownSvg className="w-3 h-3 sm:w-4 sm:h-4 fill-white flex-shrink-0" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align={isMdScreen ? "center" : "end"}>
                <Command>
                    <CommandInput
                        placeholder="Search currency..."
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                    />
                    <CommandEmpty>No currency found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            <AutoSizer disableHeight>
                                {({ width }) => (
                                    <List
                                        width={width}
                                        height={300}
                                        rowCount={filteredCurrencies.length}
                                        rowHeight={40}
                                        rowRenderer={renderRow}
                                    />
                                )}
                            </AutoSizer>
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
