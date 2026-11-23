import { Window } from 'happy-dom';
import { test, beforeEach, afterEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { createElement, act } from 'react';
import { createRoot } from 'react-dom/client';
import { createServer } from 'vite';
const window = new Window({ url: 'http://localhost:8080', width: 1440, height: 900 });
for (const key of [
  'window',
  'document',
  'HTMLElement',
  'HTMLDialogElement',
  'IntersectionObserver',
  'localStorage',
])
  Object.defineProperty(globalThis, key, {
    value: key === 'window' ? window : window[key],
    configurable: true,
  });
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window);
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
window.HTMLCanvasElement.prototype.getContext = () => null;
const server = await createServer({
  server: { middlewareMode: true, watch: null },
  appType: 'custom',
  logLevel: 'error',
});
const { default: App } = await server.ssrLoadModule('/src/App.tsx');
let root;
beforeEach(async () => {
  window.localStorage.clear();
  window.happyDOM.setWindowSize({ width: 1440, height: 900 });
  window.document.body.innerHTML = '<div id="test-root"></div>';
  root = createRoot(window.document.getElementById('test-root'));
  await act(async () => root.render(createElement(App)));
});
afterEach(async () => {
  await act(async () => root.unmount());
});
after(async () => {
  await server.close();
  await window.happyDOM.close();
});
const query = (s) => {
  const e = window.document.querySelector(s);
  assert.ok(e, s);
  return e;
};
const click = async (s) => {
  await act(async () => query(s).click());
};
const button = (text, scope = window.document) => {
  const e = [...scope.querySelectorAll('button')].find((b) => b.textContent.trim() === text);
  assert.ok(e, text);
  return e;
};
const press = async (text) => {
  await act(async () => button(text).click());
};
test('project gallery filters all four real projects', async () => {
  await press('View All Projects');
  assert.equal(query('.gallery-dialog').open, true);
  assert.equal(window.document.querySelectorAll('.gallery-dialog .project-card').length, 4);
  await act(async () => button('Full-Stack', query('.project-filters')).click());
  assert.equal(window.document.querySelectorAll('.gallery-dialog .project-card').length, 2);
  await act(async () => button('Data Engineering', query('.project-filters')).click());
  assert.equal(window.document.querySelectorAll('.gallery-dialog .project-card').length, 1);
  assert.ok(query('.gallery-dialog .project-card').textContent.includes('CareFlow IDS'));
});
test('project detail opens, explains architecture, zooms and restores trigger focus', async () => {
  const trigger = query('[aria-label="View CareFlow IDS details"]');
  trigger.focus();
  await click('[aria-label="View CareFlow IDS details"]');
  assert.equal(query('.project-dialog').open, true);
  assert.equal(query('#case-title').textContent, 'CareFlow IDS');
  await act(async () =>
    window.document.querySelectorAll('.architecture-controls button')[1].click(),
  );
  assert.ok(query('#architecture-explanation').textContent.includes('10-minute watermark'));
  await click('.image-zoom');
  assert.equal(query('.image-zoom').getAttribute('aria-pressed'), 'true');
  await act(async () =>
    query('.media-viewer').dispatchEvent(new window.Event('cancel', { cancelable: true })),
  );
  assert.equal(query('.image-zoom').getAttribute('aria-pressed'), 'false');
  assert.equal(query('.project-dialog').open, true);
  await act(async () =>
    query('.project-dialog').dispatchEvent(new window.Event('cancel', { cancelable: true })),
  );
  assert.equal(window.document.querySelector('.project-dialog'), null);
  assert.ok(window.document.activeElement === trigger);
});
test('nested project detail returns to the filtered gallery', async () => {
  await press('View All Projects');
  const gallery = query('.gallery-dialog');
  const cover = gallery.querySelector('.project-cover');
  cover.focus();
  await act(async () => cover.click());
  assert.equal(query('.project-dialog').open, true);
  await click('[aria-label="Close case study"]');
  assert.equal(gallery.open, true);
  assert.ok(window.document.activeElement === cover);
  await click('[aria-label="Close project gallery"]');
  assert.equal(window.document.querySelector('.gallery-dialog'), null);
});
test('next project keeps all case studies discoverable', async () => {
  await click('[aria-label="View CareFlow IDS details"]');
  await press('Next Project');
  assert.equal(query('#case-title').textContent, 'Elshaboury Events');
});
test('training gallery includes CV-listed credentials without publishing originals', async () => {
  await press('View All Credentials');
  assert.equal(window.document.querySelectorAll('.gallery-dialog .training-card').length, 7);
  const cover = query(
    '.gallery-dialog [aria-label="View Business Skills Training — Level 01 training details"]',
  );
  await act(async () => cover.click());
  assert.equal(query('.training-dialog').open, true);
  assert.ok(query('.training-detail-content').textContent.includes('listed in the supplied CV'));
  await click('[aria-label="Close training details"]');
  assert.ok(query('.gallery-dialog').open);
});
test('theme and mobile menu controls work with keyboard cancellation', async () => {
  await click('[aria-label="Switch to light theme"]');
  assert.equal(window.document.documentElement.dataset.theme, 'light');
  await act(async () => window.happyDOM.setWindowSize({ width: 390, height: 844 }));
  await click('.menu-toggle');
  assert.equal(query('.menu-toggle').getAttribute('aria-expanded'), 'true');
  await act(async () =>
    query('.menu-toggle').dispatchEvent(
      new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    ),
  );
  assert.equal(query('.menu-toggle').getAttribute('aria-expanded'), 'false');
  assert.ok(window.document.activeElement === query('.menu-toggle'));
});
test('skill cards retain the full tool inventory and supporting context on expansion', async () => {
  const card = window.document.querySelectorAll('.skill-card')[1];
  const toggle = card.querySelector('.skill-more');
  const detail = window.document.getElementById(toggle.getAttribute('aria-controls'));
  const initialCount = card.querySelectorAll('.skill-pills > span').length;
  assert.equal(initialCount, 8);
  assert.equal(detail.hidden, true);
  await act(async () => toggle.click());
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(detail.hidden, false);
  assert.ok(detail.textContent.trim().length > 20);
  assert.equal(card.querySelectorAll('.skill-pills > span').length, 13);
  await act(async () => toggle.click());
  assert.equal(detail.hidden, true);
  assert.equal(card.querySelectorAll('.skill-pills > span').length, initialCount);
});
test('all gallery thumbnails are selectable and image navigation wraps', async () => {
  await click('[aria-label="View CareFlow IDS details"]');
  const thumbnails = window.document.querySelectorAll('.media-thumbnails button');
  assert.equal(thumbnails.length, 10);
  await act(async () => thumbnails[9].click());
  assert.equal(thumbnails[9].getAttribute('aria-pressed'), 'true');
  assert.ok(query('.media-main img').getAttribute('src').endsWith('/10.webp'));
  await click('[aria-label="Next image"]');
  assert.equal(thumbnails[0].getAttribute('aria-pressed'), 'true');
  assert.ok(query('.media-main img').getAttribute('src').endsWith('/01.webp'));
});
