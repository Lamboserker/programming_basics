import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

const shop = (page: Page) => page.frameLocator('iframe[title="MiniShop – interaktive Vorschau"]');
const tech = (page: Page, name: string) => page.getByRole('switch', { name: `${name === 'JS' ? 'JavaScript' : name} im Labor`, exact: true });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(shop(page).getByRole('heading', { name: 'Dein Alltag. Ein bisschen schöner.' })).toBeVisible();
});

test('MiniShop: Warenkorb, kombinierte Suche und Filter, leere Ergebnisse und Reset', async ({ page }) => {
  const frame = shop(page);
  await frame.getByRole('button', { name: 'Tischlampe Lumi in den Warenkorb' }).click();
  await expect(frame.locator('#cartCount')).toHaveText('1');
  await frame.locator('.cart summary').click();
  await expect(frame.locator('#cartTotal')).toHaveText('39,00 €');
  await expect(frame.locator('#cartItems')).toContainText('Tischlampe Lumi');
  await frame.getByRole('button', { name: 'Warenkorb leeren' }).click();
  await expect(frame.locator('#cartCount')).toHaveText('0');
  await frame.locator('.cart summary').click();
  await frame.getByRole('button', { name: 'Technik', exact: true }).click();
  await expect(frame.locator('.product:visible')).toHaveCount(1);
  await frame.getByRole('searchbox').fill('Lampe');
  await expect(frame.locator('#noResults')).toBeVisible();
  await frame.getByRole('button', { name: 'Alle Produkte', exact: true }).click();
  await expect(frame.locator('.product:visible')).toHaveCount(1);
  await frame.getByRole('searchbox').fill('');
  await expect(frame.locator('.product:visible')).toHaveCount(4);
  await page.getByRole('button', { name: 'Alles zurücksetzen' }).click();
  await expect(shop(page).locator('#cartCount')).toHaveText('0');
});

test('Alle acht Schalterkombinationen: echte Style-/Script-Entfernung und leeres HTML', async ({ page }) => {
  for (const html of [true, false]) {
    for (const css of [true, false]) {
      for (const js of [true, false]) {
        for (const [name, active] of [['HTML', html], ['CSS', css], ['JS', js]] as const) {
          const control = tech(page, name);
          if ((await control.getAttribute('aria-checked')) !== String(active)) await control.click();
        }
        const frame = shop(page);
        await expect(frame.locator('body')).toBeAttached();
        await expect(frame.locator('style')).toHaveCount(html && css ? 1 : 0);
        await expect(frame.locator('script')).toHaveCount(html && js ? 2 : 0);
        await expect(frame.locator('[style], [onclick], link[rel="stylesheet"]')).toHaveCount(0);
        if (!html) await expect(frame.locator('body')).toBeEmpty();
        else {
          await expect(frame.locator('.product')).toHaveCount(4);
          await frame.getByRole('button', { name: 'Tischlampe Lumi in den Warenkorb' }).click();
          await expect(frame.locator('#cartCount')).toHaveText(js ? '1' : '0');
          if (!css) {
            const heading = frame.locator('h1');
            await expect(heading).toHaveCSS('font-family', '"Times New Roman"');
            await expect(frame.locator('.product-grid')).toHaveCSS('display', 'block');
          }
        }
        const sandbox = await page.locator('iframe[title="MiniShop – interaktive Vorschau"]').getAttribute('sandbox');
        expect(sandbox).not.toMatch(/allow-scripts.*allow-same-origin|allow-same-origin.*allow-scripts/);
        expect(sandbox).toBe(html && js ? 'allow-scripts' : 'allow-same-origin');
      }
    }
  }
});

test('Ohne JS: native HTML-Interaktionen bleiben, Filter und Warenkorb bleiben eingefroren', async ({ page }) => {
  await tech(page, 'JS').click();
  const frame = shop(page);
  await frame.getByRole('button', { name: 'Technik', exact: true }).click();
  await expect(frame.locator('.product:visible')).toHaveCount(4);
  await expect(frame.getByRole('button', { name: 'Technik', exact: true })).toHaveAttribute('aria-pressed', 'false');
  await frame.getByRole('searchbox').fill('Nichts');
  await expect(frame.locator('.product:visible')).toHaveCount(4);
  await frame.locator('.cart summary').click();
  await expect(frame.locator('.cart')).toHaveAttribute('open', '');
  await frame.locator('.cart summary').click();
  await frame.getByRole('link', { name: 'Über uns' }).click();
  await frame.getByText('Was ist dieser Shop?', { exact: true }).click();
  await expect(frame.locator('footer details')).toHaveAttribute('open', '');
  await expect(frame.locator('footer details')).toContainText('auch ohne JavaScript');
  await page.getByRole('button', { name: 'Ein Blick hinter die Kulissen' }).click();
  await page.getByRole('tab', { name: 'JavaScript AUS' }).click();
  await expect(page.locator('#code-panel')).toHaveClass(/layer-off/);
});

