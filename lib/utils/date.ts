/**
 * Calculate the next Sunday at 16h Brasília time (19h UTC)
 * @returns Date object of the next Sunday at 16h Brasília
 */
export function getNextSundayAt16hBrasilia(): Date {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const hourUTC = now.getUTCHours();

    let daysToAdd = 0;
    if (dayOfWeek === 0 && hourUTC >= 19) {
        daysToAdd = 7; // Today is Sunday after 19h UTC, go to next Sunday
    } else if (dayOfWeek !== 0) {
        daysToAdd = (7 - dayOfWeek) % 7 || 7; // Days until next Sunday
    }

    const nextSunday = new Date(now);
    nextSunday.setUTCDate(now.getUTCDate() + daysToAdd);
    nextSunday.setUTCHours(19, 0, 0, 0); // 19h UTC = 16h Brasília

    return nextSunday;
}
