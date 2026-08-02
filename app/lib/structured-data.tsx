import type { PublicRoute } from "./route-contract";
import {
  breadcrumbSchema,
  medicalClinicSchema,
  organizationSchema,
  physicianSchema,
  websiteSchema,
} from "../../client/src/lib/schemas";

const DOMAIN = "https://faithfulcaremedical.com";

type Schema = Record<string, any>;

const breadcrumbLabelOverrides: Record<string, string> = {
  "/": "Home",
  "/es": "Inicio",
  "/primary-care": "Primary Care",
  "/palliative-care": "Palliative Care",
  "/insurance-accepted": "Insurance Accepted",
  "/new-patients": "New Patients",
  "/medicare": "Medicare",
  "/about": "Dr. Addys Reve, MD",
  "/reviews": "Patient Reviews",
  "/contact": "Contact",
  "/es/medico-de-familia-naples": "Médico de Familia",
  "/es/cuidados-paliativos-naples": "Cuidados Paliativos",
  "/es/seguros-y-medicare": "Seguros y Medicare",
  "/es/contacto": "Contacto",
};

function withoutContext(schema: Schema): Schema {
  const { "@context": _context, ...entity } = schema;
  return entity;
}

function concisePageName(route: PublicRoute): string {
  const override = breadcrumbLabelOverrides[route.path];
  if (override) return override;
  return route.title.split(" | ")[0].split(": ")[0];
}

function pageSchema(route: PublicRoute): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${route.canonical}#webpage`,
    url: route.canonical,
    name: route.title,
    description: route.description,
    inLanguage: route.lang === "es" ? "es-US" : "en-US",
    isPartOf: { "@id": `${DOMAIN}/#website` },
    publisher: { "@id": `${DOMAIN}/#organization` },
    ...(route.dateModified ? { dateModified: route.dateModified } : {}),
    ...(route.path === "/about"
      ? { mainEntity: { "@id": `${DOMAIN}/#physician` } }
      : {}),
  };
}

function breadcrumbItems(route: PublicRoute): { name: string; path: string }[] | null {
  if (route.path === "/" || route.path === "/es") return null;

  const home = route.lang === "es"
    ? { name: "Inicio", path: "/es" }
    : { name: "Home", path: "/" };
  const items = [home];

  if (route.path.startsWith("/primary-care/")) {
    items.push({ name: "Primary Care", path: "/primary-care" });
  } else if (route.path.startsWith("/palliative-care/")) {
    items.push({ name: "Palliative Care", path: "/palliative-care" });
  }

  items.push({ name: concisePageName(route), path: route.path });
  return items;
}

export function siteIdentityGraphSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      medicalClinicSchema(),
      websiteSchema(),
      physicianSchema(),
    ].map(withoutContext),
  };
}

export function schemasForRoute(route: PublicRoute): Schema[] {
  const schemas: Schema[] = [];
  if (route.path === "/") schemas.push(siteIdentityGraphSchema());
  schemas.push(pageSchema(route));

  const items = breadcrumbItems(route);
  if (items) schemas.push(breadcrumbSchema(items));
  return schemas;
}

export function serializeJsonLd(data: Schema): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function RouteStructuredData({ route }: { route: PublicRoute }) {
  return (
    <>
      {schemasForRoute(route).map((schema, index) => (
        <script
          key={`${route.path}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
    </>
  );
}
