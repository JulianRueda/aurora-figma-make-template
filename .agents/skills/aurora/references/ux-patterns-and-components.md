# Aurora UX Patterns, Component Catalog & Domain Engine

This reference details the interaction patterns, React + TypeScript primitives, state persistence, validation mechanics, and simulation controls that power an Aurora-style page or guided digital product.

---

## 1. Client-Side Domain & State Engine ("Backend-in-Client" Architecture)

By default, Aurora experiences run as **zero-latency stateful SPAs** where business logic, pricing/scoring formulas, persistence, and async state machines live cleanly in React hooks and pure TypeScript functions (ready to connect to real REST/GraphQL/Server Actions when needed).

### 1.1 Versioned `localStorage` Autosave
Hydrate safely on mount and sync every meaningful user decision automatically:

```tsx
const STORAGE_KEY = 'aurora-<project-slug>-v1'

const saved = useMemo(() => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}, [])

useEffect(() => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ step, profile, configState, selectedOption, holder })
  )
}, [step, profile, configState, selectedOption, holder])
```

### 1.2 Live Deterministic Calculation (`useMemo`)
- Compute base rates/scores purely from Step 1 configuration inputs (`useMemo`).
- Apply segment multipliers (e.g., family/team discount `0.90`, B2B discount `0.86`) and commercial rounding (e.g., `Math.round(raw / 1000) * 1000` for COP/CLP/MXN, or clean integer/2-decimal formatting via `Intl.NumberFormat`).
- Never require a "Calculate" button click to update the sticky `.price-card`—every keystroke or `+/-` click updates the live estimate immediately.

### 1.3 Multi-Container Scroll & Focus Reset on Step Change
When transitioning between steps (or sub-states like `processing -> thanks`), reset scroll across both `window` and `.site-preview` and move focus to `<main id="main-content" tabIndex={-1}>`:

```tsx
const scrollFlowToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.scrollingElement?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  document.querySelector('.site-preview')?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}
```

### 1.4 Empathetic Validation & Auto-Focus Handler
- Sanitize inputs on `onChange` (strip non-digits where appropriate, format credit cards in 4-digit groups, auto-insert `/` in `MM/AA`, auto-calculate check digits such as Colombian NIT Modulo-11 `calcDv`).
- Clear a field's error immediately as the user types in that field.
- On submit failure, trigger `fail(errors)` to scroll smoothly to the first invalid control and focus it:

```tsx
const fail = (e: Record<string, string>) => {
  setErrors(e)
  setTimeout(() => {
    const firstId = Object.keys(e)[0]
    const el = document.getElementById(firstId)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el?.focus({ preventScroll: true })
  }, 40)
}
```

---

## 2. Canonical Component Catalog

### 2.1 `<Evaluator>` (UX/UI Evaluator Mode)
A collapsible dark bar (`position: fixed; top: 0`) designed for stakeholder demos and responsive/edge-case QA:
- **Viewport Segmented Control**: `'desktop'` (`Desktop 1440`), `'tablet'` (`Tablet 768`), `'mobile'` (`Mobile 375`) toggling `.preview-desktop | .preview-tablet | .preview-mobile` on `.site-preview`.
- **UI State Selector (`DemoState`)**:
  - `'normal'`: Pre-populated realistic default values so reviewers see live pricing immediately.
  - `'normal-empty'`: Clean initial state for testing cold-start onboarding.
  - `'empty'`: Resets fields to trigger validation testing.
  - `'loading'`: Displays `<Skeleton />` for `900ms` then restores `'normal'`.
  - `'network'`: Displays `.network-banner` (`role="alert"`) above `<main>` reassuring the user (*"Tu progreso está guardado en este dispositivo"*) with **Retry** and **Continue with advisor** actions.
  - `'<edge-case>'` (e.g., `'company'`): Preloads a B2B or complex multi-entity scenario in 1 click.

