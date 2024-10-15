import { ReactNode } from "react";
import { createMetadata } from "./generateMetadata";
import { redirect } from "next/navigation";
import LanguageCode from "./types/LanguageCode";

export const generateMetadata = ({ params }: { params: { lang: LanguageCode } }) =>
    createMetadata(params.lang);

export default function CurrencyConverterLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: { lang: LanguageCode };
}) {
    if (params.lang === "en") {
        return redirect("/");
    }

    return <>{children}</>;
}
