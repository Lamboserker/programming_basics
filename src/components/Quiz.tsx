import { useRef, useState } from 'react';
import { ArrowRight, Check, CircleCheck, GraduationCap, RotateCcw, Sparkles } from 'lucide-react';
import { SectionHeading } from './Shared';

const QUESTIONS = [
  { question: 'Welche Technologie sorgt dafür, dass ein Button blau aussieht?', options: ['HTML', 'CSS', 'JavaScript'], answer: 1, explanation: 'CSS gestaltet Elemente. Mit „background: blue“ bekommt dein Button einen blauen Hintergrund.' },
  { question: 'Womit lässt sich der Inhalt einer Seite dynamisch verändern?', options: ['CSS', 'HTML allein', 'JavaScript'], answer: 2, explanation: 'JavaScript kann auf Aktionen reagieren und zum Beispiel einen Warenkorbzähler oder einen Text aktualisieren.' },
  { question: 'Was definiert die grundlegende Struktur einer Website?', options: ['HTML', 'CSS', 'JavaScript'], answer: 0, explanation: 'HTML beschreibt Inhalte und ihre Bedeutung: Überschriften, Absätze, Bilder, Listen und vieles mehr.' },
  { question: 'Funktionieren normale HTML-Links auch ohne JavaScript?', options: ['Ja, grundsätzlich schon', 'Nein, niemals', 'Nur mit CSS'], answer: 0, explanation: 'Ja! Links, Anker und details/summary sind native HTML-Funktionen. JavaScript ergänzt dynamische Interaktionen.' },
  { question: 'Kann eine Webseite ohne CSS Inhalte darstellen?', options: ['Nein, CSS erzeugt die Inhalte', 'Ja, im Standardstil des Browsers', 'Nur wenn JavaScript aktiv ist'], answer: 1, explanation: 'HTML-Inhalte bleiben sichtbar. Ohne CSS verwendet der Browser seine Standarddarstellung – ganz ohne JavaScript.' },
];

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const question = QUESTIONS[index];
  const selected = answers[index];
  const answered = selected !== undefined;
  const score = answers.filter((answer, i) => answer === QUESTIONS[i].answer).length;
  function focusHeading() { requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true })); }
  return <section id="quiz" className="section page-width quiz-section"><div className="quiz-intro"><SectionHeading number="05" eyebrow="DER KLEINE WISSENSCHECK" title="Was ist hängen geblieben?" description="Fünf Fragen. Kein Druck. Jeder Versuch macht dich ein Stück schlauer." /><div className="quiz-doodle" aria-hidden="true"><GraduationCap size={54} strokeWidth={1.3} /><span>Du hast das!</span><Sparkles size={22} /></div></div>
    <div className="quiz-card">{finished ? <div className="quiz-result"><span className="result-icon"><GraduationCap size={36} /></span><span className="eyebrow">EXPERIMENT ABGESCHLOSSEN</span><h3 ref={headingRef} tabIndex={-1}>{score === 5 ? 'Dein Web-Fundament steht!' : 'Du bist einen Schritt weiter.'}</h3><div className="quiz-score"><strong>{score}</strong><span>/ 5</span></div><p>{score === 5 ? 'Alle Antworten richtig. Du weißt, was Struktur, Gestaltung und Verhalten unterscheidet.' : 'Jede Erklärung ist ein neuer Aha-Moment. Probiere es nochmal – du kannst das!'}</p><button className="primary-button" onClick={() => { setIndex(0); setAnswers([]); setFinished(false); focusHeading(); }}><RotateCcw size={16} />Quiz wiederholen</button></div> : <>
      <div className="quiz-top"><span>FRAGE {String(index + 1).padStart(2, '0')} <span>/ 05</span></span><div className="quiz-steps" aria-label={`Frage ${index + 1} von 5`}>{QUESTIONS.map((_, i) => <span key={i} className={i <= index ? 'active' : ''} />)}</div><span>Wissen, nicht raten.</span></div>
      <h3 ref={headingRef} tabIndex={-1}>{question.question}</h3><div className="quiz-options" role="group" aria-label="Antwortmöglichkeiten">{question.options.map((option, i) => <button key={`${index}-${i}`} disabled={answered} className={`${answered && i === question.answer ? 'correct' : ''} ${answered && selected === i && i !== question.answer ? 'chosen' : ''}`} onClick={() => setAnswers(current => [...current, i])}><span className="option-letter">{answered && i === question.answer ? <Check size={15} /> : String.fromCharCode(65 + i)}</span><span>{option}</span>{answered && i === question.answer && <CircleCheck size={17} />}</button>)}</div>
      {answered ? <div className="quiz-feedback" role="status"><div><CircleCheck size={19} /><p><strong>{selected === question.answer ? 'Genau richtig!' : 'Ein guter Versuch. Hier ist der Aha-Moment:'}</strong><span>{question.explanation}</span></p></div><button className="quiz-next" onClick={() => { if (index === QUESTIONS.length - 1) setFinished(true); else setIndex(value => value + 1); focusHeading(); }}>{index === 4 ? 'Ergebnis ansehen' : 'Nächste Frage'}<ArrowRight size={16} /></button></div> : <p className="quiz-hint"><Sparkles size={13} />Wähle eine Antwort. Die Erklärung gibt’s direkt danach.</p>}
    </>}</div>
  </section>;
}
