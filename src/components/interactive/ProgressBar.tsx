// ============================================================
// ProgressBar.tsx — Article reading progress indicator
// Fixed bar at top of viewport, grows with scroll progress.
// ============================================================

"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const total = docHeight - winHeight;

      if (total <= 0) {
        setProgress(100);
        return;
      }

      const pct = Math.min((scrollTop / total) * 100, 100);
      setProgress(pct);
    };

    handleScroll(); // Initial
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  );
}
