import type { Layers, Sources } from '../types';

// Markup, styles and scripts remain independent even when the user edits HTML.
export function cleanMarkup(markup: string): string {
  const document = new DOMParser().parseFromString(markup, 'text/html');
  document.querySelectorAll('script, style, link, meta, base, iframe, object, embed, foreignObject').forEach(node => node.remove());
  document.querySelectorAll('*').forEach(node => {
    for (const attribute of Array.from(node.attributes)) {
      if (/^on/i.test(attribute.name) || ['style', 'srcdoc', 'nonce', 'target', 'action', 'formaction'].includes(attribute.name.toLowerCase())
        || (['href', 'src', 'xlink:href'].includes(attribute.name.toLowerCase()) && /^\s*(javascript|vbscript):/i.test(attribute.value))) {
        node.removeAttribute(attribute.name);
      }
    }
    // Fragment URLs must stay in about:srcdoc; otherwise the browser resolves
    // them against the host page and would replace the shop with the app.
    const href = node.getAttribute('href');
    if (href?.startsWith('#')) node.setAttribute('href', `about:srcdoc${href}`);
  });
  return document.body.innerHTML;
}

export function buildDocument(sources: Sources, layers: Layers, token: string): string {
  if (!layers.html) return '<!doctype html><html lang="de"><head><title>HTML ist ausgeschaltet</title></head><body></body></html>';
  const policy = `default-src 'none'; img-src data:; style-src ${layers.css ? "'unsafe-inline'" : "'none'"}; script-src ${layers.js ? `'nonce-${token}'` : "'none'"}; connect-src 'none'; form-action 'none'; base-uri 'none'`;
  const styles = layers.css ? `<style>${sources.css.replace(/<\/style/gi, '<\\/style')}</style>` : '';
  // The error bridge is included only when JavaScript is enabled. No demo script
  // or instrumentation script is emitted in the disabled document.
  const script = layers.js ? `<script nonce="${token}">window.labToken = ${JSON.stringify(token)}; window.addEventListener('error', event => window.parent.postMessage({channel:'weblab',token:window.labToken,type:'error',message:event.message}, '*'));</script><script nonce="${token}">${sources.js.replace(/<\/script/gi, '<\\/script')}</script>` : '';
  return `<!doctype html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${policy}"><title>MiniShop – dein WebLab-Experiment</title>${styles}</head><body>${cleanMarkup(sources.html)}${script}</body></html>`;
}
