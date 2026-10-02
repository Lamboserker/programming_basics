import { ArrowUpRight, Check, Flag, PartyPopper, Trophy } from 'lucide-react';
import { MISSIONS } from '../hooks/useMissions';
import { SectionHeading } from './Shared';
import type { CSSProperties } from 'react';

export function MissionNotebook({ completed }: { completed: number[] }) {
  const next = MISSIONS.findIndex((_, index) => !completed.includes(index));
  return <aside className="mission-notebook" aria-label="Dein Labor-Notizbuch">
    <div className="notebook-header"><Flag size={16} /><span>DEIN LABOR-NOTIZBUCH</span></div>
    <div className="notebook-heading"><h3>Kleine Missionen.<br />Große Aha-Momente.</h3><span className="notebook-doodle" aria-hidden="true">✳</span></div>
    <p>Vier Aufgaben. Du findest die Antworten direkt im Labor.</p>
    <div className="notebook-progress"><span>Dein Fortschritt</span><strong>{completed.length} / 4</strong></div>
    <div className="progress-track" role="progressbar" aria-label="Missionsfortschritt" aria-valuenow={completed.length} aria-valuemin={0} aria-valuemax={4}><span style={{ width: `${completed.length * 25}%` }} /></div>
    <ol className="notebook-missions">{MISSIONS.map((mission, index) => <li key={mission.title} className={`${completed.includes(index) ? 'done' : ''} ${next === index ? 'current' : ''}`}>
      <span className="mission-check">{completed.includes(index) ? <Check size={12} /> : String(index + 1).padStart(2, '0')}</span><div><strong>{mission.title}</strong>{next === index && <p>{mission.description}</p>}</div>
    </li>)}</ol>
    <div className="notebook-tip"><span>↳</span><p>{completed.length === 4 ? 'Alle Missionen geschafft. Dein Forschergeist kennt keine Grenzen!' : 'Deine Missionen werden automatisch abgehakt. Einfach loslegen!'}</p></div>
    <a href="#missionen">Alle Missionen ansehen <ArrowUpRight size={14} /></a>
  </aside>;
}

export default function Missions({ completed, celebrate }: { completed: number[]; celebrate: boolean }) {
  return <section id="missionen" className="section page-width missions-section">
    <div className="section-title-row"><SectionHeading number="03" eyebrow="DEINE CHALLENGE" title="Vier Missionen. Vier Aha-Momente." description="Experimentiere im Labor. Dein Fortschritt wird automatisch gespeichert." /><span className="mission-total"><Trophy size={18} />{completed.length} von 4 geschafft</span></div>
    <div className="mission-grid">{MISSIONS.map((mission, index) => <article key={mission.title} className={`mission-card ${completed.includes(index) ? 'completed' : ''}`}>
      <div className="mission-card-top"><span>MISSION {String(index + 1).padStart(2, '0')}</span><span className="mission-card-icon">{completed.includes(index) ? <Check size={18} /> : <Flag size={17} />}</span></div>
      <h3>{mission.title}</h3><p>{mission.description}</p><details><summary>Ein kleiner Hinweis</summary><p>{mission.hint}</p></details><span className="mission-status">{completed.includes(index) ? 'Geschafft!' : 'Bereit zum Entdecken'}</span>
    </article>)}</div>
    {completed.length === 4 && <div className="congratulations" role="status"><PartyPopper size={24} /><div><strong>Glückwunsch! Du hast das Fundament des Webs verstanden.</strong><p>Dein nächstes Experiment? Eine eigene Idee zum Leben bringen.</p></div><a href="#quiz">Weiter zum Quiz <ArrowUpRight size={16} /></a></div>}
    {celebrate && <div className="confetti" aria-hidden="true">{Array.from({ length: 38 }, (_, i) => <i key={i} style={{ '--x': `${(i * 37) % 100}vw`, '--r': `${i * 43}deg`, '--delay': `${(i % 7) * 80}ms`, '--color': ['#e44d26', '#2965f1', '#f7df1e', '#698c65'][i % 4] } as CSSProperties} />)}</div>}
  </section>;
}