### 2.2 `<Header>` (Sticky Trust & Navigation Bar)
- **Top Row**:
  - Brand mark/logo + vertical divider + `.product-name` pill.
  - Right actions: `.autosave` (`<CheckCircle2 /> Autoguardado activo`) + `.help-btn` (`<Phone />` with `.help-long` `"¿Necesitas ayuda? Prefiero que me llamen"` on desktop and `.help-short` `"Ayuda"` on mobile).
- **Bottom Row (`.stepper`)**:
  - Maps the **Proceso de Alto Nivel** into 3–5 concise buttons.
  - Completed steps (`n < step`) show `<Check size={13} />` in a mint circle and remain clickable to go back; current step (`n === step`) sets `aria-current="step"` with forest circle and `--sun` bottom bar; future steps are disabled.

### 2.3 Shared Screen Primitives
- **`<Intro eyebrow title text center?>`**: Opens every screen with a `<Sparkles />` pill eyebrow (framing the emotional/anti-friction benefit), a `Playfair Display` `<h1>`, and a clear 1–2 sentence `<p>`.
- **`<SectionTitle n title text compact?>`**: Numbered forest badge (`1`, `2`) + `DM Sans` `<h2>` + helper `<p>` to break complex panels into scannable micro-steps.
- **`<Field label id error? hint? wide? children>`**: Wraps inputs in `.field` (applying `.input-error.shake` when `error` is present), renders optional helper `<small>` (including smart typo hints like `¿Quisiste decir usuario@gmail.com?`), and renders `<Error text={error} />` (`role="status"` + `<CircleAlert />`).

### 2.4 Archetype A: Configuration / Simulation Screen (`Step 1`)
- **Left Panel (`.panel`)**:
  1. `<SectionTitle n="1" ... />` + `.profile-grid` of selectable `.profile-card` buttons (`aria-pressed`) representing the **Público Objetivo** segments.
  2. `<SectionTitle n="2" compact ... />` + segment-adaptive inputs:
     - For individuals/groups: dynamic rows (`.member-row`) with `+/-` stepper buttons (`.age`), inline editable labels where useful, and `"Agregar otro..."` button up to a sensible cap.
     - For B2B/organizations: Tax ID input with live check-digit pill (`DV`), size/tier `<select>`, and warm `.benefit` banner highlighting corporate perks.
- **Right Sticky Card (`.price-card`)**:
  - `.live` pulsing gold dot (`Estimación en vivo`) + protagonist figure in `Playfair Display` + dynamic summary subtitle + 3 `.trust` bullets (`CheckCircle2` / `LockKeyhole`) + `.primary.sun` CTA + `.link` button to open `<Assistance>`.
- **Mobile Thumb Bar (`.mobile-bar`)**:
  - Displays live figure on the left and primary CTA on the right at `<= 600px`.

### 2.5 Archetype B: Transparent Comparison Screen (`Step 2`)
- **Context Bar (`.context`)**: Summarizes Step 1 configuration in one line with a `.secondary` `"Editar..."` back button.
- **Comparison Controls (`.compare-tools`)**:
  - Segmented `.tabs` translating complex terms into plain language (e.g., `Qué incluye` / `Costos o Copagos` / `Exclusiones o Condiciones`).
  - Toggle switch (`.toggle-label`): `"Mostrar solo diferencias"`.
- **3-Tier Plan/Option Grid (`.plan-grid`)**:
  - 3 cards (`Essential / Base`, `Plus / Recommended` with `.recommended` + `<Sparkles /> Más elegido` badge, `Elite / Complete`).
  - Displays total price AND per-unit/per-person breakdown where relevant.
  - Honest exclusions rendered inside soft amber `.exclusion` boxes (`Sin sorpresas`) to build high trust.
  - On mobile: sticky `.mobile-switch` tabs + `.compare-mobile` button (`"Comparar los 3 lado a lado"`).