test('Missionen werden anhand echter Aktionen erkannt und nach Reload gespeichert', async ({ page }) => {
  await expect(page.locator('.header-progress')).toContainText('0/4');
  await tech(page, 'CSS').click();
  await expect(page.locator('.header-progress')).toContainText('0/4');
  await shop(page).getByRole('button', { name: 'Tischlampe Lumi in den Warenkorb' }).click();
  await expect(page.locator('.header-progress')).toContainText('1/4');
  await tech(page, 'JS').click();
  await expect(page.locator('.header-progress')).toContainText('2/4');
  await tech(page, 'CSS').click();
  await shop(page).getByRole('button', { name: 'Technik', exact: true }).click();
  await expect(page.locator('.header-progress')).toContainText('3/4');
  await tech(page, 'JS').click();
  await expect(page.locator('.header-progress')).toContainText('4/4');
  await expect(page.locator('.congratulations')).toContainText('Du hast das Fundament des Webs verstanden');
  await expect(page.locator('.confetti')).toBeAttached();
  await page.reload();
  await expect(page.locator('.header-progress')).toContainText('4/4');
  await expect(page.locator('.mission-card.completed')).toHaveCount(4);
});

test('Code-Inspector: bearbeitbare Quellen, Ebenen ausblenden, sichere HTML-Trennung', async ({ page }) => {
  await page.getByRole('button', { name: 'Ein Blick hinter die Kulissen' }).click();
  await page.getByRole('tab', { name: 'CSS', exact: true }).click();
  await page.getByRole('button', { name: 'Code bearbeiten', exact: true }).click();
  await page.getByRole('textbox', { name: 'CSS-Code bearbeiten' }).fill('body { background: rgb(231, 241, 250); } h1 { color: rgb(17, 34, 51); }');
  await page.getByRole('button', { name: 'Änderungen anwenden' }).click();
  await expect(shop(page).locator('h1')).toHaveCSS('color', 'rgb(17, 34, 51)');
  await tech(page, 'CSS').click();
  await expect(shop(page).locator('style')).toHaveCount(0);
  await page.getByRole('button', { name: 'Code-Ebene ausblenden' }).click();
  await expect(page.locator('.code-hidden')).toBeVisible();
  await page.getByRole('button', { name: 'Code-Ebene einblenden' }).click();
  await page.getByRole('tab', { name: 'HTML', exact: true }).click();
  await page.getByRole('textbox', { name: 'HTML-Code bearbeiten' }).fill('<h1 style="color:red" onclick="window.pwned=true">Mein eigener Shop</h1><style>body{background:red}</style><script>window.pwned=true</script><a href="javascript:alert(1)">Link</a>');
  await tech(page, 'JS').click();
  await page.getByRole('button', { name: 'Änderungen anwenden' }).click();
  await expect(shop(page).getByRole('heading', { name: 'Mein eigener Shop' })).toBeVisible();
  await expect(shop(page).locator('script, style, [style], [onclick], [href^="javascript:"]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Alles zurücksetzen' }).click();
  await expect(shop(page).locator('.product')).toHaveCount(4);
});

test('HTML-, CSS- und JS-Experimente sind unabhängig und reagieren sofort', async ({ page }) => {
  const builder = page.frameLocator('iframe[title="HTML-Experiment Vorschau"]');
  await page.getByRole('button', { name: 'Überschrift', exact: true }).click();
  await page.getByRole('button', { name: 'Absatz', exact: true }).click();
  await page.getByRole('button', { name: 'Bild', exact: true }).click();
  await expect(builder.locator('h2')).toHaveText('Hallo, Welt!');
  await expect(builder.locator('p')).toHaveText('Meine erste eigene Website.');
  await expect(builder.locator('img')).toBeVisible();
  await page.getByRole('button', { name: 'Letztes HTML-Element entfernen' }).click();
  await expect(builder.locator('img')).toHaveCount(0);
  await page.getByRole('button', { name: 'HTML-Experiment zurücksetzen' }).click();
  await expect(builder.locator('body')).toBeEmpty();
  const designer = page.frameLocator('iframe[title="CSS-Experiment Vorschau"]');
  await expect(designer.locator('style')).toHaveCount(0);
  await page.getByRole('slider', { name: 'Schriftgröße' }).focus();
  await page.getByRole('slider', { name: 'Schriftgröße' }).press('End');
  await expect(designer.locator('body')).toHaveCSS('font-size', '28px');
  await page.getByRole('button', { name: 'Zentriert', exact: true }).click();
  await expect(designer.locator('body')).toHaveCSS('text-align', 'center');
  await page.getByRole('button', { name: 'CSS-Experiment zurücksetzen' }).click();
  await expect(designer.locator('style')).toHaveCount(0);
  await page.getByRole('button', { name: 'Zähler erhöhen', exact: true }).click();
  await expect(page.locator('.counter-example strong')).toHaveText('01');
  await page.getByRole('button', { name: 'Lampe umschalten' }).click();
  await expect(page.locator('.lamp-output strong')).toHaveText('Licht an!');
  await page.getByRole('button', { name: 'Text verändern' }).click();
  await expect(page.locator('.text-example strong')).toHaveText('Du hast etwas verändert!');
  await page.getByRole('switch', { name: 'JavaScript im Mini-Experiment' }).click();
  await page.getByRole('button', { name: 'Zähler erhöhen', exact: true }).click({ force: true });
  await expect(page.locator('.counter-example strong')).toHaveText('01');
  await page.getByRole('switch', { name: 'JavaScript im Mini-Experiment' }).click();
  await page.getByRole('button', { name: 'Zähler erhöhen', exact: true }).click();
  await expect(page.locator('.counter-example strong')).toHaveText('02');
  await expect(tech(page, 'JS')).toHaveAttribute('aria-checked', 'true');
});

