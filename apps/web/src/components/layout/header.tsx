"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { useLocale } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translations/en";

const navItems: { key: TranslationKey; href: string }[] = [
  { key: "nav.home", href: "/" },
  { key: "nav.how", href: "/#how" },
  { key: "nav.why", href: "/#why" },
  { key: "nav.about", href: "/about" },
  { key: "nav.faq", href: "/faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-5",
      )}
    >
      <div className="mx-auto w-full max-w-300 px-6 sm:px-10">
        {/* ─── Inner nav bar ─── */}
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 sm:px-5 transition-all duration-300 py-2",
            scrolled && "glass-strong",
          )}
        >
          {/* Logo */}
          <Logo />

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-lg px-3.5 py-2 text-[14.5px] font-medium text-slate-300 transition-colors duration-200 hover:bg-white/6 hover:text-white"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div
              className="hidden items-center rounded-full border border-white/10 bg-white/4 p-0.5 text-[13px] font-medium sm:inline-flex"
              role="group"
              aria-label="Language"
            >
              <button
                onClick={() => setLocale("en")}
                className={cn(
                  "focus-ring rounded-full px-2.5 py-1 transition-colors duration-200",
                  locale === "en" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                )}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("ur")}
                className={cn(
                  "focus-ring rounded-full px-2.5 py-1 transition-colors duration-200",
                  locale === "ur" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                )}
              >
                اردو
              </button>
            </div>

            {/* CTA — desktop */}
            <div className="hidden sm:block">
              <Link
                href="/estimate"
                className="focus-ring group relative inline-flex items-center justify-center overflow-hidden rounded-xl transition-all duration-200 active:scale-[0.96] text-sm px-4 py-2 gap-1.5 text-navy-950 font-semibold bg-linear-to-r from-gold to-amber shadow-cta hover:shadow-cta-hover hover:brightness-105 animate-glow"
              >
                <Zap className="h-4.5 w-4.5" aria-hidden="true" />
                <span className="relative z-10 whitespace-nowrap">
                  {t("nav.cta")}
                </span>
              </Link>
            </div>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/4 text-white transition-colors hover:bg-white/8 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* ─── Mobile drawer ─── */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 lg:hidden",
            mobileOpen ? "max-h-105 opacity-100 mt-2" : "max-h-0 opacity-0",
          )}
        >
          <div className="glass-strong rounded-2xl p-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="focus-ring block rounded-xl px-4 py-3 text-[15px] font-medium text-slate-200 transition-colors hover:bg-white/6 hover:text-white"
              >
                {t(item.key)}
              </Link>
            ))}

            {/* Language in mobile */}
            <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-2">
              <span className="text-[12px] uppercase tracking-wider text-slate-500">
                {t("common.language")}
              </span>
              <div
                className="inline-flex items-center rounded-full border border-white/10 bg-white/4 p-0.5 text-[13px] font-medium"
                role="group"
                aria-label="Language"
              >
                <button
                  onClick={() => setLocale("en")}
                  className={cn(
                    "focus-ring rounded-full px-2.5 py-1 transition-colors duration-200",
                    locale === "en" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLocale("ur")}
                  className={cn(
                    "focus-ring rounded-full px-2.5 py-1 transition-colors duration-200",
                    locale === "ur" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  اردو
                </button>
              </div>
            </div>

            {/* CTA in mobile */}
            <div className="p-2">
              <Link
                href="/estimate"
                onClick={() => setMobileOpen(false)}
                className="focus-ring group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl transition-all duration-200 active:scale-[0.96] text-[15px] px-6 py-3 gap-2 text-navy-950 font-semibold bg-linear-to-r from-gold to-amber shadow-cta hover:shadow-cta-hover hover:brightness-105 animate-glow"
              >
                <Zap className="h-4.5 w-4.5" aria-hidden="true" />
                <span className="relative z-10 whitespace-nowrap">
                  {t("nav.cta.long")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
