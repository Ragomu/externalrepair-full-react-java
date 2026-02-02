import moment from 'moment';

export const ISO_DATE = 'YYYY-MM-DDTHH:mm:ss';
export const ISO_DATE_INPUT = 'YYYY-MM-DD';
export const SCREEN_DATE = 'DD/MM/YYYY';
export const SHORT_DATE = 'DD/MM/YYYY';
export const LONG_DATE = 'D [de] MMMM';
export const HOUR_MINUTE = 'HH:mm';

export const formatToScreenDate = (date: Date): string =>
  moment.utc(date, ISO_DATE_INPUT).format(SCREEN_DATE);

export const formatScreenDateToISO = (date: Date): string =>
  moment.utc(date, SHORT_DATE).format(ISO_DATE);

export const formatShortDate = (date: Date): string =>
  moment.utc(date).format(SHORT_DATE);

export const formatLongDate = (date: Date): string =>
  moment.utc(date).format(LONG_DATE);

export const formatHourMinuteDate = (date: Date): string =>
  moment(date).format(HOUR_MINUTE);

export const formatToInputDate = (dateStr: string): string =>
  moment(dateStr, SCREEN_DATE).format(ISO_DATE_INPUT);
