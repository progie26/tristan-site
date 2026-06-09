// ============================================================
// HorizontalJourney.tsx — Horizontal scrollable timeline
// Used on About page for the timeline section.
// Desktop: horizontal drag-scroll. Mobile: vertical static.
// ============================================================

"use client";

import { useRef, useEffect, useState } from "react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

interface HorizontalJourneyProps {
  items: TimelineEvent[];
}

export default function HorizontalJourney({ items }: HorizontalJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || !isDesktop) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      className={`horizontal-journey ${isDesktop ? "journey--scroll" : "journey--stack"}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={isDesktop ? { cursor: "grab", userSelect: "none" } : undefined}
    >
      {items.map((item, i) => (
        <div key={i} className="journey-item">
          <div className="journey-marker" />
          <div className="journey-content">
            <time className="journey-date">{item.date}</time>
            <h3 className="journey-title">{item.title}</h3>
            <p className="journey-desc">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
