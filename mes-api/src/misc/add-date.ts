export function addDays(date:any, days:any) {
    const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    return newDate;
}