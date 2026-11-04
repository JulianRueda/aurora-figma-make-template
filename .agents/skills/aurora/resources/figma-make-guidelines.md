# figma-make-app · Sistema de Diseño y UX Aurora

React 19 + Vite + Tailwind CSS v4 + `lucide-react` corriendo dentro de Figma Make.

## Servidor y Estructura Base de Figma Make

- El servidor de desarrollo Vite ya corre automáticamente en `$PORT` (8443) con Hot Reload activo. No intentes iniciarlo manualmente.
- Archivos principales:
  - `src/main.tsx` — Punto de entrada React; importa `src/index.css` y monta `src/App.tsx` en `#root`.
  - `src/index.css` — Fuentes Google (`DM Sans` + `Playfair Display`), `@import 'tailwindcss';`, tokens `:root` y clases base del Sistema Aurora (con doble soporte `@media` y `@container aurora-preview`).
  - `src/App.tsx` — Componente principal de la aplicación y motor de estado en cliente.

---

## Regla Principal: Cómo Interpretar el Prompt del Usuario

Cuando el usuario describa **Objetivo de negocio**, **Público objetivo** y **Proceso de alto nivel**, construye una experiencia interactiva completa bajo el **Sistema Editorial-Trust de Aurora** siguiendo este mapeo obligatorio:

1. **Objetivo de Negocio → Promesa de Valor en Vivo y Cierre**:
   - **Valor antes que datos personales (*Value-First*)**: En el Paso 1 el usuario SIEMPRE calcula su estimación real en vivo (precio, cuota, ahorro, puntaje o plan sugerido) con `useMemo` sin entregar datos de contacto (*"Cotiza/Simula al instante sin entregar tus datos"*).
   - **Tarjeta lateral oscura sticky (`.price-card`)**: Fondo `--forest` (`#0a4d2e`), punto pulsante `--sun` (`Estimación en vivo`), cifra protagonista en `Playfair Display` (`33px`), 3 bullets de confianza (`.trust`), botón `.primary.sun` y enlace secundario para abrir el drawer de **Venta/Ayuda Asistida (`<Assistance>`)**.
   - **Cierre (`<ThankYou>`)**: Código de referencia único (`AUR-YYYY-NNNNNN` o prefijo de la marca), resumen en `.confirmation-card` de 4 columnas, entregables digitales en `.documents-card` y botón `"Descargar comprobante"` (`window.print()`).

2. **Público Objetivo → Adaptación Dinámica por Segmento**:
   - Crea de 2 a 4 tarjetas seleccionables en `.profile-grid` / `.profile-card` (`aria-pressed`) con iconos de `lucide-react` representando los perfiles del público objetivo (ej. Individual, Familia/Equipo, Empresa con NIT).
   - Al cambiar de perfil, adapta dinámicamente los campos (ej. filas dinámicas `.member-row` con botones `+/-` `.age` vs. campos corporativos `.company-fields` con cálculo automático de dígito de verificación `DV` módulo 11 y banner `.benefit` ámbar), descuentos por volumen y el formulario de datos (Persona Natural vs. Persona Jurídica).
   - Incluye barra `.autofill` en formularios (`Probar con datos: [Perfil A] / [Perfil B]`).

