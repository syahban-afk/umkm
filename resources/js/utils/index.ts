export function formatCurrency(amount: number, locale: string = 'id-ID', currency: string = 'IDR'): string {
    return amount.toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0
    });
}
