import { useState } from 'react';
import { AlignCenter, AlignLeft, AlignRight, Image, Lightbulb, List, MousePointer2, Plus, RotateCcw, Type, Undo2, Zap } from 'lucide-react';
import { plantImage } from '../demo/assets';
import { CodeBlock, SectionHeading, TechIcon } from './Shared';

const ELEMENTS = [
  { label: 'Überschrift', Icon: Type, code: '<h2>Hallo, Welt!</h2>' },
  { label: 'Absatz', Icon: AlignLeft, code: '<p>Meine erste eigene Website.</p>' },
  { label: 'Button', Icon: MousePointer2, code: '<button>Klick mich</button>' },
  { label: 'Bild', Icon: Image, code: `<img src="${plantImage}" alt="Eine grüne Zimmerpflanze" width="100" height="75">`, display: '<img src="pflanze.svg"\n  alt="Eine grüne Zimmerpflanze"\n  width="100" height="75">' },
  { label: 'Liste', Icon: List, code: '<ul>\n  <li>Eine Idee</li>\n  <li>Eine eigene Website</li>\n</ul>' },
];

function ExperimentHeader({ tech, title, description }: { tech: 'html' | 'css' | 'js'; title: string; description: string }) {
  return <div className="experiment-header"><span className={`experiment-tech ${tech}`}><TechIcon tech={tech} size={17} />{tech === 'js' ? 'JAVASCRIPT' : tech.toUpperCase()}</span><h3>{title}</h3><p>{description}</p></div>;
}

function HtmlBuilder() {
  const [elements, setElements] = useState<number[]>([]);
  const markup = elements.map(id => ELEMENTS[id].code).join('\n');
  const code = elements.map(id => ELEMENTS[id].display || ELEMENTS[id].code).join('\n');
  return <article className="experiment-card html"><ExperimentHeader tech="html" title="Baue dein Fundament." description="Ein Klick, ein Element. So entsteht eine Seite." />
    <div className="builder-buttons">{ELEMENTS.map((element, index) => <button key={element.label} onClick={() => setElements(current => [...current, index])}><element.Icon size={13} />{element.label}<Plus size={11} /></button>)}</div>
    <div className="experiment-preview-label"><span>DEINE MINI-SEITE</span><button disabled={!elements.length} onClick={() => setElements(current => current.slice(0, -1))} aria-label="Letztes HTML-Element entfernen" title="Letztes Element entfernen"><Undo2 size={13} /></button><button disabled={!elements.length} onClick={() => setElements([])} aria-label="HTML-Experiment zurücksetzen" title="Leere Seite"><RotateCcw size={13} /></button></div>
    <div className="builder-preview"><iframe title="HTML-Experiment Vorschau" sandbox="" srcDoc={`<!doctype html><html lang="de"><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; script-src 'none'; style-src 'none'"></head><body>${markup}</body></html>`} />{elements.length === 0 && <div className="builder-empty"><Plus size={23} /><p>Noch ganz leer.<br />Füge dein erstes Element hinzu.</p></div>}</div>
    <CodeBlock label="DEIN HTML" code={code || '<!-- Hier entsteht deine Website. -->'} />
    <div className="experiment-takeaway"><Lightbulb size={14} />HTML beschreibt, was auf der Seite steht.</div>
  </article>;
}

