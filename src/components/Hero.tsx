import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, FlaskConical, Menu, MousePointer2, Plus, Sparkles, X } from 'lucide-react';
import { TechIcon } from './Shared';

export function Header({ completed }: { completed: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    <div className="page-width header-content">
      <a className="brand" href="#top" aria-label="WebLab – zur Startseite"><span className="brand-mark"><FlaskConical size={23} /></span><span>Web<span className="brand-light">Lab</span><span className="brand-dot">.</span></span></a>
      <nav aria-label="Hauptnavigation"><a href="#labor">Das Labor</a><a href="#experimente">Experimente</a><a href="#verstehen">Einfach erklärt</a><a href="#quiz">Quiz</a></nav>
      <div className="header-actions"><a className="header-progress" href="#missionen" title="Deine abgeschlossenen Missionen"><span className="progress-dots">{[0, 1, 2, 3].map(i => <i key={i} className={i < completed ? 'done' : ''} />)}</span><span>{completed}/4 <span className="hide-mobile">Missionen</span></span><ArrowUpRight size={14} /></a><button className="mobile-menu-toggle" aria-label={menuOpen ? 'Navigation schließen' : 'Navigation öffnen'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
      {menuOpen && <nav className="mobile-navigation" id="mobile-navigation" aria-label="Mobile Hauptnavigation" onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false); }}>{[['#labor', 'Das Labor'], ['#experimente', 'Experimente'], ['#missionen', 'Missionen'], ['#verstehen', 'Einfach erklärt'], ['#quiz', 'Quiz']].map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={14} /></a>)}</nav>}
    </div>
  </header>;
}

export default function Hero() {
  const [extraElement, setExtraElement] = useState(false);
  const [alternateColor, setAlternateColor] = useState(false);
  const [clicks, setClicks] = useState(0);
  return <section id="top" className="hero-section page-width">
    <div className="lab-badge"><span className="status-dot" /> DEIN ERSTES WEB-EXPERIMENT <span className="badge-divider">/</span> KEIN VORWISSEN NÖTIG</div>
    <h1 className="hero-title"><span className="word-html">HTML</span><span className="equation-symbol"> + </span><span className="word-css">CSS</span><span className="equation-symbol"> + </span><span className="word-js">JS</span><br /><span className="equation-symbol">= </span>Das Web<span className="orange-dot">.</span></h1>
    <p className="hero-description">Drei Technologien. Drei völlig unterschiedliche Aufgaben.<br className="hide-mobile" /> Schalte sie aus und entdecke selbst, was passiert.</p>
    <div className="hero-cards">
      <button className="hero-card html" onClick={() => setExtraElement(value => !value)} aria-label="HTML-Vorschau: ein Element hinzufügen oder entfernen">
        <div className="hero-card-top"><span><TechIcon tech="html" size={17} />HTML</span><span className="card-index">01</span></div>
        <div className="mini-wireframe"><span className="wireframe-label">&lt;h1&gt;</span><i className="wire-heading" /><i className="wire-line" /><i className="wire-line short" /><div className="wire-bottom"><span className="wire-image"><Plus size={16} /></span><span className="wire-button">Button</span></div>{extraElement && <i className="wire-added" />}</div>
        <div className="hero-card-bottom"><div><strong>Das Skelett.</strong><span>Inhalte & Struktur</span></div><span className="card-round-icon"><Plus size={15} /></span></div>
      </button>
      <span className="card-plus first" aria-hidden="true">+</span>
      <button className={`hero-card css ${alternateColor ? 'alternate' : ''}`} onClick={() => setAlternateColor(value => !value)} aria-label="CSS-Vorschau: die Gestaltung wechseln">
        <div className="hero-card-top"><span><TechIcon tech="css" size={17} />CSS</span><span className="card-index">02</span></div>
        <div className="mini-designed"><div className="mini-designed-art"><span className="art-circle" /><span className="art-arch" /><Sparkles size={19} /></div><div className="mini-designed-content"><strong>Hallo, schöne Welt.</strong><div className="mini-colors"><i /><i /><i /></div><span>Entdecken ↗</span></div></div>
        <div className="hero-card-bottom"><div><strong>Das Aussehen.</strong><span>Farben, Formen & Layout</span></div><span className="card-round-icon"><Sparkles size={15} /></span></div>
      </button>
      <span className="card-plus second" aria-hidden="true">+</span>
      <button className="hero-card js" onClick={() => setClicks(value => value + 1)} aria-label="JavaScript-Vorschau: Zähler erhöhen">
        <div className="hero-card-top"><span><TechIcon tech="js" size={17} />JavaScript</span><span className="card-index">03</span></div>
        <div className="mini-interactive"><span className="interaction-lines">↗</span><span className="mini-click-button">Klick mich <Plus size={13} /></span><MousePointer2 className="mini-cursor" size={28} /><span key={clicks} className="mini-notification"><Check size={12} />{clicks ? `${clicks} ${clicks === 1 ? 'Klick' : 'Klicks'}. Läuft!` : 'Hier passiert was!'}</span></div>
        <div className="hero-card-bottom"><div><strong>Das Verhalten.</strong><span>Klicks, Aktionen & Magie</span></div><span className="card-round-icon"><MousePointer2 size={15} /></span></div>
      </button>
    </div>
    <div className="hero-action"><a className="primary-button" href="#labor">Experiment starten <ArrowDown size={17} /></a><span><span className="tiny-spark">✳</span> Anfassen ausdrücklich erlaubt.</span></div>
    <div className="hero-bottom"><span>WENIGER LESEN. MEHR AUSPROBIEREN.</span><span>SCROLL ZUM LABOR <ArrowDown size={12} /></span></div>
  </section>;
}
