// ============================================================
// SearchWrapper.tsx — Manages search open state
// Listens for Ctrl+K and search button clicks.
// ============================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import SearchOverlay from "./SearchOverlay";

interface ContentEntry {
  type: "article" | "project";
  slug: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
}

interface SearchWrapperProps {
  /** Pre-built search index serialized as JSON */
  index: ContentEntry[];
}

export default function SearchWrapper({ index }: SearchWrapperProps) {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    // Ctrl+K / Cmd+K to toggle
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    // Search button in header
    const trigger = document.querySelector<HTMLButtonElement>("[data-search-trigger]");
    const handleClick = () => setOpen(true);

    trigger?.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      trigger?.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <SearchOverlay open={open} onClose={onClose} index={index} />;
}
