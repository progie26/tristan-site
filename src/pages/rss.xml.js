// ============================================================
// /rss.xml.js — RSS feed
// Uses @astrojs/rss to generate a valid RSS 2.0 feed.
// ============================================================

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../lib/constants";

export async function GET(context) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/writing/${post.slug}`,
      customData: post.data.lang ? `<language>${post.data.lang}</language>` : "",
    })),
    customData: `<language>zh-CN</language>`,
  });
}
