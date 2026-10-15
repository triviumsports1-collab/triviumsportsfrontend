import { routes, site, whatsappUrl } from "@/lib/site";
import { TennisMark } from "@/components/marketing/tennis-mark";

const columns = [
  {
    title: "Coaches",
    links: [
      { href: routes.coaches, label: "Coaches already in the U.S." },
      { href: routes.afterCollege, label: "Coaching after College" },
      { href: routes.jobs, label: "Tennis coaching jobs, USA" },
    ],
  },
  {
    title: "Clubs & players",
    links: [
      { href: routes.clubs, label: "Clubs & academies" },
      { href: routes.players, label: "International players" },
      { href: routes.howItWorks, label: "How it works" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: routes.about, label: "About" },
      { href: routes.faq, label: "FAQ" },
      { href: routes.contact, label: "Contact" },
      { href: routes.privacy, label: "Privacy" },
      { href: routes.login, label: "Staff sign in" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-semibold text-ink">
            <TennisMark className="h-5 w-5 text-brand" />
            {site.name}
          </p>
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            Connecting tennis coaches and players with U.S. clubs and academies.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            <a className="hover:text-ink" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <br />
            <a className="hover:text-ink" href={whatsappUrl()}>
              WhatsApp {site.whatsappDisplay}
            </a>
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold text-ink">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              {column.links.map((link) => (
                <li key={link.href}>
                  <a className="hover:text-ink" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-ink-muted sm:flex-row sm:justify-between sm:px-6">
          <p>© 2026 Trivium Sports Inc.</p>
          <p>
            <a className="hover:text-ink" href={site.instagram}>
              Instagram
            </a>
            {" · "}
            <a className="hover:text-ink" href={site.linkedin}>
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
