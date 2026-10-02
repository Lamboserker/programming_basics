import { headphonesImage, lampImage, mugImage, plantImage } from './assets';
import type { Sources } from '../types';

export const SHOP_HTML = `<header class="shop-header">
  <a class="shop-logo" href="#start">mini<span>shop</span><span class="logo-dot">.</span></a>
  <nav aria-label="Shop-Navigation"><a href="#products">Entdecken</a><a href="#about">Über uns</a></nav>
  <details class="cart">
    <summary>Warenkorb <span id="cartCount">0</span></summary>
    <div class="cart-panel"><strong>Dein Warenkorb</strong><ul id="cartItems"><li>Noch ganz leer. Finde dein Lieblingsstück!</li></ul><p>Gesamt: <strong id="cartTotal">0,00 €</strong></p><button id="clearCart" type="button">Warenkorb leeren</button></div>
  </details>
</header>
<main id="start">
  <section class="shop-hero">
    <div><span class="shop-eyebrow">KLEINE FUNDSTÜCKE, GROSSE FREUDE</span>
    <h1>Dein Alltag.<br>Ein bisschen schöner.</h1>
    <p>Lieblingsstücke für dich und dein Zuhause.</p>
    <a class="shop-cta" href="#products">Jetzt entdecken <span aria-hidden="true">↗</span></a></div>
    <img src="${lampImage}" alt="Illustration einer terrakottafarbenen Tischlampe" width="280" height="210">
    <span class="hero-sticker">Gute Dinge.<br>Gute Laune.</span>
  </section>
  <section id="products" class="products-section" aria-label="Unsere Produkte">
    <div class="products-top"><h2>Deine neuen Lieblinge <span>04</span></h2>
      <label class="search"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="Lieblingsstück suchen …" aria-label="Produkte suchen"></label>
    </div>
    <div class="filters" role="group" aria-label="Produktfilter">
      <button type="button" data-filter="all" aria-pressed="true">Alle Produkte</button>
      <button type="button" data-filter="wohnen" aria-pressed="false">Wohnen</button>
      <button type="button" data-filter="technik" aria-pressed="false">Technik</button>
      <span id="resultCount">4 Fundstücke</span>
    </div>
    <div class="product-grid">
      <article class="product" data-category="wohnen" data-name="Tischlampe Lumi" data-price="39">
        <div class="product-image peach"><span class="product-tag">Lieblingsstück</span><img src="${lampImage}" alt="Tischlampe Lumi in Terrakotta" width="280" height="210"></div>
        <div class="product-info"><div><h3>Tischlampe Lumi</h3><p>Ein warmes Licht für gute Abende.</p><strong>39,00 €</strong></div><button type="button" class="add" aria-label="Tischlampe Lumi in den Warenkorb" title="In den Warenkorb">+</button></div>
      </article>
      <article class="product" data-category="technik" data-name="Kopfhörer Flow" data-price="79">
        <div class="product-image sage"><img src="${headphonesImage}" alt="Kabellose Kopfhörer Flow in Salbeigrün" width="280" height="210"></div>
        <div class="product-info"><div><h3>Kopfhörer Flow</h3><p>Deine Musik. Dein kleiner Rückzugsort.</p><strong>79,00 €</strong></div><button type="button" class="add" aria-label="Kopfhörer Flow in den Warenkorb" title="In den Warenkorb">+</button></div>
      </article>
      <article class="product" data-category="wohnen" data-name="Grünling Pflanze" data-price="24">
        <div class="product-image sand"><span class="product-tag">Mehr Grün, bitte</span><img src="${plantImage}" alt="Grünling Zimmerpflanze im sandfarbenen Topf" width="280" height="210"></div>
        <div class="product-info"><div><h3>Grünling</h3><p>Ein unkomplizierter Mitbewohner.</p><strong>24,00 €</strong></div><button type="button" class="add" aria-label="Grünling in den Warenkorb" title="In den Warenkorb">+</button></div>
      </article>
      <article class="product" data-category="wohnen" data-name="Tasse Pause" data-price="16">
        <div class="product-image lilac"><img src="${mugImage}" alt="Keramiktasse Pause in Flieder" width="280" height="210"></div>
        <div class="product-info"><div><h3>Tasse Pause</h3><p>Für den besten Moment des Tages.</p><strong>16,00 €</strong></div><button type="button" class="add" aria-label="Tasse Pause in den Warenkorb" title="In den Warenkorb">+</button></div>
      </article>
    </div>
    <p id="noResults" hidden>Kein Fundstück gefunden. Probiere einen anderen Suchbegriff.</p>
    <p id="status" role="status" aria-live="polite"></p>
  </section>
</main>
<footer id="about"><span class="shop-logo">minishop.</span><p>Schöne Dinge. Bewusst ausgesucht.</p><details><summary>Was ist dieser Shop?</summary><p>Ein kleiner Demo-Shop im WebLab. Hier kannst du experimentieren – ohne etwas zu kaufen. Dieses aufklappbare Element funktioniert mit HTML, auch ohne JavaScript!</p></details><a href="#start">Zurück nach oben ↑</a></footer>`;

