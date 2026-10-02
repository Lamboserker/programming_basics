import { Check, Code2, Paintbrush, Zap } from 'lucide-react';
import type { Layers, Technology } from '../types';
import { TECHNOLOGIES } from '../types';

export function TechIcon({ tech, size = 20 }: { tech: Technology; size?: number }) {
  const Icon = { html: Code2, css: Paintbrush, js: Zap }[tech];
  return <Icon size={size} aria-hidden="true" />;
}

export function TechSwitches({ layers, onToggle, compact = false, prefix = 'lab' }: {
  layers: Layers; onToggle: (tech: Technology) => void; compact?: boolean; prefix?: string;
}) {
  return <div className={`tech-switches ${compact ? 'compact' : ''}`}>
    {TECHNOLOGIES.map(tech => <button key={tech.id} type="button" role="switch"
      aria-checked={layers[tech.id]} aria-label={`${tech.name} ${prefix === 'house' ? 'im Haus' : 'im Labor'}`}
      title={tech.tip} onClick={() => onToggle(tech.id)}
      className={`tech-switch ${tech.id} ${layers[tech.id] ? 'is-on' : 'is-off'}`}>
      <span className="tech-switch-icon"><TechIcon tech={tech.id} /></span>
      <span className="switch-label"><strong>{tech.name === 'JavaScript' ? 'JS' : tech.name}</strong>{!compact && <small>{tech.role}</small>}</span>
      <span className="switch-state">{layers[tech.id] ? 'AN' : 'AUS'}</span>
      <span className="toggle-track"><span>{layers[tech.id] && <Check size={10} />}</span></span>
    </button>)}
  </div>;
}

export function SectionHeading({ number, eyebrow, title, description }: {
  number: string; eyebrow: string; title: string; description?: string;
}) {
  return <div className="section-heading">
    <div className="eyebrow"><span>{number}</span>{eyebrow}</div>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
}

export function CodeBlock({ code, label }: { code: string; label: string }) {
  return <div className="small-code"><span>{label}</span><pre><code>{code}</code></pre></div>;
}
