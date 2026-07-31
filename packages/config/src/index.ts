// Shared configuration for Al-Wahab Solar
export const APP_NAME = "Al-Wahab Solar Traders";
export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "ur"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