3. **Proceso de Alto Nivel → Stepper Sticky y Arquetipos de Pantalla**:
   - Convierte el proceso en un `.stepper` horizontal de 3 a 5 pasos dentro de `<Header>` (pasos previos con `<Check />` clicables para volver; paso actual con `aria-current="step"` y borde inferior `--sun`).
   - Abre cada pantalla con `<Intro eyebrow title text />` (`<Sparkles />` en pill verde suave + `h1` en `Playfair Display` + `p` claro).
   - Usa los arquetipos del sistema según corresponda al proceso:
     - **Paso de Configuración / Simulación**: `.config-layout` (`2fr / 1fr`) con bloques numerados `<SectionTitle n="1/2">` + `.price-card` sticky + `.mobile-bar` fija inferior en móvil.
     - **Paso de Comparación / Selección**: Barra `.context` con botón `"Editar"`, pestañas `.tabs` en lenguaje simple (`Qué incluye`, `Costos/Copagos`, `Exclusiones/Sin sorpresas` en recuadro ámbar `.exclusion`), switch `"Mostrar solo diferencias"`, grilla `.plan-grid` de 3 planes con el central `.recommended` (`Más elegido` en `--sun`) y `.mobile-switch` sticky en móvil.
     - **Paso de Datos / Identidad + OTP**: `.holder-layout` (`280px / 1fr`) con `.summary` verde suave sticky a la izquierda + `.form-card` con `.form-grid` de 2 columnas, aviso `.privacy`, sub-etapa opcional `<Otp>` (temporizador `03:00`, canales alternativos WhatsApp/Llamada y botones de prueba `.otp-test`) y confirmación intermedia `<Success>`.
     - **Paso de Pago / Acción Final**: `.payment-layout` (`1.45fr / 0.75fr`) con tarjeta visual dinámica `.card-visual` en gradiente `--forest`, estados `'form' | 'processing' | 'error' | 'thanks'`, simuladores `.payment-sim` (`Simular transacción correcta / errónea`), `<PaymentLoading>` y `<ThankYou>`.

---

## Tokens Visuales y Reglas Estrictas de UI (Do / Don't)

- **Paleta obligatoria** (salvo que el usuario pida explícitamente otra marca, manteniendo proporciones cálidas):
  - Fondo app: `--bg: #f7f8f5` (exterior `#eef1ed`); paneles blancos `--surface: #ffffff`; bordes `--border: #e5e7eb`.
  - Primario: `--forest: #0a4d2e`, hover `--forest2: #06351f`, tintes suaves `--green: #ecfdf3` y `--green-border: #a7f3d0`.
  - Acento solar: `--sun: #f5b301`, avisos cálidos `--yellow: #fffbeb` y `--yellow-border: #fde68a` (texto `#92400e`).
  - Semánticos: `--error: #dc2626` (`#fef2f2`), `--success: #15803d` (`#f0fdf4`).
- **Tipografía**:
  - `Playfair Display` SOLO en `h1`, `h2` editoriales y cifras monetarias/KPI principales (`letter-spacing: -0.025em`, `color: var(--forest)`).
  - `DM Sans` en todo el cuerpo (`15px`), subtítulos numerados `.section-title h2` (`16px`), labels y botones (`11px` bold) y microcopy (`9px–10px`).
- **Persistencia, Validación y Accesibilidad**:
  - Guarda todo el estado en `localStorage` bajo una clave versionada y muestra `"Autoguardado activo"` en `<Header>`.
  - Al cambiar de paso ejecuta `scrollFlowToTop()` y enfoca `<main id="main-content" tabIndex={-1}>`.
  - Sanitiza inputs al escribir y muestra errores humanos con ejemplos concretos. Si falla la validación, haz `scrollIntoView({ behavior: 'smooth', block: 'center' })` + `.focus()` en el primer campo con error aplicando `.input-error.shake`.
- **Modo Evaluador UX/UI (`<Evaluator>`) y Doble Responsive**:
  - Incluye siempre la barra superior colapsable `Modo Evaluador UX/UI` con selector de vista (`Desktop 1440` / `Tablet 768` / `Mobile 375` cambiando `.preview-desktop | .preview-tablet | .preview-mobile` en `.site-preview`) y selector de estado (`normal`, `normal-empty`, `empty`, `loading` con `<Skeleton />`, `network` con `.network-banner`, y caso borde B2B/segmento).
  - Si agregas estilos nuevos en `src/index.css`, duplica sus reglas responsive tanto en `@media (max-width: 900px / 600px)` como en `@container aurora-preview (max-width: 900px / 600px)`.
