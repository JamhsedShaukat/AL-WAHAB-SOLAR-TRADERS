/**
 * Formats a PKR amount that arrived from the API as a string (Decimal columns
 * are serialised as strings so precision survives JSON).
 */
export function formatPkr(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "";
  const amount = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(amount)) return "";

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Warranty in months → "25 years" / "18 months", whichever reads better. */
export function formatWarranty(months: number | null | undefined): string | null {
  if (!months) return null;
  if (months % 12 === 0) {
    const years = months / 12;
    return `${years} year${years === 1 ? "" : "s"}`;
  }
  return `${months} months`;
}
