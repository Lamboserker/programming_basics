import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, CircleHelp, Lightbulb, LockKeyhole, RotateCcw, Terminal } from 'lucide-react';
import type { Layers, Technology } from '../types';
import { ALL_ON } from '../types';
import { buildDocument } from '../demo/document';
import { DEFAULT_SOURCES } from '../demo/shop';
import CodeInspector from './CodeInspector';
import { MissionNotebook } from './Missions';
import { SectionHeading, TechSwitches } from './Shared';

function explain(layers: Layers) {
  if (!layers.html) return { title: 'Ohne Skelett gibt es keine Seite.', text: 'HTML liefert die Inhalte. Ohne Dokumentelemente gibt es hier nichts, das CSS gestalten oder JavaScript steuern könnte.', mode: 'html' };
  if (!layers.css && !layers.js) return { title: 'Zurück zum Fundament: pures HTML.', text: 'Inhalte, Links und aufklappbare Elemente bleiben. Design und dynamische Shop-Funktionen fehlen. Probiere „Was ist dieser Shop?“ aus!', mode: 'html' };
  if (!layers.css) return { title: 'Hoppla! Das Design ist weg.', text: 'Die Inhalte sind noch da, und JavaScript läuft weiter. Lege ein Produkt in den Warenkorb – auch ohne Farben, Schriften und Layout.', mode: 'css' };
  if (!layers.js) return { title: 'Schön anzusehen. Aber ein bisschen eingefroren.', text: 'Warenkorb, Live-Suche und Filter reagieren nicht mehr. Normale Links und aufklappbare HTML-Elemente funktionieren weiterhin.', mode: 'js' };
  return { title: 'Das ganze Team ist am Start.', text: 'HTML liefert die Inhalte, CSS gestaltet sie und JavaScript steuert die dynamischen Funktionen. Alles funktioniert!', mode: 'all' };
}

export default function Laboratory({ completed, onMission }: { completed: number[]; onMission: (id: number) => void }) {
  const [layers, setLayers] = useState<Layers>({ ...ALL_ON });
  const [sources, setSources] = useState(DEFAULT_SOURCES);
  const [revision, setRevision] = useState(0);
  const [highlighted, setHighlighted] = useState<Technology | null>(null);
  const [error, setError] = useState('');
  const explored = useRef(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const token = useMemo(() => crypto.randomUUID().replaceAll('-', ''), [layers, sources, revision]);
  const document = useMemo(() => buildDocument(sources, layers, token), [sources, layers, token]);
  const explanation = explain(layers);

  useEffect(() => {
    if (layers.html && !layers.css && !layers.js) onMission(2);
    if (explored.current && layers.html && layers.css && layers.js) onMission(3);
  }, [layers, onMission]);
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow || !event.data || event.data.channel !== 'weblab' || event.data.token !== token) return;
      if (event.data.type === 'cart-add' && layers.html && !layers.css && layers.js) onMission(0);
      if (event.data.type === 'error' && typeof event.data.message === 'string') setError(event.data.message.slice(0, 300));
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [layers, onMission, token]);
  useEffect(() => {
    if (!highlighted) return;
    const timer = window.setTimeout(() => setHighlighted(null), 850);
    return () => window.clearTimeout(timer);
  }, [highlighted, layers]);

  function toggle(tech: Technology) {
    explored.current = true;
    setError('');
    setHighlighted(!layers[tech] ? tech : null);
    setLayers(current => ({ ...current, [tech]: !current[tech] }));
  }

  function observeFrozenFilter() {
    if (layers.js || !layers.html) return;
    // In JS-off mode only, allow-same-origin lets the OUTER app passively observe
    // filter attempts. The iframe contains zero scripts and script-src 'none'.
    // We never combine allow-same-origin and allow-scripts, and this observer
    // neither updates products nor restores any disabled shop functionality.
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    const capture = (event: Event) => {
      const target = event.target as Element | null;
      if (target?.closest('[data-filter], #search')) onMission(1);
    };
    doc.addEventListener('click', capture, { capture: true });
    doc.addEventListener('input', capture, { capture: true });
  }

  return <section id="labor" className="section page-width lab-section">
    <div className="section-title-row"><SectionHeading number="01" eyebrow="DAS INTERAKTIVE WEBLAB" title="Eine Website. Drei Superkräfte." description="Was passiert, wenn eine fehlt? Du hast die Schalter in der Hand." /><span className="live-badge"><span className="status-dot" /> LIVE-EXPERIMENT</span></div>
    <div className="lab-grid"><div className="lab-main">
      <div className="lab-controls"><TechSwitches layers={layers} onToggle={toggle} /><button className="reset-button" onClick={() => { setLayers({ ...ALL_ON }); setSources(DEFAULT_SOURCES); setRevision(value => value + 1); setError(''); setHighlighted('html'); }} title="Aktiviert alle Technologien, lädt den Originalcode und leert den Demo-Warenkorb"><RotateCcw size={15} /><span>Alles zurücksetzen</span></button></div>
      <div className={`state-explanation ${explanation.mode}`} aria-live="polite"><span className="explanation-icon"><Lightbulb size={19} /></span><div><strong>{explanation.title}</strong><p>{explanation.text}</p></div></div>
      <div className="browser-window"><div className="browser-chrome"><div className="browser-dots" aria-hidden="true"><i /><i /><i /></div><div className="browser-address"><LockKeyhole size={11} /><span>minishop.weblab / dein-experiment</span></div><span className="browser-expand" title="Die Vorschau ist unabhängig von der WebLab-Oberfläche"><ArrowUpRight size={15} /></span></div>
        <div className="browser-content"><iframe key={token} ref={frameRef} title="MiniShop – interaktive Vorschau" srcDoc={document} sandbox={layers.html && layers.js ? 'allow-scripts' : 'allow-same-origin'} onLoad={observeFrozenFilter} />
        {!layers.html && <div className="empty-document"><div className="empty-wireframe"><span /><span /><span /></div><strong>Hier fehlt das Fundament.</strong><p>Schalte HTML wieder ein,<br />um die Inhalte zurückzubringen.</p><span className="empty-caption">DAS IFRAME-DOKUMENT IST TATSÄCHLICH LEER</span></div>}</div>
        <div className="browser-bottom"><span><span className={`status-dot ${layers.js && layers.html ? '' : 'paused'}`} />{!layers.html ? 'Kein Seiteninhalt' : layers.js ? 'Interaktionen aktiv' : 'Dynamische Interaktionen pausiert'}</span><span>ECHTE WEBSITE · ECHTE AUSWIRKUNGEN</span></div>
      </div>
      {error && <div className="code-error" role="alert"><Terminal size={17} /><div><strong>Dein JavaScript braucht noch einen kleinen Feinschliff.</strong><code>{error}</code><p>Prüfe den Code oder lade den Originalcode im Inspector.</p></div></div>}
      <CodeInspector layers={layers} sources={sources} highlighted={highlighted} onApply={next => { setSources({ ...next }); setRevision(value => value + 1); setError(''); }} />
      <p className="lab-footnote"><CircleHelp size={13} /><span>Jeder Schalter baut die Vorschau neu auf. Dabei wird der Demo-Warenkorb geleert.</span></p>
    </div><MissionNotebook completed={completed} /></div>
  </section>;
}
