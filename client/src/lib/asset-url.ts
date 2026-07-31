export type StaticAsset = string | { src: string };

export function assetUrl(asset: StaticAsset): string {
  if (typeof asset === "string") return asset;
  if (asset && typeof asset.src === "string") return asset.src;
  throw new TypeError("Unsupported static asset");
}
