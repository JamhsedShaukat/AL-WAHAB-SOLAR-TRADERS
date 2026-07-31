import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/brand/logo-mark";

const productLinks = [
  { label: "Get an estimate", href: "/estimate" },
  { label: "How it works", href: "/#how" },
  { label: "Why us", href: "/#why" },
  { label: "FAQ", href: "/faq" },
] as const;

const companyLinks = [
  { label: "About Al-Wahab", href: "/about" },
  { label: "Our warranty", href: "/about#warranty" },
  { label: "Net metering guide", href: "/faq#net-metering" },
  { label: "Contact", href: "/contact" },
] as const;

const contactInfo = [
  { label: "Lahore, Pakistan", href: "#" },
  { label: "info@alwahabsolar.pk", href: "mailto:info@alwahabsolar.pk" },
  { label: "+92 42 111 765 765", href: "tel:+924211176576" },
  { label: "WhatsApp us", href: "https://wa.me/924211176576" },
] as const;

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
        <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21h-4z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
        <path d="M17.5 3h3l-7.1 8.1L22 21h-6.2l-4.3-5.6L6.3 21H3.3l7.6-8.7L2.5 3h6.3l3.9 5.2zm-1.1 16h1.7L7.6 4.8H5.8z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
        <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zm4.9-8.3a1.12 1.12 0 1 0 1.12 1.12A1.12 1.12 0 0 0 16.9 6.8zM21 8.5a6.6 6.6 0 0 0-.45-2.18 4.4 4.4 0 0 0-2.52-2.52A6.6 6.6 0 0 0 15.85 3.3C14.9 3.26 14.6 3.25 12 3.25s-2.9.01-3.85.05A6.6 6.6 0 0 0 5.97 3.8a4.4 4.4 0 0 0-2.52 2.52A6.6 6.6 0 0 0 3 8.5C2.96 9.45 2.95 9.75 2.95 12s.01 2.55.05 3.5a6.6 6.6 0 0 0 .45 2.18 4.4 4.4 0 0 0 2.52 2.52 6.6 6.6 0 0 0 2.18.45c.95.04 1.25.05 3.85.05s2.9-.01 3.85-.05a6.6 6.6 0 0 0 2.18-.45 4.4 4.4 0 0 0 2.52-2.52 6.6 6.6 0 0 0 .45-2.18c.04-.95.05-1.25.05-3.5s-.01-2.55-.05-3.5zm-1.8 6.92a4.8 4.8 0 0 1-.33 1.67 2.9 2.9 0 0 1-1.66 1.66 4.8 4.8 0 0 1-1.67.33c-.94.04-1.22.05-3.74.05s-2.8-.01-3.74-.05a4.8 4.8 0 0 1-1.67-.33 2.9 2.9 0 0 1-1.66-1.66 4.8 4.8 0 0 1-.33-1.67c-.04-.94-.05-1.22-.05-3.74s.01-2.8.05-3.74a4.8 4.8 0 0 1 .33-1.67 2.9 2.9 0 0 1 1.66-1.66 4.8 4.8 0 0 1 1.67-.33c.94-.04 1.22-.05 3.74-.05s2.8.01 3.74.05a4.8 4.8 0 0 1 1.67.33 2.9 2.9 0 0 1 1.66 1.66 4.8 4.8 0 0 1 .33 1.67c.04.94.05 1.22.05 3.74s-.01 2.8-.05 3.74z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
        <path d="M23 8.2a3 3 0 0 0-2.1-2.13C19.1 5.6 12 5.6 12 5.6s-7.1 0-8.9.47A3 3 0 0 0 1 8.2 31 31 0 0 0 .65 12 31 31 0 0 0 1 15.8a3 3 0 0 0 2.1 2.13c1.8.47 8.9.47 8.9.47s7.1 0 8.9-.47A3 3 0 0 0 23 15.8 31 31 0 0 0 23.35 12 31 31 0 0 0 23 8.2zM9.75 15.4V8.6l5.9 3.4z" />
      </svg>
    ),
  },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-[#060a14] pt-16 pb-8">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-gold to-amber shadow-mark">
                <LogoMark className="h-5 w-5 text-navy-950" />
              </span>
              <span className="font-display text-[19px] font-semibold tracking-tight text-white">
                Al-Wahab <span className="text-gold">Solar Traders</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-slate-400">
              Lahore&apos;s honest solar estimator. Price your system, book a
              free survey, and let our own certified team install it.{" "}
              <span className="font-semibold text-gold">Shine On!</span>
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/3 text-slate-400 transition-all duration-200 hover:border-gold/50 hover:text-gold hover:shadow-[0_0_18px_-4px_rgba(255,184,0,0.6)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-slate-500">
              Product
            </h4>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring rounded text-[14.5px] text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-slate-500">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring rounded text-[14.5px] text-slate-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-slate-500">
              Contact
            </h4>
            <ul className="mt-4 space-y-2.5">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="focus-ring rounded text-[14.5px] text-slate-400 transition-colors duration-200 hover:text-white"
                    {...(item.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-6 text-[13px] text-slate-500 sm:flex-row">
          <span>© 2026 Al-Wahab Solar Traders. All rights reserved.</span>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="focus-ring rounded transition-colors hover:text-slate-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="focus-ring rounded transition-colors hover:text-slate-300"
            >
              Terms
            </Link>
            <Link
              href="/sitemap.xml"
              className="focus-ring rounded transition-colors hover:text-slate-300"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
