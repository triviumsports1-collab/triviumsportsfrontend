import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/schema";
import { pages } from "@/lib/seo";
import { routes } from "@/lib/site";

export function PageSeo({
  page,
  crumbName,
  extras = [],
  type,
}: {
  page: keyof typeof pages;
  crumbName: string;
  extras?: unknown[];
  type?: string;
}) {
  const seo = pages[page];
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: seo.path,
          name: seo.title,
          description: seo.description,
          type,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: routes.home },
          { name: crumbName, path: seo.path },
        ])}
      />
      {extras.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}
    </>
  );
}
