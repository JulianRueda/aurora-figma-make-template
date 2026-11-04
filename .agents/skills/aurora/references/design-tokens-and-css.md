# Aurora Design Tokens, Typography & CSS System

This reference defines the exact visual language, CSS custom properties, typography hierarchy, geometry motifs, and dual responsive rules (`@media` + `@container`) used by the Aurora Design System.

For the complete, ready-to-copy base stylesheet (`src/index.css`), read or copy:
[../resources/aurora-base.css](../resources/aurora-base.css)

---

## 1. Color Palette & CSS Custom Properties (`:root`)

The visual identity balances **warm editorial approachability** (ivory/stone surfaces instead of sterile hospital white) with **institutional authority** (deep forest green) and **optimistic conversion energy** (solar gold).

| Token | Value | Semantic Role |
| :--- | :--- | :--- |
| `--forest` | `#0a4d2e` | Primary brand authority: `h1`/`h2`, primary buttons, sticky live-estimator card, selected card borders, active stepper circle, primary icons. |
| `--forest2` | `#06351f` | Primary button `:hover`, deep gradient end stop (`linear-gradient(135deg, var(--forest), var(--forest2))`). |
| `--green` | `#ecfdf3` | Soft mint tint: eyebrows, selected `.profile-card` background, sticky `.summary` / `.purchase-summary`, icon wells, `.privacy` notice. |
| `--green-border` | `#a7f3d0` | Subtle border for mint-tinted containers, dividers inside `.summary`, hover border on selectable cards. |
| `--sun` | `#f5b301` | High-contrast conversion accent: `.primary.sun` CTA on dark forest cards, active stepper underline, `"Más elegido"` badge, `.live` pulse dot, `:focus-visible` ring. |
| `--yellow` | `#fffbeb` | Warm amber surface: B2B/group `.benefit` banners, honest `.exclusion` callouts, assisted-sale `.drawer-icon` background (paired with `#92400e` text). |
| `--yellow-border` | `#fde68a` | Border for warm amber callouts. |
| `--bg` | `#f7f8f5` | Main application canvas inside `.site-preview` (outer `body` uses `#eef1ed` to frame the viewport simulator). |
| `--surface` | `#ffffff` | Crisp white surface for `.panel`, `.plan-card`, `.form-card`, `.payment-card`, inputs, and drawer. |
| `--text` | `#111827` | Primary body and input text (AAA contrast on white/ivory). |
| `--secondary` | `#4b5563` | Supporting intro paragraphs, feature descriptions, secondary labels. |
| `--muted` | `#6b7280` | Helper microcopy, captions, inactive hints (placeholders use `#9ca3af`). |
| `--border` | `#e5e7eb` | Structural card and section borders (form controls use `#d1d5db`). |
| `--error` / `--error-bg` | `#dc2626` / `#fef2f2` | Inline field validation errors, rejected transaction alerts (`#fecaca` border). |
| `--success` / `--success-bg` | `#15803d` / `#f0fdf4` | Autosave indicator, feature checkmarks, verified badges, `.thank-you-check` halo. |
| `--shadow` | `0 1px 2px rgba(10,77,46,.05), 0 5px 18px rgba(17,24,39,.05)` | Subtle forest-tinted elevation for white panels and cards. |
| `--shadow-lg` | `0 18px 55px rgba(10,48,31,.15)` | High-hierarchy elevation for the sticky `.price-card`. |

> **Custom Brand Palette Adaptation**: Only change `--forest`, `--forest2`, `--green`, `--green-border`, and `--sun` if the user explicitly asks for another brand's colors. Always keep the warm `--bg: #f7f8f5` canvas, high contrast ratios, and tinted soft surfaces.

---

## 2. Typography Scale & Editorial Pairing

