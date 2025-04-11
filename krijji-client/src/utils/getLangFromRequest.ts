import { cookies } from "next/headers";

export default function getLangFromRequest() {
    const preferredLanguage = cookies().get("preferredLanguage");
    let lang = preferredLanguage?.value ?? "en";

    if (!preferredLanguage) {
        const acceptLanguage = cookies().get("accept-language");

        if (acceptLanguage?.value) {
            lang = acceptLanguage.value;
        }
    }
    return lang;
}