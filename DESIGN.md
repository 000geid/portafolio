---
name: Diego Alvarado
description: "Malba Monograph, a color-blocked exhibition portfolio with deep forest emerald rooms, coated gallery white, mineral obsidian, and cadmium orange."
colors:
  primary: "#c83c13"
  primary-hover: "#a8300d"
  primary-dark: "#eb5e33"
  signal-soft: "rgba(200, 60, 19, 0.11)"
  signal-soft-dark: "rgba(235, 94, 51, 0.16)"
  emerald: "#0b3326"
  emerald-dark: "#08281e"
  emerald-ink: "#f4f1e8"
  emerald-muted: "#b8cfc5"
  obsidian: "#121715"
  obsidian-dark: "#0a2219"
  obsidian-ink: "#f4f1e8"
  obsidian-muted: "#b0beb7"
  parchment: "#f7f5ef"
  parchment-dark: "#101513"
  parchment-alt: "#eeebe2"
  parchment-alt-dark: "#161d1a"
  elevated: "#ffffff"
  elevated-dark: "#1c2521"
  ink-strong: "#111c17"
  ink-strong-dark: "#f4f1e8"
  ink: "#27342e"
  ink-dark: "#dbe2dd"
  ink-muted: "#4f6158"
  ink-muted-dark: "#a4b4ac"
  ink-faint: "#61736a"
  ink-faint-dark: "#86988f"
  rule: "rgba(17, 28, 23, 0.16)"
  rule-dark: "rgba(244, 241, 232, 0.15)"
typography:
  display:
    fontFamily: '"Familjen Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  project-title:
    fontFamily: '"Familjen Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  project-metric:
    fontFamily: '"Familjen Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  section-title:
    fontFamily: '"Familjen Grotesk", ui-sans-serif, system-ui, sans-serif'
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body-lg:
    fontFamily: '"Public Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: '"Public Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  navigation:
    fontFamily: '"Public Sans", ui-sans-serif, system-ui, sans-serif'
    fontSize: "0.9375rem"
    fontWeight: 500
  brand-mark:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.22em"
  utility:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontSize: "0.75rem"
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  control: "0.1875rem"
  pill: "9999px"
spacing:
  gutter-mobile: "1.5rem"
  gutter-tablet: "3rem"
  gutter-desktop: "5rem"
  page-max: "1440px"
  touch-target: "44px"
---

# Design System — Diego Alvarado (Malba Monograph)

## Overview

**Creative North Star — “Malba Monograph”**

Inspired by Buenos Aires architectural exhibition catalogues (MALBA, Fundación Proa), the portfolio stages Diego's shipped engineering work as calm, full-bleed color-blocked gallery rooms. Every viewport carries very few elements at once, relying on mineral color contrast, monumental neo-grotesque typography, and generous negative space rather than dense cards or decorative effects.

## Colors

- **Deep Forest Emerald (`#0b3326` light / `#08281e` dark):** Owns the full-viewport opening gallery wall and bookends the site in the closing Contact room. Paired with warm museum ivory (`#f4f1e8`) and sage-tinted secondary ink (`#b8cfc5`).
- **Coated Gallery White (`#f7f5ef` light / `#101513` dark):** Owns the top masthead, lead featured project room (Muveran AI), and quiet Skills & Education disclosures.
- **Mineral Obsidian (`#121715` light / `#0a2219` dark):** Alternates against gallery white for the second featured project room (MAXI Clinical Decision Support), creating bold visual pacing between cases.
- **Warm Museum Stone (`#eeebe2` light / `#161d1a` dark):** Grounds the Career Path room.
- **Cadmium Orange (`#c83c13` light / `#eb5e33` dark):** Reserved strictly for the primary action CTA and monumental project proof metrics (`+30%`, `≈6,000`).

## Typography

- **Display (`Familjen Grotesk` 600–700):** Commands the hero headline (`clamp(2.75rem, 6.2vw, 5.35rem)`), project room titles, and monumental tabular proof numerals (`clamp(4rem, 8vw, 7rem)`).
- **Body (`Public Sans` 400–600):** Clean modernist sans for navigation, concise scope statements, and technical summaries.
- **Metadata & Indices (`JetBrains Mono` 400–600):** Tracked uppercase masthead signature (`DIEGO ALVARADO`), bottom hero proof caption strip, dates, roles, and tech stack lists.

## Layout & Pacing

- **Full-Bleed Rooms, 1440px Inner Grid:** Every major band spans 100% viewport width with its own material color field while constraining content to `max-w-[1440px]` with `24px / 48px / 80px` horizontal gutters.
- **One Calm Room Per Viewport:** The hero fills `min-h-[calc(100svh-4.5rem)]` with only the headline, one scope line, action pair, and bottom hairline proof strip. Featured project rooms show only title, metadata, tagline, primary metric, and on-demand architecture disclosures—keeping the resting screen calm and uncluttered.

## Accessibility & Browser Craft

- WCAG 2.1 AA+ contrast across all emerald, obsidian, stone, and gallery-white rooms in both light and dark modes.
- Minimum 44px touch targets for all navigation links, language/theme controls, buttons, and disclosures.
- Palette-themed text selection (`--color-signal`), caret color, scrollbar, and `:focus-visible` outlines; full `prefers-reduced-motion` support.
