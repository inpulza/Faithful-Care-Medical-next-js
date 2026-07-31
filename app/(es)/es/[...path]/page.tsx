import { notFound } from "next/navigation";
import { SiteShell } from "../../../site-shell";
import { metadataForRoute } from "../../../lib/metadata";
import { publicRoutes, routeForPath } from "../../../lib/route-contract";

interface RouteProps {
  params: Promise<{ path: string[] }>;
}

const pathFromParams = ({ path }: { path: string[] }) => `/es/${path.join("/")}`;

export function generateStaticParams() {
  return publicRoutes
    .filter((route) => route.lang === "es" && route.path !== "/es")
    .map((route) => ({ path: route.path.slice(4).split("/") }));
}

export async function generateMetadata({ params }: RouteProps) {
  const route = routeForPath(pathFromParams(await params));
  return route?.lang === "es" ? metadataForRoute(route) : {};
}

export default async function SpanishRoutePage({ params }: RouteProps) {
  const route = routeForPath(pathFromParams(await params));
  if (!route || route.lang !== "es") notFound();
  return <SiteShell />;
}
