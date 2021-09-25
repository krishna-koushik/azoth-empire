import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// const utc = require('dayjs/plugin/utc')
// const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');

export function convertToDisplayDate(dateStr) {
    return dayjs(dateStr).format('MMM D, YYYY . h:mm A');
}
