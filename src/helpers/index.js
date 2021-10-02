export function getCanonicalUrl({ domain, slug, utmSource }) {
  return `${domain}/development/${slug}?utm_source=${utmSource}&utm_campaign=crosspost`;
}
