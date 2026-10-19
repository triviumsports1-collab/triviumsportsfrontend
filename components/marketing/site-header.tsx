"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mobileNav, primaryNav, routes } from "@/lib/site";
import { TriviumLogo } from "@/components/marketing/tennis-mark";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlay = isHome && !scrolled && !open;

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-40 border-b border-white/10 bg-transparent"
          : "sticky top-0 z-40 border-b border-white/10 bg-[#0F1C16]"
      }
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <a href={routes.home} className="flex min-h-11 items-center" aria-label="Trivium Sports home">
          <TriviumLogo />
        </a>

        <nav
          className="hidden items-center gap-7 text-sm font-medium text-white/90 xl:flex"
          aria-label="Primary"
        >
          {primaryNav.map((link) => {
            const current =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <a
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={current ? "inline-flex min-h-11 items-center text-white" : "inline-flex min-h-11 items-center hover:text-white"}
                aria-current={current ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={routes.getStarted}
            className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/30 text-white xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="text-lg leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#0F1C16] px-4 py-3 xl:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col pb-4" aria-label="Mobile">
            {mobileNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-white hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={routes.getStarted}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-ink"
              onClick={() => setOpen(false)}
            >
              Get Started
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