test('Haus-Analogie: Dekoration, Struktur und dynamische Funktionen separat', async ({ page }) => {
  await page.getByRole('button', { name: 'Licht einschalten', exact: true }).click();
  await expect(page.locator('.house-svg')).toHaveAccessibleName(/eingeschaltetem Licht/);
  await page.getByRole('switch', { name: 'JavaScript im Haus', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Licht ausschalten', exact: true })).toBeDisabled();
  await page.getByRole('switch', { name: 'CSS im Haus', exact: true }).click();
  await expect(page.locator('.house-svg')).toHaveClass(/undecorated/);
  await expect(page.locator('.house-scenery')).toHaveCount(0);
  await page.getByRole('switch', { name: 'HTML im Haus', exact: true }).click();
  await expect(page.locator('.house-building')).toHaveCount(0);
  await expect(page.locator('.house-state')).toContainText('Keine Struktur');
  await expect(tech(page, 'HTML')).toHaveAttribute('aria-checked', 'true');
});

test('Quiz: sofortiges Feedback bei jedem Versuch, Ergebnis und Wiederholung', async ({ page }) => {
  const options = [0, 2, 0, 0, 1]; // Deliberately learn from one incorrect answer.
  for (let i = 0; i < options.length; i++) {
    await page.locator('.quiz-options button').nth(options[i]).click();
    await expect(page.locator('.quiz-feedback')).toBeVisible();
    if (i === 0) await expect(page.locator('.quiz-feedback')).toContainText('Ein guter Versuch');
    await page.getByRole('button', { name: i === 4 ? 'Ergebnis ansehen' : 'Nächste Frage' }).click();
  }
  await expect(page.locator('.quiz-score')).toContainText('4');
  await page.getByRole('button', { name: 'Quiz wiederholen' }).click();
  await expect(page.locator('.quiz-top')).toContainText('FRAGE 01');
  await expect(page.locator('.quiz-feedback')).toHaveCount(0);
});

test('Responsive Oberfläche, Tastatur-Tabs und reduzierte Bewegung', async ({ page }, testInfo) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Ein Blick hinter die Kulissen' }).click();
  await page.getByRole('tab', { name: 'HTML', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'CSS', exact: true })).toBeFocused();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.locator('.hero-card').first().evaluate(element => getComputedStyle(element).transitionDuration)).toBe('0s');
  await page.getByRole('button', { name: 'Ein Blick hinter die Kulissen' }).click();
  await page.locator('#labor').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `test-results/weblab-labor-${testInfo.project.name}.png` });
  await page.locator('#top').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `test-results/weblab-${testInfo.project.name}.png`, fullPage: true });
});

test('JavaScript-Fehler bleiben im Labor sichtbar und lassen sich zurücksetzen', async ({ page }) => {
  await page.getByRole('button', { name: 'Ein Blick hinter die Kulissen' }).click();
  await page.getByRole('tab', { name: 'JavaScript', exact: true }).click();
  await page.getByRole('button', { name: 'Code bearbeiten', exact: true }).click();
  await page.getByRole('textbox', { name: 'JavaScript-Code bearbeiten' }).fill('throw new Error("Ein kleiner Testfehler");');
  await page.getByRole('button', { name: 'Änderungen anwenden' }).click();
  await expect(page.getByRole('alert')).toContainText('Ein kleiner Testfehler');
  await tech(page, 'JS').click();
  await expect(page.getByRole('alert')).toHaveCount(0);
  await page.getByRole('button', { name: 'Alles zurücksetzen' }).click();
  await shop(page).getByRole('button', { name: 'Tischlampe Lumi in den Warenkorb' }).click();
  await expect(shop(page).locator('#cartCount')).toHaveText('1');
});

test('Layout passt bei 320, 768 und 1024 Pixeln; mobiles Menü navigiert', async ({ page }) => {
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    const layout = await page.evaluate(() => ({ viewport: window.innerWidth, scroll: document.documentElement.scrollWidth, overflowing: Array.from(document.querySelectorAll('main *, header *')).filter(node => node.getBoundingClientRect().right > window.innerWidth + 1).map(node => ({ tag: node.tagName, class: node.className, right: node.getBoundingClientRect().right })).slice(0, 12) }));
    expect(layout.scroll <= layout.viewport, JSON.stringify(layout)).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Navigation öffnen' }).click();
  await page.getByRole('navigation', { name: 'Mobile Hauptnavigation' }).getByRole('link', { name: 'Quiz' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobile Hauptnavigation' })).toHaveCount(0);
  await expect(page).toHaveURL(/#quiz$/);
});
