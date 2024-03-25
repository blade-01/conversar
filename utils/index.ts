import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";

/**
 * Format date
 * @param date
 * @param format?
 * @returns string
 */

export function formatDate(
  date: string | number | Date,
  format: string = "DD/MM/YYYY"
): string {
  return dayjs(date).format(format);
}

/**
 * Check if date is in future
 * @param date
 * @returns boolean
 */
export function isDateInFuture(date: string | number | Date): boolean {
  return dayjs(date).isAfter(dayjs());
}

/**
 * Check if the date is today
 * @param string
 * @returns boolean
 */
export function isDateToday(date: string | number | Date): boolean {
  return dayjs(date).isSame(dayjs(), "day");
}

/**
 * Show relative time
 * @param date
 * @param format?
 * @returns string
 */

export function showRelativeTime(
  date: string | number | Date,
  format: string = "DD/MM/YYYY"
): string {
  dayjs.extend(relativetime);
  return dayjs(date).isAfter(dayjs().subtract(7, "day"))
    ? dayjs(date).fromNow()
    : dayjs(date).format(format);
}

/**
 * Capitalize first letter
 */
export function capitalizeFirstLetter(string: string): string {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

/**
 * Truncate string
 */
export function truncateString(str: string, num: number): string {
  if (str === null || str === undefined || str === "") {
    return "";
  }
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

/**
 * Insert at cursor
 * @param originalText
 * @param emoji
 * @param cursorPosition
 */

export function insertAtCursor(
  originalText: any,
  emoji: any,
  cursorPosition: any
) {
  return (
    originalText.substring(0, cursorPosition) +
    emoji +
    originalText.substring(cursorPosition, originalText.length)
  );
}
