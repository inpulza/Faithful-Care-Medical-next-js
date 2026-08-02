import { SiteShell } from "../../site-shell";
import { metadataForRoute } from "../../lib/metadata";
import { routeForPath } from "../../lib/route-contract";
import { RouteStructuredData } from "../../lib/structured-data";

const route = routeForPath("/es")!;
export const metadata = metadataForRoute(route);

export default function SpanishHomePage() {
  return (
    <>
      <RouteStructuredData route={route} />
      <SiteShell />
    </>
  );
}
