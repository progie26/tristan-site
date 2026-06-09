/** Site-wide constants — metadata, nav links, social links */

export const SITE = {
  title: "Tristan Chen",
  titleZh: "Tristan 的数字桌面",
  description:
    "学生、写代码、学机器学习。这里是我的项目、笔记和偶尔的想法。",
  descriptionEn:
    "Student, developer, ML learner. Projects, notes, and occasional thoughts.",
  url: "https://tristanchen.me",
  author: "Tristan Chen",
  authorEmail: "tristan.cl3@outlook.com",
  locale: "zh-CN",
  /** Year the site was first published */
  since: 2026,
} as const;

export const NAV_LINKS = [
  { href: "/writing", label: "Writing", labelZh: "文章" },
  { href: "/projects", label: "Projects", labelZh: "项目" },
  { href: "/about", label: "About", labelZh: "关于" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/tristanchen",
  email: "tristan.cl3@outlook.com",
  rss: "/rss.xml",
} as const;

export const COPYRIGHT = `© ${SITE.since} ${SITE.author}. Built with Astro.`;
