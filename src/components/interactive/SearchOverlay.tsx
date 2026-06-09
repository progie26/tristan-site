// ============================================================
// SearchOverlay.tsx — Command palette-style search panel
// Ctrl+K to open, ESC to close, keyboard navigation.
// ============================================================

"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ContentEntry {
  type: "article" | "project";
  slug: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  index: ContentEntry[];
}

export default function SearchOverlay({ open, onClose, index }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) {
      // Show all when empty query
      return index.slice(0, 8);
    }
    const q = query.toLowerCase();
    return index
      .filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .slice(0, 12);
  }, [query, index]);

  // Reset state on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      // Focus input after animation
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIdx((prev) => (prev + 1) % Math.max(results.length, 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIdx(
            (prev) => (prev - 1 + results.length) % Math.max(results.length, 1),
          );
          break;
        case "Enter":
          if (results[selectedIdx]) {
            window.location.href = results[selectedIdx].url;
          }
          break;
      }
    },
    [results, selectedIdx, onClose],
  );

  // Global Ctrl+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        } else {
          // Open handled by parent
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="search-panel"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="search-input-wrap">
              <svg className="search-input-icon" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                className="search-input"
                type="text"
                placeholder="搜索文章、项目..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIdx(0);
                }}
                onKeyDown={handleKeyDown}
              />
              <kbd className="search-kbd">ESC</kbd>
            </div>

            <div className="search-results">
              {results.length === 0 ? (
                <p className="search-empty">
                  {query ? "没有找到结果" : "输入关键词开始搜索"}
                </p>
              ) : (
                results.map((entry, i) => (
                  <a
                    key={entry.url}
                    href={entry.url}
                    className={`search-result ${i === selectedIdx ? "search-result--selected" : ""}`}
                    onMouseEnter={() => setSelectedIdx(i)}
                    onClick={onClose}
                  >
                    <div className="search-result-type">
                      {entry.type === "article" ? "文" : "项"}
                    </div>
                    <div className="search-result-body">
                      <span className="search-result-title">{entry.title}</span>
                      <span className="search-result-desc">{entry.description}</span>
                    </div>
                    <span className="search-result-arrow">↵</span>
                  </a>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
