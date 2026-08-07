import {
  Activity,
  BatteryCharging,
  Cable,
  Gauge,
  PlugZap,
  ShieldCheck,
  Sun,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Categories and services store an icon *name* in the database, so the set of
 * renderable icons is whitelisted here rather than resolved dynamically — a
 * dynamic lookup would pull the entire lucide bundle into the page.
 */
const ICONS: Record<string, LucideIcon> = {
  Activity,
  BatteryCharging,
  Cable,
  Gauge,
  PlugZap,
  ShieldCheck,
  Sun,
  Wrench,
  Zap,
};

export function ServiceIcon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const Icon = (name && ICONS[name]) || Sun;
  return <Icon className={className} aria-hidden="true" />;
}
