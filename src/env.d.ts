/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

// React JSX type references (for Astro islands)
import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}
