export function formatDateToLocaleTime(timestamp: number, locale: string): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: locale === 'en', // Use 12-hour format for English, 24-hour otherwise
    });
}