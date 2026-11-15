---
name: Diego Alvarado
description: "Informe de campo, a portfolio set like a printed field report."
colors:
  primary: "#a43620"
  primary-dark: "#f19b7c"
  signal-soft: "rgba(164, 54, 32, 0.12)"
  signal-soft-dark: "rgba(241, 155, 124, 0.18)"
  parchment: "#f5eddb"
  parchment-dark: "#221c17"
  parchment-alt: "#ece1ca"
  parchment-alt-dark: "#2b231d"
  elevated: "#faf4e7"
  elevated-dark: "#342a22"
  ink-strong: "#211c16"
  ink-strong-dark: "#faf0df"
  ink: "#3c3025"
  ink-dark: "#e8d9c4"
  ink-muted: "#675645"
  ink-muted-dark: "#c7b49e"
  ink-faint: "#705947"
  ink-faint-dark: "#b6a28c"
  rule: "color-mix(in srgb, #675645 44%, transparent)"
  rule-dark: "color-mix(in srgb, #c7b49e 44%, transparent)"
typography:
  display:
    fontFamily: 'Newsreader, ui-serif, Georgia, "Times New Roman", serif'
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  lead-title:
    fontFamily: 'Newsreader, ui-serif, Georgia, "Times New Roman", serif'
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  lead-result:
    fontFamily: 'Newsreader, ui-serif, Georgia, "Times New Roman", serif'
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.055em"
  title:
    fontFamily: 'Newsreader, ui-serif, Georgia, "Times New Roman", serif'
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  signature:
    fontFamily: 'Newsreader, ui-serif, Georgia, "Times New Roman", serif'
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  ledger-result:
    fontFamily: 'Newsreader, ui-serif, Georgia, "Times New Roman", serif'
    fontSize: "2.5rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  navigation:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
  label:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.1em"
  utility:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    lineHeight: 1.333333
    letterSpacing: "0.12em"
rounded:
  control: "0.25rem"
  media: "0.5rem"
spacing:
  utility-gap: "0.5rem"
  figure-inset: "0.75rem"
  gutter-mobile: "1.25rem"
  gutter-tablet: "2rem"
  gutter-desktop: "3rem"
  page-max: "1320px"
  touch-target: "44px"
components:
  theme-switch:
    backgroundColor: "transparent"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.control}"
    size: "{spacing.touch-target}"
  language-switch:
    backgroundColor: "transparent"
    textColor: "{colors.ink-strong}"
    typography: "{typography.utility}"
    rounded: "{rounded.control}"
    height: "{spacing.touch-target}"
    padding: "0 0.625rem"
  masthead-nav:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
  proof-ledger:
    textColor: "{colors.ink}"
    typography: "{typography.utility}"
  chapter-head:
    textColor: "{colors.ink-strong}"
    typography: "{typography.title}"
  editorial-case:
    textColor: "{colors.ink-strong}"
    typography: "{typography.lead-title}"
  architecture-figure:
    textColor: "{colors.ink}"
    padding: "0.75rem 0.625rem"
  project-disclosure:
    textColor: "{colors.primary}"
    height: "{spacing.touch-target}"
  project-media:
    backgroundColor: "{colors.parchment-alt}"
    rounded: "{rounded.media}"
---

# Design System — Diego Alvarado

## Overview

**Creative North Star — “Informe de campo”**

The portfolio reads like a printed field report. Warm paper, serif headlines and thin rules organize the work. Project results keep their units and context close so readers can scan the numbers and understand what they measure.

**Key Characteristics**

- Warm paper and coffee ink in light mode, warm charcoal and pale ink in dark mode.
- Large Newsreader titles and figures with compact, readable sans-serif context.
- A ruled opening spread: statement on the left, measured proof on the right.
- Ruled sections, outlined diagrams and native disclosures.

## Colors

### Primary

Brick red pairs with terracotta in dark mode. Use the accent for results, diagram arrows, interactive emphasis and keyboard focus. The translucent signal tint marks selection and hover on outlined controls.

### Neutral

Ivory parchment pairs with warm charcoal for the page. Alternate and raised paper tones frame media and supporting surfaces. Use strong ink for titles, standard ink for prose, muted ink for roles and captions, and faint ink for inactive utility labels. Rules use muted ink at 44% opacity. The masthead uses a heavier rule in strong ink.

