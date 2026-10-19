import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Trivium Sports"
      className="fixed bottom-4 right-4 z-50 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#25D366] px-3 text-sm font-semibold text-ink shadow-[0_10px_30px_rgba(15,28,22,0.28)]"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10.1 10.1 0 0 0 4.65 1.12h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.89c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.39 1.02-.39h.73c.23 0 .54-.09.85.64.32.76 1.08 2.62 1.18 2.81.1.19.16.42.03.67-.13.26-.2.42-.39.64-.19.22-.4.5-.57.67-.19.19-.39.4-.17.77.22.37 1 1.64 2.14 2.66 1.47 1.31 2.71 1.72 3.08 1.91.37.19.59.16.8-.1.22-.26.92-1.07 1.16-1.44.24-.37.49-.31.82-.19.33.13 2.1.99 2.46 1.17.36.18.6.27.69.42.08.16.08.9-.16 1.58Z" />
      </svg>
      <span className="pr-1">WhatsApp</span>
    </a>
  );
}