export const SHOP_CSS = `/* CSS gibt unseren HTML-Elementen ihr Aussehen. */
body {
  margin: 0;
  color: #283c32;
  background: #fffefa;
  font-family: Arial, sans-serif;
  font-size: 13px;
}
h1 {
  font-size: clamp(27px, 4vw, 40px);
  letter-spacing: -1.5px;
  line-height: 1.12;
}
button {
  cursor: pointer;
  font: inherit;
  border-radius: 8px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
a { color: inherit; text-decoration: none; }
button:focus-visible, a:focus-visible, input:focus-visible, summary:focus-visible { outline: 3px solid #2965f1; outline-offset: 3px; }
.shop-header { display: flex; align-items: center; justify-content: space-between; padding: 22px 30px; border-bottom: 1px solid #e7e8dd; gap: 15px; }
.shop-logo { font-size: 24px; font-weight: 800; letter-spacing: -1.3px; }
.shop-logo > span:first-child { font-weight: 400; }
.logo-dot { color: #df7853; }
.shop-header nav { display: flex; gap: 24px; font-size: 12px; }
.shop-header nav a:hover { text-decoration: underline; }
.cart { position: relative; }
.cart summary { cursor: pointer; list-style: none; font-size: 12px; }
.cart summary::-webkit-details-marker { display: none; }
#cartCount { background: #314f3e; color: white; padding: 4px 7px; margin-left: 6px; border-radius: 50%; }
.cart-panel { position: absolute; right: 0; top: 30px; width: min(280px, 76vw); padding: 20px; background: white; border: 1px solid #ddd; border-radius: 12px; box-shadow: 0 10px 30px #24382a1a; z-index: 4; }
.cart-panel ul { padding-left: 18px; line-height: 1.8; }
.cart-panel button { background: #eef1e9; border: 0; padding: 8px 12px; }
.shop-hero { position: relative; display: flex; align-items: center; justify-content: space-between; overflow: hidden; margin: 23px 30px; padding: 25px 30px; border-radius: 10px; background: #eceee2; min-height: 212px; }
.shop-eyebrow { font-size: 8px; letter-spacing: 1.4px; font-weight: 700; }
.shop-hero h1 { margin: 13px 0 10px; }
.shop-hero p { margin: 0 0 22px; font-size: 11px; color: #63705d; }
.shop-cta { display: inline-flex; align-items: center; gap: 28px; background: #304c3c; color: white; padding: 12px 16px; font-size: 11px; border-radius: 5px; }
.shop-cta:hover { background: #1d3427; }
.shop-hero > img { width: 210px; height: auto; transform: rotate(-8deg); margin-right: 7px; }
.hero-sticker { position: absolute; right: 20px; top: 20px; display: grid; align-content: center; text-align: center; width: 65px; height: 65px; border-radius: 50%; background: #efc08d; color: #60422c; font-size: 10px; font-weight: 700; transform: rotate(12deg); }
.products-section { padding: 3px 30px 22px; }
.products-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.products-top h2 { font-size: 17px; letter-spacing: -.4px; }
.products-top h2 span { margin-left: 5px; font-size: 10px; color: #899184; vertical-align: middle; }
.search { display: flex; align-items: center; gap: 6px; background: white; border: 1px solid #dedfd6; padding: 8px 10px; border-radius: 6px; }
.search > span { font-size: 19px; line-height: 12px; }
.search input { width: 155px; border: 0; outline-offset: 3px; font-size: 10px; background: transparent; }
.filters { display: flex; align-items: center; gap: 6px; margin: 5px 0 18px; }
.filters button { font-size: 10px; background: transparent; border: 1px solid #e1e3d9; padding: 6px 11px; border-radius: 20px; color: #5b675a; }
.filters button[aria-pressed="true"] { background: #304c3c; border-color: #304c3c; color: white; }
.filters button:hover { border-color: #304c3c; }
#resultCount { margin-left: auto; font-size: 10px; color: #7a8175; }
.product-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.product-image { position: relative; border-radius: 8px; overflow: hidden; }
.product-image img { display: block; width: 100%; height: auto; transition: transform .25s; }
.product:hover .product-image img { transform: scale(1.05); }
.peach { background: #f3e5da; }.sage { background: #e7ede5; }.sand { background: #f1eddf; }.lilac { background: #eee8f2; }
.product-tag { position: absolute; z-index: 1; top: 9px; left: 9px; background: #fffefad9; padding: 4px 6px; border-radius: 3px; font-size: 7px; }
.product-info { display: flex; align-items: flex-end; justify-content: space-between; gap: 5px; padding: 12px 0 0; }
.product-info h3 { font-size: 12px; margin: 0 0 5px; }
.product-info p { font-size: 9px; color: #7d8176; margin: 0 0 10px; line-height: 1.5; }
.product-info strong { font-size: 11px; }
.add { flex: 0 0 26px; height: 26px; font-size: 19px; line-height: 1; border: 1px solid #dde0d3; background: white; color: #304c3c; border-radius: 50%; }
.add:hover { color: white; background: #304c3c; }
[hidden] { display: none !important; }
#status { font-size: 11px; background: #e8f1df; border-radius: 5px; padding: 10px 12px; }
#status:empty { display: none; }
footer { margin: 0 30px; padding: 20px 0; border-top: 1px solid #e7e8dd; display: flex; align-items: center; gap: 15px; font-size: 9px; color: #7a8175; flex-wrap: wrap; }
footer .shop-logo { font-size: 17px; color: #304c3c; }
footer details { max-width: 240px; }footer summary { cursor: pointer; }footer > a { margin-left: auto; }
@media (max-width: 650px) {
  .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .shop-header, .products-section { padding-left: 20px; padding-right: 20px; }
  .shop-hero { margin-left: 20px; margin-right: 20px; padding: 24px; }
  .shop-hero > img { width: 150px; margin-right: -30px; }
  .hero-sticker { width: 52px; height: 52px; font-size: 8px; right: 12px; top: 10px; }
}
@media (max-width: 420px) {
  .shop-header { padding: 18px 15px; }.shop-header nav { gap: 12px; font-size: 10px; }.cart summary { font-size: 10px; }
  .shop-hero { margin: 16px 15px; padding: 20px; }.shop-hero > img { position: absolute; right: -42px; bottom: -10px; width: 155px; opacity: .35; }.shop-hero > div { position: relative; z-index: 1; }.hero-sticker { display: none; }
  .products-top { align-items: flex-start; flex-direction: column; }.search { width: 100%; }.search input { width: 100%; }
  .products-section { padding: 3px 15px 22px; }.filters { margin-top: 12px; }#resultCount { font-size: 8px; }.filters button { padding: 6px 9px; }
  footer { margin: 0 15px; }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; }* { transition: none !important; } }`;