**The Signal Rule.** Reserve the brick or terracotta accent for evidence and interaction.

## Typography

Newsreader sets titles, figures and diagram labels. DM Sans carries prose, navigation and captions. JetBrains Mono sets compact utility labels such as the masthead location, the proof ledger's role/year line, the language switch and the figure caption.

The name sits at 1.875rem and the lead project title ranges from 2.75rem to 5.875rem. The lead figure ranges from 5.5rem to 9.5rem and uses lining numerals. The hero proof ledger uses 2.5rem results so the two numbers stay scannable in the first viewport; the second result ranges from 2.5rem to 3.75rem. Project summaries use relaxed 1rem body type and figure captions use 0.75rem monospace.

**The Figure Rule.** Keep the result, its units and its explanatory text in one reading group.

**The Proof Rule.** The first viewport carries evidence, not only a claim: the statement, the byline and the two measured results share one ruled spread.

## Layout

The home page centers on a 1320px canvas with 20px gutters on phones, 32px from 768px and 48px from 1024px. The masthead keeps one ruled row from 1024px; below that, location and utilities share the first row and section links take the second.

The opening spread runs a full-width headline, then a ruled band split into the byline, scope and actions on the left and the proof ledger on the right (1.15:1 from 1024px, fluid 56px gap). Below the band, the chapter head opens the featured cases. From 768px, each editorial case shares a 1.45:1 grid with a fluid gap from 40px to 122px. The lead diagram occupies the second column and the second case places its result in that column.

Below 1024px, stack the introduction band and the proof ledger; below 768px, stack the cases, place the lead diagram after the result and its disclosure, and give the wrapping masthead navigation its own line. Use the section rules to maintain the reading order through the stack.

## Elevation & Depth

The masthead, introduction and featured cases sit flat on the paper canvas. A fine grain runs through the shell. Paper tones and borders distinguish media and supporting content.

## Shapes

Use square diagram boxes and 1px rules, with a 2px rule under the masthead. Masthead controls soften to a 4px radius. Project media clips to an 8px radius in a 16:9 frame.

## Components

- **Masthead.** A single running head: monospace location marked with a signal square on the left, underlined section and CV links 44px high, then the language and theme controls behind a hairline divider. The location and navigation are restrained so the headline stays the first voice.
- **Opening spread.** A 2px rule under the headline separates the statement from the byline, scope and actions. The byline pairs the Newsreader signature with a monospace role. The primary action is a solid ink block; the CV is a quiet underlined second action.
- **Proof ledger.** A mono label and ruled rows, one per featured case: title, result in accent display numerals, one-line context, then role and year in mono with the year flush right. It is a summary, not a stat-card grid; the featured cases below carry the full record.
- **Chapter head.** Title the featured cases at 1.25–1.5rem Newsreader between a 2px rule above and a hairline below, so the lead case title opens the section rather than a tiny uppercase label.
- **Language and theme controls.** The language button uses monospace labels with the active language bold in the accent. The square theme button swaps moon and sun. Both use quiet borders, a tinted hover and an offset accent focus ring.
- **Editorial case.** Group title and role with the measured result and concise context. Separate cases with a shared rule. Open architecture, stack and media in place through a native disclosure. The chevron turns when the disclosure opens.
- **Architecture figure.** Set a caption above outlined steps, use accent arrows for flow, tint the orchestration node, and separate the muted figure note with a rule. Provide an equivalent text description of the flow.
- **Route shell.** Use a short entrance on navigation, with reduced-motion support. Keep the progress line thin and the return affordance compact.

## Do's and Don'ts

- **Do** Keep titles and measured results easy to locate at phone width.
- **Do** Carry the warm paper and ink relationships through both themes.
- **Do** Put the measured results in the first viewport, beside the claim rather than below it.
- **Do** Keep a visible keyboard focus treatment and 44px masthead and disclosure targets.
- **Don't** Add filled panels or shadows around the featured case rows.
- **Don't** Use a tiny uppercase label as the section heading; the chapter head is Newsreader.
- **Don't** Turn technical details into a separate reading step when they can open in place.
