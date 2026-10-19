import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { WhatsAppFloat } from "@/components/marketing/whatsapp-float";
import { JsonLd } from "@/components/seo/json-ld";
import { siteGraph } from "@/lib/schema";
import type { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col overflow-x-clip bg-canvas pb-16">
      <JsonLd data={siteGraph()} />
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
