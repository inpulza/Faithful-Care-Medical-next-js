import type { PublicRoute } from "./route-contract";
import {
  breadcrumbSchema,
  medicalClinicSchema,
  medicalServiceSchema,
  organizationSchema,
  physicianSchema,
  websiteSchema,
} from "../../client/src/lib/schemas";

const DOMAIN = "https://faithfulcaremedical.com";

type Schema = Record<string, any>;

const legalPaths = new Set([
  "/privacy-policy",
  "/notice-of-privacy-practices",
  "/terms-of-use",
  "/medical-disclaimer",
  "/accessibility-statement",
]);

const routeServiceOverrides: Record<string, {
  name: string;
  serviceType: string;
  category: string;
}> = {
  "/primary-care": {
    name: "Primary Care Services",
    serviceType: "Primary care",
    category: "Primary Care",
  },
  "/palliative-care": {
    name: "Palliative Care Services",
    serviceType: "Palliative care",
    category: "Palliative Care",
  },
  "/es/medico-de-familia-naples": {
    name: "Servicios de medicina familiar y atenci\u00f3n primaria",
    serviceType: "Atenci\u00f3n primaria",
    category: "Medicina familiar",
  },
  "/es/cuidados-paliativos-naples": {
    name: "Servicios de cuidados paliativos",
    serviceType: "Cuidados paliativos",
    category: "Cuidados paliativos",
  },
  "/es/seguros-y-medicare": {
    name: "Verificaci\u00f3n de cobertura de seguros y Medicare",
    serviceType: "Verificaci\u00f3n de cobertura m\u00e9dica",
    category: "Seguro m\u00e9dico",
  },
};

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
  const mainEntityId = serviceEntityId(route);
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
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
    ...(route.dateModified ? { dateModified: route.dateModified } : {}),
    ...(route.path === "/about"
      ? { mainEntity: { "@id": `${DOMAIN}/#physician` } }
      : {}),
  };
}

function serviceEntityId(route: PublicRoute): string | null {
  if (route.path === "/insurance-accepted") {
    return `${route.canonical}#insurance-verification`;
  }
  if (route.path.startsWith("/locations/")) {
    return `${DOMAIN}/#service-area-${route.path.replace("/locations/", "")}`;
  }
  if (
    route.path === "/primary-care" ||
    route.path === "/palliative-care" ||
    route.path.startsWith("/primary-care/") ||
    route.path.startsWith("/palliative-care/") ||
    route.path in routeServiceOverrides
  ) {
    return `${route.canonical}#service`;
  }
  return null;
}

function routeServiceSchema(route: PublicRoute): Schema | null {
  const service = routeServiceOverrides[route.path];
  if (!service) return null;
  return medicalServiceSchema({
    ...service,
    description: route.description,
    url: route.path,
    contactPath: route.lang === "es" ? "/es/contacto" : "/contact",
  });
}

function includesMedicalIdentity(route: PublicRoute): boolean {
  return !legalPaths.has(route.path);
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
  if (includesMedicalIdentity(route)) schemas.push(siteIdentityGraphSchema());
  schemas.push(pageSchema(route));

  const service = routeServiceSchema(route);
  if (service) schemas.push(service);

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
