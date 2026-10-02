import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Code2, Eye, EyeOff, Play, RotateCcw } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import type { Layers, Sources, Technology } from '../types';
import { TECHNOLOGIES } from '../types';
import { DEFAULT_SOURCES, SNIPPETS } from '../demo/shop';

export default function CodeInspector({ layers, sources, onApply, highlighted }: {
  layers: Layers; sources: Sources; onApply: (sources: Sources) => void; highlighted: Technology | null;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Technology>('html');
  const [hiddenLayers, setHiddenLayers] = useState<Technology[]>([]);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(sources);
  const [applied, setApplied] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => { setDraft(sources); }, [sources]);
  useEffect(() => { if (highlighted) setActive(highlighted); }, [highlighted]);
  useEffect(() => {
    if (!applied) return;
    const timer = window.setTimeout(() => setApplied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [applied]);
  const hidden = hiddenLayers.includes(active);
  const currentTech = TECHNOLOGIES.find(tech => tech.id === active)!;
  const changed = draft.html !== sources.html || draft.css !== sources.css || draft.js !== sources.js;
  const displayed = sources[active] === DEFAULT_SOURCES[active] ? SNIPPETS[active] : sources[active];
  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : -1) + 3) % 3;
    setActive(TECHNOLOGIES[next].id);
    tabRefs.current[next]?.focus();
  }
  return <div className={`code-inspector ${open ? 'expanded' : ''} ${highlighted ? `highlight-${highlighted}` : ''}`}>
    <button className="inspector-disclosure" aria-expanded={open} aria-controls="code-inspector-content" onClick={() => setOpen(value => !value)}><span><Code2 size={17} /><strong>Ein Blick hinter die Kulissen</strong><span className="disclosure-note">Code ansehen & verändern</span></span><ChevronDown size={18} /></button>
    {open && <div id="code-inspector-content">
      <div className="inspector-toolbar"><div className="code-tabs" role="tablist" aria-label="Code-Technologie">{TECHNOLOGIES.map((tech, index) => <button key={tech.id} ref={node => { tabRefs.current[index] = node; }} role="tab" id={`code-tab-${tech.id}`} aria-controls="code-panel" aria-selected={active === tech.id} tabIndex={active === tech.id ? 0 : -1} onKeyDown={event => handleTabKey(event, index)} onClick={() => setActive(tech.id)} className={`${tech.id} ${active === tech.id ? 'selected' : ''} ${layers[tech.id] ? '' : 'inactive'}`}><span className="tab-dot" />{tech.name}{!layers[tech.id] && <small>AUS</small>}</button>)}</div>
      <div className="code-tools"><button title={hidden ? 'Code-Ebene einblenden' : 'Code-Ebene ausblenden'} aria-label={hidden ? 'Code-Ebene einblenden' : 'Code-Ebene ausblenden'} onClick={() => setHiddenLayers(current => hidden ? current.filter(tech => tech !== active) : [...current, active])}>{hidden ? <EyeOff size={15} /> : <Eye size={15} />}</button><button className={editing ? 'selected' : ''} onClick={() => setEditing(value => !value)}>{editing ? 'Auszug ansehen' : 'Code bearbeiten'}</button></div></div>
      <div className="code-file-row"><span>{currentTech.file} <span>· {editing ? 'vollständige Quelle' : 'ein verständlicher Auszug'}</span></span><span className={layers[active] ? 'file-active' : 'file-inactive'}>{layers[active] ? 'In der Vorschau aktiv' : 'Aus der Vorschau entfernt'}</span></div>
      <div id="code-panel" role="tabpanel" aria-labelledby={`code-tab-${active}`} tabIndex={0} className={`code-panel ${layers[active] ? '' : 'layer-off'}`}>
      {hidden ? <p className="code-hidden"><EyeOff size={20} /> Diese Code-Ebene ist eingeklappt. Blende sie mit dem Augen-Symbol wieder ein.</p> : editing ? <textarea aria-label={`${currentTech.name}-Code bearbeiten`} spellCheck={false} value={draft[active]} onChange={event => setDraft(current => ({ ...current, [active]: event.target.value }))} /> : <pre><code>{displayed.split('\n').map((line, index) => <span className="code-line" key={index}><span className="line-number" aria-hidden="true">{index + 1}</span><span>{line || ' '}</span></span>)}</code></pre>}
      </div>
      {editing && <div className="editor-footer"><p>Ändere zum Beispiel eine Farbe oder die Überschrift. Beim Anwenden startet der Shop neu.</p><div><button className="text-button" onClick={() => setDraft(DEFAULT_SOURCES)}><RotateCcw size={13} /> Originalcode laden</button><button className="apply-button" disabled={!changed} onClick={() => { onApply(draft); setApplied(true); }}>{applied ? <Check size={14} /> : <Play size={14} />}{applied ? 'Angewendet' : 'Änderungen anwenden'}</button></div></div>}
    </div>}
  </div>;
}
