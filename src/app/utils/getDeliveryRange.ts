type deliveryRangeOptions = {
    startDay?: number;
    endDay?: number;
    locale?: string;
}

function formatDate(date: Date, locale: string) {
    return date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
}

function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function getDeliveryRange(options: deliveryRangeOptions = {}){
    const { startDay = 7, endDay = 8, locale = 'en-US' } = options;
    const today = new Date();
    const startDate = addDays(today, startDay);
    const endDate = addDays(today, endDay);
    return `${formatDate(startDate, locale)} - ${formatDate(endDate, locale)}`;
}