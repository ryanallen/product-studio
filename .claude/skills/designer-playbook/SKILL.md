---
name: designer-playbook
description: Digital product UI standards: accessibility, layout, typography, components. Use when creating or reviewing product designs, or when user says design standards, design playbook, review design, product design standards, /designer-playbook.
---

# Designer Playbook

Use when the documenter or designer is creating, documenting, or reviewing digital product designs. Apply as the baseline to design to and review against. [document-voice](../document-voice/SKILL.md).

## Inputs

- **Context** – Creating or reviewing UI (screens, components, design specs). Optional: project or product name.
- **Source** – User request or design artifact; apply the standards below.

## Output

Guidance applied (principles, color, type, layout, a11y, components). No new deliverables unless requested.

## Process

### 1. Core principles

**Mobile-first:** Start at 320px, expand. Single-column by default.

| Breakpoint | Width |
|------------|-------|
| Phone | 576px |
| Tablet | 768px |
| Laptop | 992px |
| Desktop | 1200px |

**Visual hierarchy:** Size (larger = more important), color (bright = attention), whitespace (more space = emphasis), proximity (group related), contrast (never low). Reading: Z-pattern (logo, CTA, content, final CTA) for landing; F-pattern (headline, first line per section) for content.

**Whitespace:** 8px multiples: 8, 16, 24, 32, 48, 64. Section breathing room: 48 to 64px min. Card padding: 24 to 32px. More whitespace = premium; crowded = cheap. Hick's Law: more choices = slower decisions; cut visual noise.

**Five laws:** (1) Contrast creates hierarchy (2) Whitespace creates calm (3) Consistency builds trust (4) Feedback confirms action (5) Accessibility includes everyone.

### 2. Color system

Primary scale (50 to 900) plus semantic: Primary (brand, e.g. #8b5cf6), Success (#10b981), Error (red), Warning (yellow/orange), Neutral (gray 50 to 900), Background (#ffffff light / #0f172a dark). Example blue scale: 50 #eff6ff through 900 #1e3a8a; 500 is base. Trends: soft gradients, cinematic color fields, high-saturation CTAs. Tools: Huevy, Coolors, Adobe Color.

### 3. Typography

**Scale (8px baseline):** xs 12/16, sm 14/20, base 16/24 (body), lg 18/28, xl 20/28, 2xl 24/32, 3xl 30/36 (section headers), 4xl 36/40, 5xl 48/1 (hero). **Fonts:** 2 max. System stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. **Readability:** Line length 50 to 75 chars; line height 1.5× body, 1.2× headings; letter spacing -0.02em headings, normal body.

### 4. Layout

**Grid** for 2D structure (header, sidebar, main, footer). **Flexbox** for 1D component internals. **Auto-fit** for responsive grids: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`. Dashboard: mobile single column; 768px nav + main; 1024px nav + main + sidebar. Use `grid-template-areas` for clarity.

### 5. Micro-interactions

Subtle only. Animate only `transform` and `opacity`. Duration 0.2 to 0.3s. Hover scale 1.05×; click/tap 0.95×; loading skeleton or pulse; success checkmark or confetti; error shake 2px.

### 6. Accessibility (WCAG 2.2 AA)

**Contrast:** Normal text &lt;24px 4.5:1; large text (≥24px or 19px bold) 3:1; UI components 3:1; focus indicators 3:1. Test: WebAIM, Chrome DevTools, axe. Failures: #999 on white (2.9:1); placeholder too light; disabled buttons still visible.

**Keyboard:** Tab/Shift+Tab move; Enter/Space activate; Escape close; Arrows in menus/radios/tabs. `tabIndex={0}` add to order; `tabIndex={-1}` programmatic only. Never tabIndex &gt; 0. `button:focus-visible { outline: 3px solid #3b82f6; outline-offset: 2px }`; never remove focus outline without replacement.

**Skip link (required):** `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to main content</a>`

**Semantic HTML:** `<nav>`, `<main>`, `<article>`, `<h1>` to `<h6>`, `<button>`, `<a>`. One `<h1>` per page; do not skip heading levels. No divs for interactive when a native element exists.

**Images:** Alt = function not appearance; under 125 chars; do not start with "image of". Decorative: `alt=""`.

**ARIA (when semantic is not enough):** `aria-label`, `aria-labelledby`; `aria-expanded`, `aria-invalid`, `aria-describedby`; `role="status" aria-live="polite"`; `role="alert" aria-live="assertive"`.

**Forms:** Associate labels (htmlFor/id). Associate errors (aria-invalid, aria-describedby, id on error). Required: `required` and `aria-required="true"`.

**Buttons vs links:** `<button>` for actions; `<a href>` for navigation. Never `<a href="#">` for actions.

**Testing:** Tab through (no mouse); axe 0 violations; Lighthouse a11y &gt; 95; VoiceOver/NVDA on key flows; zoom 200% no horizontal scroll; emulate color blindness.

### 7. Shadcn/ui + Tailwind

Init: `npx create-next-app@latest ... --tailwind` then `npx shadcn@latest init`. Add components: `npx shadcn@latest add button card dialog calendar input label textarea select checkbox radio-group tabs badge avatar skeleton toast alert-dialog`. Folders: `components/ui`, `layout`, `features`, `shared`. Use design tokens (e.g. `p-4 text-blue-600`), not arbitrary values. Dark mode: `dark:` classes.

### 8. Component patterns

Buttons: primary, secondary, outline, ghost, destructive; sizes sm/default/lg; loading spinner. Cards: CardHeader, CardTitle, CardDescription, CardContent, CardFooter; hover shadow/scale. File upload: drag-and-drop zone, border-dashed, hover, accept/size in copy. Date picker: Popover + Calendar (single), format display, clear label. Toast: title, description, variant, optional action. Nav: sidebar `space-y-2`; mobile Menu/X overlay. Loading: skeleton, Loader2 animate-spin, Progress.

### 9. Pre-build checklist

Color palette (primary + neutrals + semantic); typography scale (6 to 8 sizes); Shadcn + Tailwind initialized; breakpoints (576, 768, 992px); contrast verified (4.5:1 text, 3:1 UI); micro-interactions defined; grid sketched (mobile to desktop); skip link; all inputs labeled; icon-only buttons have aria-labels.

### 10. Inspiration and tools

Study: Linear (keyboard-first, animations), Stripe (spacing, viz), Vercel (minimal, gradients), Notion (drag-and-drop), Loom (upload). Tools: Figma, WebAIM Contrast Checker, Coolors/Huevy, Chrome DevTools. Templates: Mosaic/Cruip, TailAdmin, Flowbite, Horizon UI. Dribbble: SaaS dashboard, upload UI, calendar UI.

Accessibility is a legal requirement (ADA, Section 508) and ethical baseline. Test early, test often.

## Reference

[document](../document/SKILL.md). [document-agents](../document-agents/SKILL.md). [designer-figma](../designer-figma/SKILL.md). [document-voice](../document-voice/SKILL.md).