export const SHOP_JS = `// JavaScript reagiert auf Klicks und verändert den Warenkorb.
const cartCount = document.querySelector('#cartCount');
const status = document.querySelector('#status');
let cart = [];

function addToCart(product) {
  cart.push({ name: product.dataset.name, price: Number(product.dataset.price) });
  cartCount.textContent = String(cart.length);
  status.textContent = product.dataset.name + ' ist jetzt in deinem Warenkorb!';
  renderCart();
  window.parent.postMessage({ channel: 'weblab', token: window.labToken, type: 'cart-add' }, '*');
}

document.querySelectorAll('.add').forEach(button => {
  button.addEventListener('click', () => {
    addToCart(button.closest('.product'));
  });
});

const currency = value => value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
function renderCart() {
  const list = document.querySelector('#cartItems');
  list.replaceChildren();
  if (cart.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Noch ganz leer. Finde dein Lieblingsstück!';
    list.append(empty);
  }
  cart.forEach(item => {
    const entry = document.createElement('li');
    entry.textContent = item.name + ' · ' + currency(item.price);
    list.append(entry);
  });
  document.querySelector('#cartTotal').textContent = currency(cart.reduce((sum, item) => sum + item.price, 0));
}
document.querySelector('#clearCart').addEventListener('click', () => {
  cart = [];
  cartCount.textContent = '0';
  status.textContent = 'Dein Warenkorb ist wieder leer.';
  renderCart();
});

// Suche und Filter kombinieren ihre Ergebnisse.
let category = 'all';
function filterProducts() {
  const query = document.querySelector('#search').value.trim().toLocaleLowerCase('de');
  let results = 0;
  document.querySelectorAll('.product').forEach(product => {
    const matches = (category === 'all' || product.dataset.category === category)
      && product.dataset.name.toLocaleLowerCase('de').includes(query);
    product.hidden = !matches;
    if (matches) results++;
  });
  document.querySelector('#resultCount').textContent = results + (results === 1 ? ' Fundstück' : ' Fundstücke');
  document.querySelector('#noResults').hidden = results !== 0;
}
document.querySelector('#search').addEventListener('input', filterProducts);
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    filterProducts();
  });
});`;

export const DEFAULT_SOURCES: Sources = { html: SHOP_HTML, css: SHOP_CSS, js: SHOP_JS };

export const SNIPPETS: Sources = {
  html: `<h1>Dein Alltag.<br>Ein bisschen schöner.</h1>\n<p>Lieblingsstücke für dich und dein Zuhause.</p>\n\n<button type="button" class="add"\n  aria-label="Tischlampe Lumi in den Warenkorb">\n  +\n</button>`,
  css: SHOP_CSS.slice(SHOP_CSS.indexOf('h1 {'), SHOP_CSS.indexOf('* {')).trim(),
  js: SHOP_JS.slice(SHOP_JS.indexOf('function addToCart'), SHOP_JS.indexOf('document.querySelectorAll')).trim(),
};
