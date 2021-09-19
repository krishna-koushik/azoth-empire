import dayjs from 'dayjs';

export function convertToDisplayDate(dateStr) {
    console.log(dateStr);
    console.log(dayjs);
    return dayjs(dateStr).format('MMM D, YYYY . h:mm A');
}
