import LanguageCode from "@/app/(currency-converter)/[lang]/types/LanguageCode";
import { useParams } from "next/navigation";

export function useLanguage(): LanguageCode {
    const params = useParams();
    return params.lang as LanguageCode;
}
