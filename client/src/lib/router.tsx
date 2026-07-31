"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export const Link = NextLink;

export function useLocation(): [string, (href: string) => void] {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const navigate = useCallback((href: string) => router.push(href), [router]);
  return [pathname, navigate];
}
