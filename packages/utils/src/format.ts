/** Format a number as a currency string. Defaults to Pakistani Rupees. */
export function formatCurrency(amount: number, currency = "PKR"): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a number with locale-aware thousands separators. */
export function formatNumber(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat("en-PK", { maximumFractionDigits }).format(
    value,
  );
}

/** Format a date as e.g. "12 Mar 2026". */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);
}
