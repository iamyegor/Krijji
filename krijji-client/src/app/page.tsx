import CurrencyConverter from "@/components/CurrencyConverter/CurrencyConverter";
import { createMetadata } from "./(currency-converter)/[lang]/generateMetadata";

export const generateMetadata = () => createMetadata("en");

export default function Home() {
    return <CurrencyConverter lang="en" />;
}
