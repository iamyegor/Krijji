import notFoundPageTranslations from "@/data/notFoundPageTranslations";
import getLangFromRequest from "@/utils/getLangFromRequest";
import Link from "next/link";
import LanguageCode from "./(currency-converter)/[lang]/(types)/LanguageCode";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    const lang = getLangFromRequest();
    const translation =
        notFoundPageTranslations[lang as LanguageCode] || notFoundPageTranslations.en;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white p-6 space-y-3 font-sans">
            <div className="space-y-3 flex flex-col items-center">
                <h1 className="text-5xl font-bold">{translation.title}</h1>
                <p className="text-lg font-semibold">{translation.message}</p>
            </div>
            <div className="space-y-8 flex flex-col items-center">
                <p className="text-lg">{translation.instruction}</p>
                <Link
                    href="/"
                    className="px-6 py-3 text-sm font-medium text-black bg-white rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2"
                >
                    <ArrowLeft className="w-5 h-5"/>
                    <span className="text-base">{translation.buttonText}</span>
                </Link>
            </div>
        </div>
    );
}
