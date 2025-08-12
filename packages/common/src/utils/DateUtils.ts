import dayjs, { OpUnitType, QUnitType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import weekdayPlugin from 'dayjs/plugin/weekday';
import advancedFormatPlugin from 'dayjs/plugin/advancedFormat';
import isTodayPlugin from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekdayPlugin);
dayjs.extend(advancedFormatPlugin);
dayjs.extend(isTodayPlugin);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

dayjs.tz.setDefault('America/Vancouver');

export { dayjs };

/**
 * Creates a wrapped dayjs object from the given date
 */
export const dater = (date?: Date | string | number) =>
  dayjs(date).tz('America/Vancouver');

/**
 * Converts the given time to a dayjs object
 * @param time
 */
export const timeToDater = (time: string) => {
  const format = time.length === 5 ? 'HH:mm' : 'HH:mm:ss';
  return dayjs.tz(time, format, 'America/Vancouver');
};

/**
 * Converts the given time to a date
 * @param time
 */
export const timeToDate = (time: string) => {
  return timeToDater(time).toDate();
};

/**
 * Checks if the given date is today
 */
export const isToday = (value: Date): boolean => {
  const date = dater(value);
  const today = dater();

  return (
    date.year() === today.year() &&
    date.month() === today.month() &&
    date.day() === today.day()
  );
};

/**
 * Returns true if the date is in the past
 */
export const isPast = (date: Date | string) => {
  const day = dater(date).format('YYYY-MM-DD');
  const today = dater().format('YYYY-MM-DD');

  return dater(day).isBefore(today);
};

/**
 * Returns true if the date is in the future
 */
export const isFuture = (date: Date | string) => {
  const day = dater(date).format('YYYY-MM-DD');
  const today = dater().format('YYYY-MM-DD');

  return dater(day).isAfter(today);
};


/**
 * Returns true if the given date is older than 18 years
 * @param date
 */
export const isValid = (date: string | Date | null | undefined): boolean => {
  if (!date) {
    return false;
  }

  return dater(date).isValid();
};

export const isValidDate = isValid;

/**
 * Returns the date in the given format
 * @param format
 * @param date
 * @param noValue
 */
export const formatted = (
  format: string,
  date?: Date | string | null,
  noValue?: string,
): string => {
  if (!date) {
    if (noValue) {
      return noValue;
    }

    return 'N/A';
  }

  return dater(date).format(format);
};

/**
 * Returns the date diff from now
 * @param date
 */
export const fromNow = (date: Date | string | null) => {
  if (date === null) {
    return 'N/A';
  }

  const value = dater(date);
  if (!value.isValid()) {
    return 'N/A';
  }

  return value.fromNow();
};

/**
 * Returns the diff in the given unit
 * @param date
 * @param unit
 */
export const diffFromNow = (
  date: Date | string | null,
  unit: QUnitType = 'minute',
) => {
  if (!date) {
    return 0;
  }

  return Math.round(dater(date).diff(dater(), unit, true));
};

/**
 * Finds the diff
 * @param date1
 * @param date2
 * @param unit
 */
export const diff = (
  date1: Date | string | null | undefined,
  date2: Date | string | null | undefined,
  unit: QUnitType | OpUnitType,
) => {
  if (!date1 || !date2) {
    return null;
  }
  return dater(date1).diff(dater(date2), unit);
};

export const isDateString = (str?: string): boolean => {
  if (!str) {
    return false;
  }

  const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}/;

  if (!dateOnlyPattern.test(str)) {
    return false;
  }

  const date = new Date(str);
  return !Number.isNaN(date.getTime());
};
