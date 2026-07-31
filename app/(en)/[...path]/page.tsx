import { notFound } from "next/navigation";
import { SiteShell } from "../../site-shell";
import { metadataForRoute } from "../../lib/metadata";
import { publicRoutes, routeForPath } from "../../lib/route-contract";
import { RouteStructuredData } from "../../lib/structured-data";

interface RouteProps {
  params: Promise<{ path: string[] }>;
}

const pathFromParams = ({ path }: { path: string[] }) => `/${path.join("/")}`;

export function generateStaticParams() {
  return publicRoutes
    .filter((route) => route.lang === "en" && route.path !== "/")
    .map((route) => ({ path: route.path.slice(1).split("/") }));
}

export async function generateMetadata({ params }: RouteProps) {
  const route = routeForPath(pathFromParams(await params));
  return route?.lang === "en" ? metadataForRoute(route) : {};
}

export default async function EnglishRoutePage({ params }: RouteProps) {
  const route = routeForPath(pathFromParams(await params));
  if (!route || route.lang !== "en") notFound();
  return (
    <>
      <RouteStructuredData route={route} />
      <SiteShell />
    </>
  );
}
