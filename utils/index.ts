import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";

/**
 * Get status color
 * @param status
 * @returns string
 */
export function getStatusBadge(status: string): string {
  if (
    status === "failed" ||
    status === "error" ||
    status === "rejected" ||
    status === "inactive" ||
    status === "deactivated"
  ) {
    return "badge-danger";
  } else if (
    status === "successful" ||
    status === "success" ||
    status === "completed" ||
    status === "complete" ||
    status === "paid" ||
    status === "approved" ||
    status === "active" ||
    status === "activated"
  ) {
    return "badge-success";
  } else if (status === "neutral") {
    return "badge-info";
  } else {
    return "badge-default";
  }
}

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
 * Group array of objects by key
 */
export function groupBy<T>(array: any[], callback: (item: T) => string) {
  return array.reduce((acc, item) => {
    const key = callback(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc as T;
  }, {});
}

/**
 * Format currency
 */

export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(amount);
}
