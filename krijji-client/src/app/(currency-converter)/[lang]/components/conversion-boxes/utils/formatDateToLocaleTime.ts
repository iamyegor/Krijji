export function formatDateToLocaleTime(timestamp: number, locale: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString(locale, {
        hour: "numeric",
        minute: "numeric",
        hour12: locale.startsWith("en"),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
}
