import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  LoaderCircle,
  LockKeyhole,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  WifiOff,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type Viewport = 'desktop' | 'tablet' | 'mobile'
type DemoState = 'normal' | 'loading' | 'network'
type Segment = 'individual' | 'group' | 'company'

const segments: { id: Segment; icon: typeof UserRound; title: string; text: string; rate: number }[] = [
  { id: 'individual', icon: UserRound, title: 'Persona natural', text: 'Experiencia individual ágil', rate: 145000 },
  { id: 'group', icon: UsersRound, title: 'Familia o equipo', text: '2 a 6 personas · 10% dto.', rate: 261000 },
  { id: 'company', icon: Building2, title: 'Empresa B2B (NIT)', text: 'Facturación corporativa · 14% dto.', rate: 620000 },
]

const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

export default function App() {
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [demo, setDemo] = useState<DemoState>('normal')
  const [toolbarOpen, setToolbarOpen] = useState(true)
  const [segment, setSegment] = useState<Segment>('individual')
  const [helpOpen, setHelpOpen] = useState(false)
  const [helpSent, setHelpSent] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [helpErrors, setHelpErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (demo !== 'loading') return
    const timer = window.setTimeout(() => setDemo('normal'), 900)
    return () => window.clearTimeout(timer)
  }, [demo])

  const activeSegment = segments.find((s) => s.id === segment) || segments[0]
  const previewClass =
    viewport === 'desktop' ? 'preview-desktop' : viewport === 'tablet' ? 'preview-tablet' : 'preview-mobile'

  const submitHelp = () => {
    const next: Record<string, string> = {}
    if (!name.trim()) next['help-name'] = 'Cuéntanos cómo te llamas.'
    if (!/^3\d{9}$/.test(phone)) next['help-phone'] = 'Ingresa un celular de 10 dígitos que empiece por 3.'
    setHelpErrors(next)
    if (Object.keys(next).length === 0) setHelpSent(true)
  }

  return (
    <div className="app-shell">
      <aside className={`evaluator ${toolbarOpen ? 'open' : ''}`}>
        <button className="eval-toggle" onClick={() => setToolbarOpen(!toolbarOpen)} aria-expanded={toolbarOpen}>
          <Sparkles size={15} /> Modo Evaluador UX/UI <ChevronDown size={15} className={toolbarOpen ? 'rotate' : ''} />
        </button>
        {toolbarOpen && (
          <div className="eval-controls">
            <fieldset>
              <legend>Vista</legend>
              <div className="segmented">
                {(['desktop', 'tablet', 'mobile'] as Viewport[]).map((v) => (
                  <button key={v} className={viewport === v ? 'active' : ''} onClick={() => setViewport(v)}>
                    {v === 'desktop' ? 'Desktop 1440' : v === 'tablet' ? 'Tablet 768' : 'Mobile 375'}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>Estado</legend>
              <select value={demo} onChange={(e) => setDemo(e.target.value as DemoState)}>
                <option value="normal">Plantilla lista (Estado normal)</option>
                <option value="loading">Estado de carga · Skeleton</option>
                <option value="network">Error de red / Timeout</option>
              </select>
            </fieldset>
          </div>
        )}
      </aside>

      <div className={`site-preview ${previewClass}`}>
        <header className="header">
          <div className="header-top">
            <div className="brand">
              <img src="/aurora-seguros-logo.png" alt="Aurora" />
              <span className="product-name">Design System Starter</span>
            </div>
            <div className="header-actions">
              <span className="autosave">
                <CheckCircle2 size={15} />
                <span>Autoguardado activo</span>
              </span>
              <button className="help-btn" onClick={() => setHelpOpen(true)}>
                <Phone size={16} />
                <span className="help-long">¿Necesitas ayuda? Prefiero que me llamen</span>
                <span className="help-short">Ayuda</span>
              </button>
            </div>
          </div>
          <nav className="stepper" aria-label="Progreso">
            {['Configuración', 'Comparación', 'Datos y validación', 'Confirmación'].map((label, idx) => {
              const n = idx + 1
              return (
                <button key={label} className={n === 1 ? 'current' : ''} aria-current={n === 1 ? 'step' : undefined}>
                  <span>{n}</span>
                  <b>{label}</b>
                </button>
              )
            })}
          </nav>
        </header>

        {demo === 'network' && (
          <div className="network-banner" role="alert">
            <WifiOff size={19} />
            <div>
              <b>Tuvimos una demora al conectar con el servidor.</b> Tu progreso está guardado en este dispositivo.
            </div>
            <button onClick={() => setDemo('normal')}>
              <RefreshCw size={15} /> Reintentar ahora
            </button>
            <button onClick={() => setHelpOpen(true)}>Continuar con un asesor</button>
          </div>
        )}

        <main id="main-content" tabIndex={-1}>
          {demo === 'loading' ? (
            <div className="skeleton-screen" aria-busy="true">
              <div className="sk eyebrow-sk" />
              <div className="sk title-sk" />
              <div className="sk body-sk" />
              <div className="sk-layout">
                <div className="sk-panel">
                  <div className="sk section-sk" />
                  <div className="sk-cards">
                    <div className="sk" />
                    <div className="sk" />
                    <div className="sk" />
                  </div>
                  <div className="sk member-sk" />
                </div>
                <div className="sk price-sk" />
              </div>
              <p>
                <LoaderCircle /> Preparando tu experiencia personalizada…
              </p>
            </div>
          ) : (
            <div className="screen">
              <div className="intro">
                <span className="eyebrow">
                  <Sparkles /> Plantilla Editorial-Trust lista para Figma Make
                </span>
                <h1>Describe tu negocio en el chat para generar tu flujo</h1>
                <p>
                  Este repositorio ya incluye los tokens visuales, tipografías, contenedor responsive y reglas UX de
                  Aurora en <b>AGENTS.md</b> y <b>src/index.css</b>.
                </p>
              </div>

              <div className="config-layout">
                <section className="panel">
                  <div className="section-title">
                    <span>1</span>
                    <div>
                      <h2>Selecciona un segmento de prueba</h2>
                      <p>El prompt del usuario reemplazará este bloque por los perfiles reales del público objetivo.</p>
                    </div>
                  </div>

                  <div className="profile-grid">
                    {segments.map((item) => {
                      const Icon = item.icon
                      const selected = segment === item.id
                      return (
                        <button
                          key={item.id}
                          className={`profile-card ${selected ? 'selected' : ''}`}
                          onClick={() => setSegment(item.id)}
                          aria-pressed={selected}
                        >
                          <span className="profile-icon">
                            <Icon />
                          </span>
                          <span>
                            <b>{item.title}</b>
                            <small>{item.text}</small>
                          </span>
                          <i>{selected && <Check />}</i>
                        </button>
                      )
                    })}
                  </div>

                  <div className="section-title compact">
                    <span>2</span>
                    <div>
                      <h2>Estructura del prompt recomendada en Figma Make</h2>
                      <p>Copia este esquema en el chat para construir cualquier cotizador, onboarding o checkout:</p>
                    </div>
                  </div>

                  <div className="privacy">
                    <ShieldCheck />
                    <span>
                      <b>Objetivo de negocio · Público objetivo · Proceso de alto nivel</b>
                      Describe qué conversión buscas sin fricción, a qué segmentos diriges el producto y cuáles son las
                      etapas principales del recorrido.
                    </span>
                  </div>
                </section>

                <aside className="price-card">
                  <span className="live">
                    <i /> Estimación en vivo
                  </span>
                  <p>Valor dinámico de referencia</p>
                  <strong>
                    {money.format(activeSegment.rate)}
                    <small>COP / mes · {activeSegment.title}</small>
                  </strong>
                  <p>Valor antes que datos personales: cotiza sin pedir contacto en el primer paso.</p>
                  <div className="trust">
                    <span>
                      <CheckCircle2 /> Tokens y CSS Aurora precargados
                    </span>
                    <span>
                      <CheckCircle2 /> Responsive Desktop · Tablet · Mobile
                    </span>
                    <span>
                      <LockKeyhole /> Validación empática y autoguardado
                    </span>
                  </div>
                  <button className="primary sun" onClick={() => setHelpOpen(true)}>
                    Probar drawer de venta asistida <ArrowRight />
                  </button>
                </aside>
              </div>

              <div className="mobile-bar">
                <div>
                  <small>Estimación en vivo</small>
                  <b>{money.format(activeSegment.rate)} / mes</b>
                </div>
                <button className="primary" onClick={() => setHelpOpen(true)}>
                  Continuar <ArrowRight />
                </button>
              </div>
            </div>
          )}
        </main>

        <footer>
          <span>
            <ShieldCheck size={17} /> Sistema de Diseño Aurora
          </span>
          <p>Plantilla base para Figma Make y Google Antigravity.</p>
        </footer>
      </div>

      {helpOpen && (
        <div className="backdrop" onMouseDown={(e) => e.target === e.currentTarget && setHelpOpen(false)}>
          <aside className="drawer" role="dialog" aria-modal="true">
            <button className="drawer-close" onClick={() => setHelpOpen(false)}>
              <X />
            </button>
            {helpSent ? (
              <div className="drawer-success">
                <span>
                  <Check />
                </span>
                <h2>Solicitud recibida</h2>
                <p>Un especialista continuará contigo con toda tu configuración cargada, sin empezar de cero.</p>
                <button
                  className="primary full"
                  onClick={() => {
                    setHelpOpen(false)
                    setHelpSent(false)
                  }}
                >
                  Volver a la experiencia
                </button>
              </div>
            ) : (
              <>
                <span className="drawer-icon">
                  <Phone />
                </span>
                <small>Venta asistida contextual</small>
                <h2>Te llamamos sin hacerte empezar de cero</h2>
                <p>
                  Contexto precargado: <b>{activeSegment.title}</b> por <b>{money.format(activeSegment.rate)}/mes</b>.
                </p>
                <div className="quote-loaded">
                  <CheckCircle2 /> Tu avance se enviará al especialista automáticamente.
                </div>
                <label>
                  Tu nombre
                  <input
                    id="help-name"
                    className={helpErrors['help-name'] ? 'input-error shake' : ''}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="¿Cómo te llamas?"
                  />
                  {helpErrors['help-name'] && (
                    <span className="error" role="status">
                      <CircleAlert />
                      {helpErrors['help-name']}
                    </span>
                  )}
                </label>
                <label>
                  Celular
                  <input
                    id="help-phone"
                    className={helpErrors['help-phone'] ? 'input-error shake' : ''}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    inputMode="tel"
                    placeholder="3001234567"
                  />
                  {helpErrors['help-phone'] && (
                    <span className="error" role="status">
                      <CircleAlert />
                      {helpErrors['help-phone']}
                    </span>
                  )}
                </label>
                <button className="primary large full" onClick={submitHelp}>
                  Quiero que me llamen <Phone />
                </button>
                <small className="fineprint">En menos de 5 minutos. Sin encuestas ni compromisos.</small>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}
