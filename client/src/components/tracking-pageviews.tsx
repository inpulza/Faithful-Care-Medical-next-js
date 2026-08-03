import * as React from "react";
import { useLocation } from "@/lib/router";
import { trackPageView } from "@/lib/analytics";

export function TrackingPageviews() {
  const [location] = useLocation();

  React.useEffect(() => {
    trackPageView();
  }, [location]);

  return null;
}
