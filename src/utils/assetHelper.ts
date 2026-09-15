import React from 'react';

/**
 * Universal Asset URL helper for GitHub Pages and relative subpath deployments.
 * Resolves './images/...' to appropriate Vite base or fallback SVG data URI.
 */

// Elegant fallback SVG placeholders in case an image fails to load
export const FALLBACK_ARTWORK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="none">
  <rect width="600" height="750" fill="#F4F4F5"/>
  <rect x="20" y="20" width="560" height="710" rx="16" fill="#E4E4E7"/>
  <circle cx="300" cy="320" r="90" fill="#D4D4D8"/>
  <path d="M160 520 C 220 440, 380 440, 440 520 Z" fill="#A1A1AA"/>
  <text x="50%" y="620" text-anchor="middle" fill="#71717A" font-size="20" font-family="sans-serif" font-weight="600">艺术作品展示</text>
  <text x="50%" y="650" text-anchor="middle" fill="#A1A1AA" font-size="14" font-family="sans-serif">语障青年艺术疗愈平台</text>
</svg>
`)}`;

export const FALLBACK_AVATAR_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
  <rect width="120" height="120" rx="60" fill="#E2E8F0"/>
  <circle cx="60" cy="46" r="22" fill="#94A3B8"/>
  <path d="M26 102 C 32 80, 88 80, 94 102 Z" fill="#94A3B8"/>
</svg>
`)}`;

/**
 * Resolves a given path to work properly on GitHub Pages and local Vite environments.
 * Cleans up old unpkg/cdnjs links from stale cache, normalizing to local/relative paths.
 */
export function resolveAssetUrl(url?: string, type: 'artwork' | 'avatar' | 'cover' = 'artwork'): string {
  if (!url || typeof url !== 'string') {
    return type === 'avatar' ? FALLBACK_AVATAR_SVG : FALLBACK_ARTWORK_SVG;
  }

  // If already a data URI or blob, return as is
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  // If it's a stale external URL from previous mock data, convert to local image if possible
  if (url.includes('images.unsplash.com') || url.includes('api.dicebear.com')) {
    // Return appropriate fallback
    return type === 'avatar' ? FALLBACK_AVATAR_SVG : FALLBACK_ARTWORK_SVG;
  }

  // Get Vite's base URL (e.g. "./" or "/" or "/repo-name/")
  const base = import.meta.env.BASE_URL || './';

  // Normalize path
  let cleanPath = url.trim();

  // Strip leading ./ or /
  if (cleanPath.startsWith('./')) {
    cleanPath = cleanPath.slice(2);
  } else if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }

  // Build final relative path respecting base
  const finalBase = base.endsWith('/') ? base : `${base}/`;
  return `${finalBase}${cleanPath}`;
}

/**
 * Handle img onError event cleanly
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, type: 'artwork' | 'avatar' | 'cover' = 'artwork') {
  const target = e.currentTarget;
  const fallback = type === 'avatar' ? FALLBACK_AVATAR_SVG : FALLBACK_ARTWORK_SVG;
  if (target.src !== fallback) {
    target.src = fallback;
  }
}