Load both font families at the very top of `src/index.css` before `@import 'tailwindcss';`:

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
@import 'tailwindcss';
```

### Font Roles
1. **`Playfair Display` (Serif, 600/700, `letter-spacing: -0.025em`, `color: var(--forest)`)**:
   - Screen titles (`h1`): `clamp(30px, 3.5vw, 46px)` (`line-height: 1.08`; `28px` on mobile).
   - Card/Modal display titles (`h2` in `.plan-head`, `.summary`, `.form-top`, `.drawer`, `.payment-loading`).
   - Protagonist monetary/KPI figures: `.price-card > strong` (`33px`), `.purchase-price > b` (`28px`), `.plan-price b` (`26px`), `.summary > strong` (`23px`).
2. **`DM Sans` (Geometric Sans, 400/500/600/700)**:
   - Global `body`: `15px`, `color: var(--text)`.
   - Screen intro copy (`.intro > p`): `15px`, `line-height: 1.55`, `color: var(--secondary)`.
   - Operational numbered section headings (`.section-title h2`): override to `'DM Sans'`, `16px`, `color: var(--text)` so `Playfair Display` stays reserved for editorial moments.
   - Compact, high-density UI controls:
     - Form labels, buttons (`.primary`, `.secondary`), `.autosave`, `.stepper`: `11px`, `font-weight: 700`.
     - `.eyebrow`: `10px`, `font-weight: 700`, `text-transform: uppercase`.
     - Microcopy, badges, helper hints, error messages: `9px–10px`.

---

## 3. Geometry, Signature Motifs & Motion

- **Radii**:
  - Primary containers (`.panel`, `.form-card`, `.price-card`, `.payment-card`, `.plan-card`): `15px–16px`.
  - Branded visual cards (`.card-visual`): `17px`.
  - Selectable cards (`.profile-card`, `.member-row`, `.context`): `11px–12px`.
  - Inputs, selects, and buttons: `9px` (minimum touch height `42px–49px`; inputs `44px`).
  - Eyebrows & status pills: `999px`.
- **Signature Decorative Ring**:
  - Dark forest cards (`.price-card`, `.card-visual`) feature a subtle translucent solar-gold ring in the top-right corner via `::after` (`border: 25px solid #f5b3011f; border-radius: 50%` with `overflow: hidden` on the parent).
- **Accessible Focus & Motion**:
  - `:focus-visible`: `outline: 3px solid rgba(245, 179, 1, 0.7); outline-offset: 2px;`.
  - Validation feedback: `.shake` (`0.35s` horizontal 4px oscillation) + `.input-error` (`border-color: var(--error); background: var(--error-bg)`).
  - Always include `@media (prefers-reduced-motion: reduce)` disabling smooth scroll, animations, and transitions.

---

## 4. Dual Responsive Architecture (`@media` + `@container`)

Because the `<Evaluator>` toolbar resizes `.site-preview` (`1440px` / `768px` / `375px`) inside a desktop browser window, **every responsive rule must apply both to real viewports (`@media`) and to the preview container (`@container aurora-preview`)**:

```css
.site-preview {
  container-type: inline-size;
  container-name: aurora-preview;
}
```

### Breakpoint Behavior
- **Desktop (`> 900px`)**:
  - `.config-layout`: `minmax(0, 2fr) minmax(280px, 1fr)` with `position: sticky; top: 140px` on `.price-card`.
  - `.plan-grid`: `repeat(3, 1fr)` side-by-side cards; middle `.recommended` card highlighted with `2px solid var(--sun)` and floating `.badge`.
  - `.holder-layout`: `280px minmax(0, 1fr)` with sticky `.summary` on the left.
  - `.payment-layout`: `minmax(0, 1.45fr) minmax(270px, 0.75fr)` with sticky `.purchase-summary` on the right.
- **Tablet (`<= 900px`)**:
  - `.config-layout` and `.payment-layout` collapse to `1fr`; `.price-card` becomes a static 2-column horizontal summary banner.
  - `.plan-grid` becomes `repeat(2, 1fr)` with the 3rd card centered below (`max-width: calc(50% - 7px)`).
  - `.holder-layout` narrows sidebar to `220px minmax(0, 1fr)`.
- **Mobile (`<= 600px`)**:
  - `.price-card` and `footer` hide (`display: none`); `.mobile-bar` appears fixed at the bottom (`width: min(375px, 100%)`, `padding-bottom: max(10px, env(safe-area-inset-bottom))`).
  - `.plan-grid` shows **one active plan at a time** controlled by a sticky `.mobile-switch` segmented bar (`top: 105px`), plus a `.compare-mobile` toggle button (`"Comparar los 3 lado a lado"`) that adds `.show-all` to stack all 3 cards.
  - `.summary` compacts into a horizontal 3-column strip (`icon | title + price | icon-only back button`).
  - `.form-grid`, `.payment-form`, and `.profile-grid` stack into `1fr`.

> When building `src/index.css`, start directly from [../resources/aurora-base.css](../resources/aurora-base.css) and append any domain-specific component classes at the bottom (remembering to mirror responsive rules in both `@media` and `@container aurora-preview`).
