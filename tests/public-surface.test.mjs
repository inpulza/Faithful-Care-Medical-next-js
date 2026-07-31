import assert from "node:assert/strict";
import { test } from "node:test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:3100";
const { publicRoutes, redirectRules } = await import(new URL("../app/lib/route-contract.ts", import.meta.url).href);

function attr(html, selectorName) {
  const pattern = new RegExp(`<[^>]+${selectorName}=["']([^"']+)["'][^>]*>`, "i");
  return html.match(pattern)?.[1];
}

test("all 37 canonical routes return indexable localized HTML", async () => {
  const results = await Promise.all(publicRoutes.map(async (route) => {
    const response = await fetch(`${baseUrl}${route.path}`, { redirect: "manual" });
    return { route, response, html: await response.text() };
  }));

  for (const { route, response, html } of results) {
    assert.equal(response.status, 200, `${route.path} returned ${response.status}`);
    assert.match(response.headers.get("content-type") || "", /text\/html/);
    assert.match(html, new RegExp(`<html[^>]+lang=["']${route.lang}["']`, "i"), `${route.path} lang`);
    assert.match(html, /<title>[^<]+<\/title>/i, `${route.path} title`);
    assert.match(html, /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i, `${route.path} description`);
    assert.ok(html.includes(`href="${route.canonical}"`) && html.includes('rel="canonical"'), `${route.path} canonical`);
    assert.doesNotMatch(html, /\[object Object\]/, `${route.path} serialized object`);
    assert.doesNotMatch(html, /noindex/i, `${route.path} unexpectedly noindex`);
  }
});

test("all approved aliases return permanent redirects to their canonicals", async () => {
  const results = await Promise.all(redirectRules.map(async (rule) => {
    const response = await fetch(`${baseUrl}${rule.source}`, { redirect: "manual" });
    return { rule, response };
  }));

  for (const { rule, response } of results) {
    assert.equal(response.status, 301, `${rule.source} returned ${response.status}`);
    const location = response.headers.get("location");
    assert.ok(location, `${rule.source} omitted Location`);
    const target = new URL(location, baseUrl);
    assert.equal(`${target.pathname}${target.hash}`, rule.destination, `${rule.source} destination`);
  }
});

test("discovery files expose every canonical route", async () => {
  const [sitemapResponse, robotsResponse, llmsResponse] = await Promise.all([
    fetch(`${baseUrl}/sitemap.xml`),
    fetch(`${baseUrl}/robots.txt`),
    fetch(`${baseUrl}/llms.txt`),
  ]);
  const [sitemap, robots, llms] = await Promise.all([
    sitemapResponse.text(),
    robotsResponse.text(),
    llmsResponse.text(),
  ]);

  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") || "", /xml/);
  for (const route of publicRoutes) assert.ok(sitemap.includes(route.canonical), `sitemap missing ${route.path}`);

  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /User-agent: \*/i);
  assert.match(robots, /Sitemap: https:\/\/faithfulcaremedical\.com\/sitemap\.xml/);

  assert.equal(llmsResponse.status, 200);
  assert.match(llms, /Faithful Care Medical Services/);
  assert.match(llms, /\(239\) 423-0205/);
});
