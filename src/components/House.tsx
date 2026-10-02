import { useState } from 'react';
import { ArrowUpRight, Blinds, Lightbulb } from 'lucide-react';
import { ALL_ON, TECHNOLOGIES } from '../types';
import type { Layers } from '../types';
import { SectionHeading, TechIcon, TechSwitches } from './Shared';

function HouseIllustration({ layers, light, shutters }: { layers: Layers; light: boolean; shutters: boolean }) {
  const color = (value: string) => layers.css ? value : '#fafbf8';
  const windowColor = layers.css ? (light ? '#f7d76f' : '#becdc9') : '#fafbf8';
  return <svg viewBox="0 0 460 280" className={`house-svg ${layers.css ? 'decorated' : 'undecorated'}`} role="img" aria-label={!layers.html ? 'Die Hausstruktur ist ausgeblendet' : `Ein Haus ${layers.css ? 'mit farbiger Gestaltung' : 'ohne Dekoration'} und ${light ? 'eingeschaltetem' : 'ausgeschaltetem'} Licht`}>
    {layers.css && <g className="house-scenery"><circle cx="357" cy="49" r="20" fill="#f6d77d" /><path d="M61 85h37m-18-13h23m236 37h36" stroke="#d2dbcd" strokeWidth="3" strokeLinecap="round" /><ellipse cx="230" cy="247" rx="145" ry="13" fill="#e0e6d9" /></g>}
    <path d="M46 247h368" stroke={layers.css ? '#b6c3ad' : '#b9bfb7'} strokeWidth="2" />
    {layers.html ? <g className="house-building" stroke={layers.css ? '#435446' : '#596159'} strokeWidth="2" strokeLinejoin="round">
      <rect x="121" y="104" width="217" height="142" fill={color('#eee4d2')} />
      <path d="M103 111l126-88 126 88z" fill={color('#cc7658')} />
      <path d="M304 76V38h18v49" fill={color('#cd795e')} />
      <path d="M109 111h241" fill="none" />
      <rect x="145" y="128" width="54" height="58" rx={layers.css ? 3 : 0} fill={windowColor} />
      <rect x="260" y="128" width="54" height="58" rx={layers.css ? 3 : 0} fill={windowColor} />
      {shutters ? <g><path d="M145 128h54v30h-54zM260 128h54v30h-54z" fill={color('#839484')} /><path d="M145 135h54m-54 8h54m-54 8h54m61-16h54m-54 8h54m-54 8h54" stroke={layers.css ? '#627963' : '#596159'} /></g> : <g><path d="M145 128h54v7h-54zM260 128h54v7h-54z" fill={color('#839484')} /></g>}
      <path d="M172 135v51m-27-25h54m88-26v51m-27-25h54" />
      <path d="M207 246v-59q0-24 22-24t22 24v59z" fill={color('#768c72')} />
      <circle cx="239" cy="214" r="2" fill={layers.css ? '#e4cb86' : '#596159'} stroke="none" />
      {layers.css && <g stroke="none"><rect x="140" y="184" width="64" height="9" rx="2" fill="#c2825e" /><rect x="255" y="184" width="64" height="9" rx="2" fill="#c2825e" /><path d="M149 183q-9-24 2-22q14 4 9 22m14 0q-6-27 5-23q10 8 1 23m84 0q-9-24 2-22q14 4 9 22m14 0q-6-27 5-23q10 8 1 23" fill="#6a8956" /><path d="M216 245l-16 18h61l-17-18" fill="#d9cdb7" /><path d="M346 247v-50" stroke="#68785b" strokeWidth="4" /><circle cx="348" cy="189" r="23" fill="#97a976" /><circle cx="336" cy="195" r="17" fill="#809561" /><rect x="86" y="225" width="22" height="21" rx="4" fill="#c38260" /><path d="M97 228q-21-12-14-21q17-2 14 21m0-3q1-27 11-22q8 12-11 22" fill="#6e8b5a" /></g>}
      {light && layers.css && <circle cx="229" cy="147" r="5" fill="#f4d678" stroke="#bc9a4c" />}
    </g> : <g stroke="#b9c0b3" fill="none" strokeDasharray="6 6"><rect x="121" y="104" width="217" height="142" /><path d="M103 111l126-88 126 88z" /></g>}
    {!layers.html && <text x="230" y="177" textAnchor="middle" fill="#74806d" fontSize="12">Ohne HTML fehlt das Haus.</text>}
  </svg>;
}

export default function House() {
  const [layers, setLayers] = useState<Layers>({ ...ALL_ON });
  const [light, setLight] = useState(false);
  const [shutters, setShutters] = useState(false);
  return <section id="verstehen" className="section page-width house-section"><div className="house-layout"><div className="house-copy"><SectionHeading number="04" eyebrow="EINFACH ERKLÄRT" title="Eine Website ist wie ein Haus." description="Drei Aufgaben, ein Zuhause. Mit dieser Analogie bleibt es hängen." />
    <div className="house-analogy">{TECHNOLOGIES.map(tech => <div key={tech.id} className={`analogy-row ${tech.id} ${layers[tech.id] ? '' : 'muted'}`}><span className="analogy-icon"><TechIcon tech={tech.id} size={20} /></span><div><strong>{tech.name} <span>→ {tech.id === 'html' ? 'Die Architektur' : tech.id === 'css' ? 'Die Einrichtung' : 'Die Technik'}</span></strong><p>{tech.id === 'html' ? 'Wände, Fenster und Räume. Die Grundstruktur.' : tech.id === 'css' ? 'Wandfarben, Möbel und Dekoration. Dein Stil.' : 'Lichtschalter und Rollläden. Es passiert etwas.'}</p></div></div>)}</div>
    <a className="text-link" href="#quiz">Schon verstanden? Teste dein Wissen <ArrowUpRight size={15} /></a></div>
    <div className="house-playground"><div className="house-playground-heading"><span>DEIN KLEINES WEB-HAUS</span><span>↓ Probier es aus</span></div><HouseIllustration layers={layers} light={light} shutters={shutters} /><div className="house-actions"><button disabled={!layers.html || !layers.js} aria-pressed={light} onClick={() => setLight(value => !value)}><Lightbulb size={15} />Licht {light ? 'ausschalten' : 'einschalten'}</button><button disabled={!layers.html || !layers.js} aria-pressed={shutters} onClick={() => setShutters(value => !value)}><Blinds size={15} />Rollladen {shutters ? 'öffnen' : 'schließen'}</button></div>
    <TechSwitches compact layers={layers} prefix="house" onToggle={tech => setLayers(current => ({ ...current, [tech]: !current[tech] }))} /><p className="house-state" aria-live="polite">{!layers.html ? 'Keine Struktur, kein Haus. HTML bringt es zurück.' : !layers.js ? 'Die Technik pausiert. Licht und Rollladen bleiben in ihrem Zustand.' : !layers.css ? 'Die Dekoration fehlt. Die Technik funktioniert trotzdem.' : 'Alles da! Schalte das Licht ein oder spiele mit den Ebenen.'}</p></div></div>
  </section>;
}