function CssDesigner() {
  const initial = { background: '#ffffff', color: '#202620', size: 16, radius: 0, spacing: 8, align: 'left' as 'left' | 'center' | 'right' };
  const [design, setDesign] = useState(initial);
  const [touched, setTouched] = useState(false);
  function update<K extends keyof typeof design>(property: K, value: typeof design[K]) { setTouched(true); setDesign(current => ({ ...current, [property]: value })); }
  const css = `body {\n  background: ${design.background};\n  color: ${design.color};\n  font-size: ${design.size}px;\n  border-radius: ${design.radius}px;\n  padding: ${design.spacing}px;\n  text-align: ${design.align};\n}`;
  return <article className="experiment-card css"><ExperimentHeader tech="css" title="Mach es zu deinem Design." description="Gleicher Inhalt. Tausend Möglichkeiten." />
    <div className="designer-controls"><div className="color-controls"><label><span>Hintergrund</span><input type="color" aria-label="Hintergrundfarbe" value={design.background} onChange={event => update('background', event.target.value)} /></label><label><span>Textfarbe</span><input type="color" aria-label="Textfarbe" value={design.color} onChange={event => update('color', event.target.value)} /></label><div className="alignment-control" role="group" aria-label="Textausrichtung">{(['left', 'center', 'right'] as const).map((align, index) => { const Icon = [AlignLeft, AlignCenter, AlignRight][index]; return <button key={align} aria-label={['Linksbündig', 'Zentriert', 'Rechtsbündig'][index]} aria-pressed={design.align === align} onClick={() => update('align', align)}><Icon size={14} /></button>; })}</div></div>
      <label className="range-control"><span>Schriftgröße <output>{design.size}px</output></span><input type="range" aria-label="Schriftgröße" min="12" max="28" value={design.size} onChange={event => update('size', Number(event.target.value))} /></label>
      <div className="range-pair"><label className="range-control"><span>Rundung <output>{design.radius}px</output></span><input type="range" aria-label="Border Radius" min="0" max="36" value={design.radius} onChange={event => update('radius', Number(event.target.value))} /></label><label className="range-control"><span>Abstand <output>{design.spacing}px</output></span><input type="range" aria-label="Abstand" min="0" max="32" value={design.spacing} onChange={event => update('spacing', Number(event.target.value))} /></label></div>
    </div>
    <div className="experiment-preview-label"><span>DEIN DESIGN {touched ? '· CSS AKTIV' : '· NOCH OHNE CSS'}</span><button aria-label="CSS-Experiment zurücksetzen" onClick={() => { setDesign(initial); setTouched(false); }}><RotateCcw size={13} /></button></div>
    <div className="designer-preview"><iframe title="CSS-Experiment Vorschau" sandbox="" srcDoc={`<!doctype html><html lang="de"><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'none'">${touched ? `<style>${css}</style>` : ''}</head><body><h3>Hallo, schöne Welt.</h3><p>Ein bisschen CSS. Ein ganz neues Gefühl.</p><button>Dein Lieblingsbutton</button></body></html>`} /></div>
    <CodeBlock label={touched ? 'DEIN CSS' : 'DEIN CSS · WIRD BEIM ERSTEN ÄNDERN AKTIV'} code={css} />
    <div className="experiment-takeaway"><Lightbulb size={14} />CSS bestimmt, wie die Inhalte aussehen.</div>
  </article>;
}

function JavascriptExperiment() {
  const [active, setActive] = useState(true);
  const [count, setCount] = useState(0);
  const [light, setLight] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const phrases = ['Hallo, Welt!', 'Du hast etwas verändert!', 'Eine Idee wird lebendig.'];
  return <article className={`experiment-card js ${active ? '' : 'js-paused'}`}><ExperimentHeader tech="js" title="Bring Leben hinein." description="Eine Aktion. Eine Reaktion. Deine Magie." />
    <div className="js-examples"><div className="js-example counter-example"><div><span className="js-example-label">01 / EIN KLICK MEHR</span><strong aria-live="polite">{String(count).padStart(2, '0')}</strong></div><button aria-label="Zähler erhöhen" aria-disabled={!active} onClick={() => { if (active) setCount(value => value + 1); }}><Plus size={18} /><span>Hochzählen</span></button></div>
    <div className={`js-example lamp-example ${light ? 'lit' : ''}`}><div><span className="js-example-label">02 / ES WERDE LICHT</span><span className="lamp-output"><Lightbulb size={26} /><strong>{light ? 'Licht an!' : 'Licht aus.'}</strong></span></div><button aria-label="Lampe umschalten" aria-pressed={light} aria-disabled={!active} onClick={() => { if (active) setLight(value => !value); }}><Zap size={16} /><span>Umschalten</span></button></div>
    <div className="js-example text-example"><div><span className="js-example-label">03 / NEUE WORTE</span><strong aria-live="polite">{phrases[textIndex]}</strong></div><button aria-label="Text verändern" aria-disabled={!active} onClick={() => { if (active) setTextIndex(value => (value + 1) % phrases.length); }}><Type size={16} /><span>Ändern</span></button></div></div>
    <button className={`js-experiment-toggle ${active ? 'active' : ''}`} role="switch" aria-checked={active} aria-label="JavaScript im Mini-Experiment" onClick={() => setActive(value => !value)}><Zap size={14} /><span>JavaScript {active ? 'aktiv' : 'pausiert'}</span><span className="toggle-track"><span /></span></button>
    <p className="js-experiment-status" aria-live="polite">{active ? 'Schalte JS aus. Was passiert beim nächsten Klick?' : 'Die Werte bleiben stehen. Schalte JS wieder an, um weiterzumachen.'}</p>
    <CodeBlock label="SO FUNKTIONIERT DER ZÄHLER" code={`button.addEventListener('click', () => {\n  zaehler = zaehler + 1;\n  ausgabe.textContent = zaehler;\n});`} />
    <div className="experiment-takeaway"><Lightbulb size={14} />JavaScript reagiert und verändert Inhalte.</div>
  </article>;
}

export default function Experiments() {
  return <section id="experimente" className="section page-width experiments-section"><SectionHeading number="02" eyebrow="DEINE KLEINEN EXPERIMENTE" title="Jetzt bist du dran." description="Baue, gestalte und erwecke zum Leben. Jedes Experiment ist dein eigener kleiner Spielplatz." /><div className="experiments-grid"><HtmlBuilder /><CssDesigner /><JavascriptExperiment /></div></section>;
}
