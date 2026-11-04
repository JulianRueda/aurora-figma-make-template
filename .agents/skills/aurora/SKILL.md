---
name: aurora
description: >-
  Use this skill when the user wants to design or build any web page, quoter,
  simulator, onboarding, checkout, or guided digital product using the Aurora
  editorial-trust style and UX system, starting from a prompt that describes a
  business objective (objetivo de negocio), target audience (público objetivo),
  and high-level process (proceso de alto nivel).
---

# Aurora UX & Editorial-Trust Page Builder

This skill transforms a high-level business brief—**Objetivo de Negocio**, **Público Objetivo**, and **Proceso de Alto Nivel**—into a complete, conversion-optimized, accessible React + TypeScript + Vite web application following the **Aurora Design & UX System** (warm ivory surfaces, deep forest authority, solar gold accents, `Playfair Display` + `DM Sans` editorial hierarchy, value-first progressive disclosure, and built-in UX/UI evaluator controls).

---

## 1. Required References (Progressive Disclosure)

Before writing code, **always** read both reference manuals in this skill folder:

1. **Design Tokens, Typography & Dual Responsive Rules**:
   [references/design-tokens-and-css.md](./references/design-tokens-and-css.md)
2. **Base Stylesheet Template (copy/extend into `src/index.css`)**:
   [resources/aurora-base.css](./resources/aurora-base.css)
3. **UX Patterns, Component Catalog & Client-Side Domain Engine**:
   [references/ux-patterns-and-components.md](./references/ux-patterns-and-components.md)

---

## 2. Core UX & Architectural Pillars (Non-Negotiable)

Every page or application built with this skill **must** embody these 6 pillars:

1. **Value Before Personal Data (*Valor antes que datos*)**:
   - Step 1 must deliver immediate, live calculated value (price, monthly fee, ROI, score, savings, or custom recommendation) using minimal non-invasive inputs.
   - Explicitly reassure the user (*"Cotiza/Simula al instante sin entregar tus datos de contacto"* / *"Aún no pediremos tus datos"*). Defer personal/corporate identity fields until after the user has configured and selected their option.
2. **Editorial Warmth + Institutional Trust**:
   - Pair `Playfair Display` (serif, `-0.025em` tracking) for hero headings, plan names, and protagonist figures with `DM Sans` (sans-serif) for dense, high-clarity operational UI.
   - Use warm ivory backgrounds (`--bg: #f7f8f5`, outer canvas `#eef1ed`), crisp white panels (`#ffffff`), deep forest (`--forest: #0a4d2e`), and solar gold (`--sun: #f5b301`) for primary conversion focal points and `:focus-visible` outlines.
   - *Brand Adaptation Rule*: Keep the Aurora palette by default. Only swap `--forest` / `--sun` hues if the user explicitly requests custom brand colors—preserving the exact contrast ratios, warm off-white canvas, tinted soft surfaces, and typography pairing.
3. **Persistent Context & Autosave**:
   - Persist flow progress and form state automatically in `localStorage` under a versioned key (`<project-slug>-v1`) and display `"Autoguardado activo"` in the sticky header.
   - Keep context visible at all times: a sticky dark live-estimator card (`.price-card`) during configuration, a sticky soft-green summary card (`.summary` / `.purchase-summary`) during data entry and checkout, and a fixed thumb-zone `.mobile-bar` on mobile (`<= 600px`).
4. **Segment-Adaptive Experience**:
   - Render visual profile cards (`.profile-card`) derived from the **Público Objetivo** (e.g., Individual, Family/Group, B2B Company).
   - Switching segments dynamically adapts form fields, group discounts/benefits (`.benefit` callout), validation rules, check-digit helpers (e.g., NIT/RUT/Tax ID DV calculation), and quick-fill test personas.
