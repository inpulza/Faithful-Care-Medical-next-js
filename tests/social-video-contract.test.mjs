import assert from "node:assert/strict";
import { test } from "node:test";

const { SOCIAL_PROFILES, SOCIAL_VIDEOS, socialVideosFor } = await import(
  new URL("../shared/social-videos.ts", import.meta.url).href
);
const { organizationSchema } = await import(
  new URL("../client/src/lib/schemas.ts", import.meta.url).href
);

test("social video catalog contains only verified, complete, unique entries", () => {
  assert.equal(SOCIAL_VIDEOS.length, 6);
  assert.equal(new Set(SOCIAL_VIDEOS.map(({ slug }) => slug)).size, SOCIAL_VIDEOS.length);
  assert.equal(new Set(SOCIAL_VIDEOS.map(({ tiktokUrl }) => tiktokUrl)).size, SOCIAL_VIDEOS.length);

  for (const video of SOCIAL_VIDEOS) {
    assert.match(video.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(video.uploadDate, /^2026-07-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
    assert.ok(video.durationSeconds >= 30 && video.durationSeconds <= 90);
    assert.match(video.thumbnailUrl, /^\/images\/social-videos\/[a-z0-9-]+\.webp$/);
    assert.match(video.tiktokUrl, /^https:\/\/www\.tiktok\.com\/@addysrevemd\/video\/\d+$/);
    assert.match(video.instagramUrl, /^https:\/\/www\.instagram\.com\/addysreve\/reel\/[A-Za-z0-9_-]+\/$/);
    assert.deepEqual(video.placements, [
      "home",
      "naples",
      "insurance-accepted",
      "primary-care",
      "palliative-care",
    ]);
  }

  for (const placement of SOCIAL_VIDEOS[0].placements) {
    assert.deepEqual(socialVideosFor(placement).map(({ slug }) => slug), SOCIAL_VIDEOS.map(({ slug }) => slug));
  }
});

test("organization identity graph uses the central verified profile registry", () => {
  assert.deepEqual(SOCIAL_PROFILES, {
    facebook: "https://www.facebook.com/addysrevemd/",
    instagram: "https://www.instagram.com/addysreve/",
    tiktok: "https://www.tiktok.com/@addysrevemd",
  });
  const sameAs = organizationSchema().sameAs;
  for (const profile of Object.values(SOCIAL_PROFILES)) assert.ok(sameAs.includes(profile));
  assert.equal(sameAs.some((url) => /youtube/i.test(url)), false, "must not invent an unverified YouTube channel");
});
