// ============================================================
// FilterPills.tsx — Tag-driven content filter bar
// Horizontally scrollable row of tag pills. Multi-select.
// ============================================================

"use client";

import { useCallback } from "react";

interface Tag {
  slug: string;
  labelZh: string;
  labelEn: string;
  color: string;
}

interface FilterPillsProps {
  allTags: Tag[];
  activeTags: string[];
  onToggle: (tagSlug: string) => void;
  onClear: () => void;
}

export default function FilterPills({
  allTags,
  activeTags,
  onToggle,
  onClear,
}: FilterPillsProps) {
  const activeSet = new Set(activeTags);

  return (
    <div className="filter-bar">
      <div className="filter-scroll">
        {allTags.map((tag) => {
          const isActive = activeSet.has(tag.slug);
          return (
            <button
              key={tag.slug}
              className={`filter-pill ${isActive ? "filter-pill--active" : ""}`}
              style={{
                "--pill-color": tag.color,
                backgroundColor: isActive ? tag.color : "var(--color-bg-elevated)",
                color: isActive ? "#fff" : "var(--color-ink-secondary)",
                borderColor: isActive ? tag.color : "var(--color-border)",
              } as React.CSSProperties}
              onClick={() => onToggle(tag.slug)}
              aria-pressed={isActive}
            >
              {tag.labelZh}
              <span className="filter-pill-count">{tag.labelEn}</span>
            </button>
          );
        })}

        {activeTags.length > 0 && (
          <button className="filter-clear" onClick={onClear} aria-label="Clear all filters">
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
}

// Inline styles since we can't use <style> in .tsx without a bundler supporting it.
// These are injected via the global.css or the parent Astro component.
// For now we rely on the global stylesheet.