5. **Empathetic Validation & Omnichannel Rescue**:
   - Sanitize inputs in real time (numeric masks, card grouping, `MM/AA`, typo suggestions like `@gmial.com` -> `@gmail.com`).
   - Write human, actionable error messages with concrete examples—never generic `"Invalid input"`. On submit error, smooth-scroll to and focus the first invalid field with a `.shake` micro-animation.
   - Include a slide-over Assisted Channel Drawer (`<Assistance>`) accessible from the header and error banners (*"Te ayudamos sin hacerte empezar de cero"*), preloading the user's live configuration so an advisor can continue seamlessly.
6. **Built-in UX/UI Evaluator Mode (`<Evaluator>`) & Simulation Controls**:
   - Include the collapsible top dark bar (`Modo Evaluador UX/UI`) with:
     - **Live Viewport Switcher**: `Desktop 1440`, `Tablet 768`, `Mobile 375` resizing `.site-preview` via **CSS Container Queries (`@container aurora-preview`)** mirrored alongside standard `@media` queries.
     - **UI State Switcher**: Normal (pre-populated), Normal (empty), Empty validation state, Skeleton loading (`900ms` shimmer), Network/timeout recovery banner (`.network-banner`), and Segment/B2B edge case.
     - **Inline QA Helpers**: One-click persona autofill buttons on forms, OTP success/error simulators, and payment/submission approval/rejection simulators.

---

## 3. Execution Workflow: From Prompt to Application

### Step 1: Analyze the 3 Prompt Inputs

Extract these three dimensions from the user's prompt:

- **1. Objetivo de Negocio (`Business Objective`)**: What conversion, lead, sale, booking, or self-service outcome must the page achieve, and what friction is it eliminating?
- **2. Público Objetivo (`Target Audience`)**: Who are the distinct user archetypes/segments (e.g., B2C individuals, families/teams, B2B companies, age/income/digital-maturity traits), and what anxieties or objections do they have?
- **3. Proceso de Alto Nivel (`High-Level Process`)**: What are the stages from initial interest to final confirmation?

> If one of the three inputs is missing and cannot be reasonably inferred from context, ask **at most one brief clarifying question**. Otherwise, infer realistic domain rules (currency, locale, rate tables, legal/tax ID formats) and build immediately.

### Step 2: Translate Inputs into the Aurora Blueprint

Map the user's brief systematically using this matrix:

| User Input | UI & UX Artifacts Generated |
| :--- | :--- |
| **Objetivo de Negocio** | • **Screen 1 `<Intro>`**: Anti-friction `eyebrow` + benefit-driven `h1` + concise `p`.<br>• **Live Value Engine (`.price-card`)**: Deterministic client-side formula (`useMemo`) calculating the core metric (price, installment, savings, score) in real time + 3 `.trust` bullets + `.primary.sun` CTA.<br>• **Assisted Rescue (`<Assistance>`)**: Slide-over drawer preloaded with current quote/selection.<br>• **Post-Conversion (`<ThankYou>`)**: Unique reference code (`PREFIX-YYYY-NNNNNN`), 4-cell confirmation summary, digital deliverables grid, and `window.print()` receipt. |
| **Público Objetivo** | • **Segment Selector (`.profile-grid`)**: 2–4 `.profile-card` buttons with `lucide-react` icons, titles, and value microcopy (e.g., group discount badge).<br>• **Conditional Fields & Rules**: Segment-specific inputs (e.g., dependents list with `+/-` steppers vs. B2B headcount & Tax ID), age/amount boundary rules with friendly edge-case guidance.<br>• **Autofill Personas (`.autofill`)**: One-click test data buttons matching two contrasting audience personas (e.g., B2C Person vs. B2B Company). |
| **Proceso de Alto Nivel** | • **Sticky Stepper (`<Header>`)**: 3–5 concise step labels with completed checkmarks, active `--sun` underline, and backward navigation (`n <= step`).<br>• **Screen Archetypes per Step**:<br>  1. *Configure / Simulate* -> `2fr / 1fr` `.config-layout` + numbered `<SectionTitle>` blocks + sticky `.price-card`.<br>  2. *Compare / Choose* -> `.context` bar + segmented `.tabs` (Benefits, Costs/Terms, Honest Exclusions) + `"Mostrar solo diferencias"` toggle + 3-tier `.plan-grid` with middle `.recommended` card + mobile sticky switcher.<br>  3. *Identify / Verify* -> `280px / 1fr` `.holder-layout` + sticky `.summary` + 2-column `.form-grid` + `.privacy` callout + optional `<Otp>` verification stage with countdown & alternative delivery channels.<br>  4. *Transact / Confirm* -> `1.45fr / 0.75fr` `.payment-layout` + branded visual preview (`.card-visual` or contract preview) + `form \| processing \| error \| thanks` state machine + `<ThankYou>`.<br>• *Single-Page / 1–2 Step Variant*: If the user asks for a single landing/tool page rather than a multi-step wizard, omit the stepper in `<Header>`, use smooth-scroll anchor progression, and compose the same canonical blocks vertically (`Hero + Live Simulator` -> `Transparent Comparison` -> `Quick Action / Assisted Drawer`). |

