import { ContactForm } from "@/components/forms/contact-form";
import { FramedPhoto, PageHero, Section } from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappUrl, routes } from "@/lib/site";

export const metadata = pageMetadata("contact");

export default function ContactPage() {
  return (
    <main>
      <PageSeo page="contact" crumbName="Contact" type="ContactPage" />
      <PageHero
        crumbs={[{ name: "Contact", href: routes.contact }]}
        kicker="Contact"
        title="Talk with the tennis team."
        lede="Get in touch when you’re ready to talk about courts, calendars, and who should be on them. We reply as people."
        image="/images/coaches-hero.jpg"
        imageAlt="Coaching on an outdoor hard court"
      />

      <Section tone="elevated">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <FramedPhoto src="/images/clubs-hero.jpg" alt="Empty hard courts at a tennis club" />
            <h2 className="mt-8 text-2xl font-semibold tracking-tight">Direct lines</h2>
            <ul className="mt-6 space-y-4 text-base text-ink-muted">
              <li>
                <span className="block text-sm font-semibold text-ink">Email</span>
                <a className="text-brand-deep hover:text-ink" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>
                <span className="block text-sm font-semibold text-ink">WhatsApp</span>
                <a className="inline-flex min-h-11 items-center text-brand-deep hover:text-ink" href={whatsappUrl()}>
                  {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <span className="block text-sm font-semibold text-ink">Instagram</span>
                <a className="text-brand-deep hover:text-ink" href={site.instagram}>
                  @triviumsports
                </a>
              </li>
              <li>
                <span className="block text-sm font-semibold text-ink">LinkedIn</span>
                <a className="text-brand-deep hover:text-ink" href={site.linkedin}>
                  Trivium Sports
                </a>
              </li>
            </ul>
            <p className="mt-8 text-sm leading-6 text-ink-muted">
              For a structured conversation, use{" "}
              <a className="font-medium text-ink underline" href={routes.getStarted}>
                Get started
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Message</h2>
            <p className="mt-2 mb-6 text-sm text-ink-muted">
              Send a note about tennis coaching, a player stay, or a club search. We will not ask
              you to attach passports or EADs on this form.
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </main>
  );
}
