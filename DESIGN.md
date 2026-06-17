# DESIGN.md

## Theme

### Color Palette

**Strategy:** Restrained — tinted neutrals with one accent color used sparingly.

```css
:root {
  --color-bg:       oklch(1 0 0);             /* pure white */
  --color-surface:  oklch(0.97 0.003 60);     /* warm white for cards */
  --color-ink:      oklch(0.09 0.006 60);     /* warm-black text */
  --color-muted:    oklch(0.45 0.005 60);     /* secondary text */
  --color-primary:  oklch(0.65 0.13 38);      /* terracotta brand seed */
  --color-accent:   oklch(0.5 0.06 250);      /* muted blue for chrome */
  --color-outline:  oklch(0.85 0.003 60);     /* subtle borders */
  --color-selected: oklch(0.65 0.13 38 / 0.1);/* selection tint */
}
```

- Body text (#ink vs #bg) contrast: ~17:1 (WCAG AAA)
- Muted text (#muted vs #bg) contrast: ~5:1 (WCAG AA)
- We use OKLCH throughout for perceptual uniformity.

### Light mode only

The editorial fashion register works best in light mode. No dark mode.

## Typography

### Font Family

- **UI & body:** `Geist`, system-ui sans-serif stack (already configured)
- **Code:** `Geist Mono` (already configured)

Single family approach (product register). The editorial feel comes from spacing and scale, not from font pairing.

### Type Scale

```css
--text-xs:   0.75rem;   /* 12px */
--text-sm:   0.875rem;  /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg:   1.125rem;  /* 18px */
--text-xl:   1.25rem;   /* 20px */
--text-2xl:  1.5rem;    /* 24px */
--text-3xl:  1.875rem;  /* 30px */
```

Fixed rem scale (product register). No fluid clamp sizing.

### Font Weight

- Headings: 600 (semibold)
- Body: 400 (regular)
- Labels: 500 (medium)

## Spacing Scale

Based on 4px grid:
- 3xs: 0.125rem (2px)
- 2xs: 0.25rem (4px)
- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 2.5rem (40px)
- 3xl: 3rem (48px)
- 4xl: 4rem (64px)

## Border Radius

- Card: 12px
- Button: 8px
- Color swatch: 8px
- Tag/pill: 999px

## Shadows

```css
--shadow-sm: 0 1px 2px oklch(0 0 0 / 0.04);
--shadow-md: 0 2px 8px oklch(0 0 0 / 0.06);
```

Never combine border + shadow on the same element.

## Motion

- Transitions: 200ms ease-out
- `prefers-reduced-motion`: instant transitions (0ms)
- Only layout-affecting transitions on selection/filter changes
- No decorative motion, no page-load sequences

## Component Tokens

Interactive states: default → hover → active → selected.

- **Color swatch:** 48px circle, border 2px transparent, selected border uses --color-primary
- **Color card:** surface bg, 12px radius, padding sm, selected gets --color-selected bg
- **Outfit preview:** stacked color blocks (shirt → pants → shoes) with garment label
