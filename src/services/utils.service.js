function formatDate(date) {
    let y = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let m = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    let d = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${y}-${m}-${d}`;
}

function getDatePriorByDays(days) {
    return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

export function getStringDate30DaysAgo() {
    return formatDate(getDatePriorByDays(30));
}
