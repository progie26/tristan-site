// ============================================================
// ExpandPanel.tsx — Card expand detail panel
// Desktop: slides in from right (60vw). Mobile: bottom sheet (85vh).
// Uses Motion for smooth transitions.
// ============================================================

"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ContentEntry {
  type: "article" | "project";
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  url: string;
  extra?: Record<string, string>;
}

interface ExpandPanelProps {
  open: boolean;
  onClose: () => void;
  entry: ContentEntry | null;
}

export default function ExpandPanel({ open, onClose, entry }: ExpandPanelProps) {
  // Lock body scroll when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && entry && (
        <>
          {/* Backdrop */}
          <motion.div
            className="expand-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Panel — responsive: right panel on desktop, bottom sheet on mobile */}
          <motion.aside
            className="expand-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 32,
            }}
            role="dialog"
            aria-modal="true"
            aria-label={entry.title}
          >
            <div className="expand-panel-inner">
              <button className="expand-panel-close" onClick={onClose} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <header className="expand-panel-header">
                <span className="expand-panel-type">
                  {entry.type === "article" ? "Article" : "Project"}
                </span>
                <h2 className="expand-panel-title">{entry.title}</h2>
                <time className="expand-panel-date">{entry.date}</time>
              </header>

              <p className="expand-panel-desc">{entry.description}</p>

              {entry.tags.length > 0 && (
                <div className="expand-panel-tags">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="expand-panel-tag">{tag}</span>
                  ))}
                </div>
              )}

              {entry.extra && Object.keys(entry.extra).length > 0 && (
                <dl className="expand-panel-extra">
                  {Object.entries(entry.extra).map(([key, val]) => (
                    <div key={key} className="expand-extra-row">
                      <dt>{key}</dt>
                      <dd>{val}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <a href={entry.url} className="expand-panel-link">
                阅读全文 →
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
