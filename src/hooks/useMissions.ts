import { useCallback, useEffect, useRef, useState } from 'react';

export const MISSIONS = [
  { title: 'Der Design-Dieb', description: 'CSS aus, JavaScript an. Lege trotzdem ein Produkt in den Warenkorb.', hint: 'Schalte CSS im Labor aus und klicke bei einem Produkt auf +.' },
  { title: 'Eingefroren', description: 'Schalte JavaScript aus. Probiere dann den Produktfilter aus.', hint: 'Schalte JS aus und klicke im Shop auf „Technik“ oder „Wohnen“.' },
  { title: 'Zurück in die Steinzeit', description: 'Schalte CSS und JavaScript aus. Entdecke, was HTML allein kann.', hint: 'Lass nur HTML an. Öffne zum Beispiel „Was ist dieser Shop?“.' },
  { title: 'Website-Retter', description: 'Bringe nach einem Experiment alle drei Technologien zurück.', hint: 'Aktiviere HTML, CSS und JS wieder oder nutze „Alles zurücksetzen“.' },
];

function loadProgress(): number[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem('weblab-missions-v1') || '[]');
    return Array.isArray(value) ? [...new Set(value.filter((id): id is number => Number.isInteger(id) && id >= 0 && id < 4))] : [];
  } catch { return []; }
}

export function useMissions() {
  const [completed, setCompleted] = useState<number[]>(loadProgress);
  const [celebrate, setCelebrate] = useState(false);
  const previousCount = useRef(completed.length);
  const complete = useCallback((id: number) => {
    setCompleted(current => current.includes(id) ? current : [...current, id]);
  }, []);
  useEffect(() => {
    try { localStorage.setItem('weblab-missions-v1', JSON.stringify(completed)); } catch { /* Private browsing may restrict storage. */ }
    if (completed.length === 4 && previousCount.current < 4) setCelebrate(true);
    previousCount.current = completed.length;
  }, [completed]);
  useEffect(() => {
    if (!celebrate) return;
    const timer = window.setTimeout(() => setCelebrate(false), 3500);
    return () => window.clearTimeout(timer);
  }, [celebrate]);
  return { completed, complete, celebrate };
}
