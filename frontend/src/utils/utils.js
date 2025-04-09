export const daysAgo = (passedDate) => {
    const dateFromBackend = new Date(passedDate);
    const today = new Date();
    const differenceInMilliseconds = today - dateFromBackend;
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return days;
}