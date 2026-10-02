export type Technology = 'html' | 'css' | 'js';
export type Layers = Record<Technology, boolean>;
export type Sources = Record<Technology, string>;
export const ALL_ON: Layers = { html: true, css: true, js: true };
export const TECHNOLOGIES = [
  { id: 'html', name: 'HTML', role: 'Die Struktur', file: 'index.html', tip: 'HTML beschreibt die Inhalte und die Struktur einer Seite.' },
  { id: 'css', name: 'CSS', role: 'Das Aussehen', file: 'style.css', tip: 'CSS bestimmt Farben, Schriften, Abstände und das Layout.' },
  { id: 'js', name: 'JavaScript', role: 'Das Verhalten', file: 'script.js', tip: 'JavaScript reagiert auf Aktionen und verändert Inhalte dynamisch.' },
] as const;
