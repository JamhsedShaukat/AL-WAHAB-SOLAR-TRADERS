import {
  Activity,
  BarChart3,
  Bell,
  ClipboardList,
  Coins,
  FileText,
  FolderKanban,
  Gauge,
  LayoutDashboard,
  ScrollText,
  Settings,
  ShieldCheck,
  Star,
  Tags,
  UserRound,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PermissionKey } from "@wahab/types";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /**
   * Permission required to see this entry. Enforced server-side once the auth
   * module lands; see docs/05-admin-panel.md for the full permission matrix.
   */
  permission?: PermissionKey;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

/** Client portal navigation — see docs/04-information-architecture.md §route map. */
export const PORTAL_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Estimates", href: "/estimates", icon: FileText },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Profile", href: "/profile", icon: UserRound },
];

/** Admin portal navigation — mirrors docs/05-admin-panel.md §1.1. */
export const ADMIN_NAV: NavSection[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        permission: "dashboard.view",
      },
    ],
  },
  {
    label: "Manage",
    items: [
      {
        label: "Users",
        href: "/admin/users",
        icon: Users,
        permission: "users.read",
      },
      {
        label: "Estimations",
        href: "/admin/estimates",
        icon: FileText,
        permission: "estimates.read",
      },
      {
        label: "Projects",
        href: "/admin/projects",
        icon: FolderKanban,
        permission: "projects.read",
      },
      {
        label: "Leads",
        href: "/admin/leads",
        icon: ClipboardList,
        permission: "leads.read",
      },
      {
        label: "Reviews",
        href: "/admin/reviews",
        icon: Star,
        permission: "reviews.moderate",
      },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        label: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
        permission: "analytics.view",
      },
      {
        label: "Visitor traffic",
        href: "/admin/traffic",
        icon: Gauge,
        permission: "traffic.view",
      },
      {
        label: "Revenue",
        href: "/admin/revenue",
        icon: Coins,
        permission: "revenue.view",
      },
      {
        label: "Activity logs",
        href: "/admin/activity",
        icon: Activity,
        permission: "activity.view",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        label: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
        permission: "notifications.send",
      },
      {
        label: "Pricing",
        href: "/admin/pricing",
        icon: Tags,
        permission: "pricing.read",
      },
      {
        label: "Content",
        href: "/admin/content",
        icon: FileText,
        permission: "content.write",
      },
      {
        label: "Roles & permissions",
        href: "/admin/roles",
        icon: ShieldCheck,
        permission: "roles.manage",
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
        permission: "settings.read",
      },
      {
        label: "Audit logs",
        href: "/admin/audit",
        icon: ScrollText,
        permission: "audit.view",
      },
    ],
  },
];
