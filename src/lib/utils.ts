/** General-purpose utility functions */

/**
 * Format an ISO date string to a human-readable Chinese date.
 * e.g. "2026年6月10日"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format date in ISO short form: "2026-06-10"
 */
export function formatDateISO(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

/**
 * Extract a URL-safe slug from a file path or title string.
 */
export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Merge class name strings, filtering out falsy values.
 * Minimal replacement for clsx/classnames — good enough for Astro.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Estimate reading time for mixed CJK/Latin text.
 * CJK characters count as ~1.5 words-equivalent due to density.
 */
export function readingTime(text: string): number {
  const cjkChars = (text.match(/[一-鿿㐀-䶿]/g) || []).length;
  const words = text
    .replace(/[一-鿿㐀-䶿]/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  const totalWords = words + cjkChars * 1.5;
  const minutes = Math.ceil(totalWords / 250); // 250 wpm for mixed content
  return Math.max(1, minutes);
}

/**
 * Truncate text to N characters, breaking at word boundary.
 */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

/**
 * Group an array by a key extractor function.
 */
export function groupBy<T>(items: T[], keyFn: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    const group = map.get(key);
    if (group) group.push(item);
    else map.set(key, [item]);
  }
  return map;
}