### 2.6 Archetype C: Identity / Data Capture + Verification (`Step 3`)
- **Left Sticky Summary (`.summary`)**: Mint card showing chosen plan/option, price, key features, and `"Cambiar plan"` button.
- **Right Form Card (`.form-card`)**:
  - Header with `"Guardado automático"` badge + `.autofill` QA bar (`Probar con datos: [Persona] [Empresa]`).
  - `.form-grid` (`1fr 1fr`, `.span-2` for full-width fields) adapting dynamically between Natural Person and Legal Entity (`NIT`/Company).
  - `.privacy` reassurance box (`<ShieldCheck /> Tus datos viajan cifrados...`).
  - **Optional Verification Sub-Stage (`<Otp>`)**:
    - Quick declaration/consent checkbox + `03:00` countdown timer + centered 6-digit numeric `.otp-input` + alternative delivery buttons (`WhatsApp`, `Llamada`) + `.otp-test` simulation buttons (`Simular código correcto (123456)` / `Simular código incorrecto`).
  - **Pre-Checkout Confirmation (`<Success>`)**: Celebratory checkmark with 2x2 `.success-grid` summary before final payment/signature.

### 2.7 Archetype D: Payment / Final Action + Printable Receipt (`Step 4`)
- **State Machine**: `'form' | 'processing' | 'error' | 'thanks'`.
- **Form State (`.payment-layout`)**:
  - Left `.payment-card`: Branded `.card-visual` (live-updating last 4 digits and holder name over forest gradient), masked payment/booking inputs, billing frequency selector, explicit authorization checkbox, `.pay-button` with `<LockKeyhole />`, and `.payment-sim` QA controls (`Simular transacción correcta` / `Simular transacción errónea`).
  - If `'error'`: Renders empathetic `.payment-error` (`role="alert"`) reassuring the user that their configuration remains saved.
  - Right `.purchase-summary`: Breakdown of amount due today, recurring/contract terms, value reminders, and back button.
- **Processing State (`<PaymentLoading>`)**: Centered card (`aria-live="polite" aria-busy="true"`) with spinning `<LoaderCircle />` and 3 pulsing dots (`900ms`).
- **Thank-You State (`<ThankYou>`)**:
  - Brand header + `.thank-you-check` + `"Pago aprobado"` (or `"Solicitud confirmada"`) eyebrow + personalized `<h1>` and email confirmation notice.
  - 4-column `.confirmation-card` (Reference code `PREFIX-YYYY-NNNNNN`, Selected Plan, Amount/Value, Covered Scope).
  - `.documents-card` listing the 4 digital deliverables sent to the user's inbox.
  - `.thank-actions`: `"Descargar comprobante"` (`window.print()`) + `"Volver al inicio"`.

### 2.8 `<Assistance>` (Omnichannel Assisted-Sale Slide-Over Drawer)
- Triggered from Header, `.price-card`, or `.network-banner`.
- Preloads and displays the user's exact active plan/option, live price, and count (*"Ya tenemos lista tu cotización... No tendrás que repetir nada"*).
- Requests **only 2 fields** (Name + Mobile phone) with instant validation, transitioning to `.drawer-success` (*"Un especialista te llamará en menos de 5 minutos"*).

---

## 3. Connecting to a Real Backend (When Applicable)

If the target workspace includes or requests a real backend (Node/Express, Next.js Route Handlers, FastAPI, Supabase, etc.):
1. Keep the **live Step 1 estimator instant on the client** (or debounce background rate fetches while showing optimistic cached calculations) so the UX never blocks on spinners during exploration.
2. Persist drafts both in `localStorage` (instant resilience) and via background `POST /api/quotes` or `PATCH /api/drafts/:id` if server persistence is required.
3. Wire `<Assistance>`, `<Otp>`, and `<PaymentStep>` handlers to real endpoints while **retaining `<Evaluator>` simulation controls in development/demo mode** so QA and stakeholders can still test every state effortlessly.