### Step 3: Scaffold & Implement

1. **Project Setup**:
   - If working in an existing React + Vite project, integrate cleanly into its structure.
   - If creating a new project, scaffold a clean **React 19 + TypeScript + Vite + Tailwind CSS v4 (`@tailwindcss/vite`) + `lucide-react`** app.
   - Set `<html lang="es">` (or the prompt's target language) and configure descriptive `<title>` and meta tags.
2. **Styles (`src/index.css`)**:
   - Import `DM Sans` (`400;500;600;700`) and `Playfair Display` (`600;700`) from Google Fonts at the very top, followed by `@import 'tailwindcss';`.
   - Define all `:root` CSS custom properties, `@layer base` rules, component styles, animations, `@media` breakpoints (`900px`, `600px`), **matching `@container aurora-preview` rules**, `prefers-reduced-motion`, and `@media print` as specified in [references/design-tokens-and-css.md](./references/design-tokens-and-css.md).
3. **Application & Domain Logic (`src/App.tsx` or modular `src/`)**:
   - For self-contained prototypes (3–5 steps), keep components cohesive and clean; for larger apps, split into `src/types.ts`, `src/domain/`, and `src/components/` while keeping all shared primitives (`Evaluator`, `Header`, `Intro`, `SectionTitle`, `Field`, `Error`, `Assistance`, `Skeleton`).
   - Implement `scrollFlowToTop()` and focus management (`#main-content` focus on step transitions) so step changes never leave the user scrolled halfway down.
   - Connect real backend endpoints if the workspace already provides an API; otherwise implement the full client-side deterministic engine, `localStorage` persistence, and simulated async transitions (`loading`, `OTP`, `processing`, `network` error) documented in [references/ux-patterns-and-components.md](./references/ux-patterns-and-components.md).

### Step 4: Verification Checklist

Before finishing, verify every item below:

1. **Build & Type Safety**: Run `npm run build` (or `pnpm build`) and confirm zero TypeScript or CSS build errors.
2. **Evaluator & Responsive Parity**:
   - Confirm `site-preview` sets `container-type: inline-size; container-name: aurora-preview;` and that `Desktop 1440`, `Tablet 768`, and `Mobile 375` reflow grids, hide desktop sticky cards at `<= 600px`, and reveal `.mobile-bar` without horizontal overflow.
   - Confirm all Evaluator states (`normal`, `normal-empty`, `empty`, `loading`, `network`, and segment edge case) render and recover cleanly.
3. **Accessibility & Microcopy**:
   - Every form control has an explicit `<label>` or `aria-label`, `:focus-visible` uses the gold outline, step buttons set `aria-current="step"`, and all copy uses clear, jargon-free language tailored to the target audience.
4. **End-to-End Flow**: Walk mentally (or via browser preview if available) from Step 1 simulation -> Step 2 comparison -> Step 3 autofill + validation + OTP -> Step 4 transaction simulation -> printable `<ThankYou>`.
