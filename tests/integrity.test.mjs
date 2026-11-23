import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
const server = await createServer({
  server: { middlewareMode: true, watch: null },
  appType: 'custom',
  logLevel: 'error',
});
after(() => server.close());
const { default: App } = await server.ssrLoadModule('/src/App.tsx');
const { ProjectDetail } = await server.ssrLoadModule('/src/components/ProjectDetail.tsx');
const { TrainingDetail } = await server.ssrLoadModule('/src/components/Training.tsx');
const { projects, contact } = await server.ssrLoadModule('/src/data.ts');
const { training, fullName } = await server.ssrLoadModule('/src/content.ts');
const { projectMedia } = await server.ssrLoadModule('/src/projectMedia.ts');
const markup = renderToStaticMarkup(createElement(App));
test('one h1 and all required reference-mapped sections render', () => {
  assert.equal((markup.match(/<h1[ >]/g) || []).length, 1);
  for (const id of [
    'main',
    'home',
    'about',
    'education',
    'skills',
    'projects',
    'experience',
    'certifications',
    'achievements',
    'contact',
  ])
    assert.ok(markup.includes(`id="${id}"`), id);
  assert.ok(markup.includes(fullName));
  assert.ok(markup.includes('Skip to content'));
  assert.ok(markup.includes('aria-current="location"'));
});
test('all four projects, real media and exact owner contact channels are preserved', () => {
  assert.equal(projects.length, 4);
  assert.equal(contact.email, 'mohamed.320230191@ejust.edu.eg');
  assert.equal(contact.github, 'https://github.com/Mohamed-Abdelaty');
  assert.equal(contact.linkedin, 'https://www.linkedin.com/in/mohamed-elshaboury-87a093303/');
  for (const value of [contact.github, contact.linkedin, `mailto:${contact.email}`])
    assert.ok(markup.includes(value));
  for (const project of projects) {
    assert.ok(markup.includes(project.title));
    assert.ok(existsSync(`public/images/${project.image}.webp`));
    assert.ok(existsSync(`public/images/${project.image}-large.webp`));
  }
  assert.ok(!markup.includes('href="#"'));
});
test('detailed case studies retain evidence, roles, architecture and source links', () => {
  for (const project of projects) {
    const detail = renderToStaticMarkup(createElement(ProjectDetail, { project, onClose() {} }));
    for (const text of [
      '<dialog',
      'aria-labelledby="case-title"',
      'My role',
      'Enlarge image',
      'Architecture',
      project.repo,
    ])
      assert.ok(detail.includes(text), text);
  }
  const evidence = projects.map((p) => `${p.result} ${p.note || ''}`).join(' ');
  for (const phrase of ['intra-cohort', 'Cross-cohort', 'heuristic', 'held-out', 'simulated'])
    assert.ok(evidence.includes(phrase));
  const detail = renderToStaticMarkup(
    createElement(TrainingDetail, { item: training[0], onClose() {} }),
  );
  assert.ok(detail.includes('97% training score'));
  assert.ok(markup.includes('not employment at E-JUST'));
  assert.equal(training.length, 7);
});
test('the public build excludes originals, private paths and reference identity', () => {
  const walk = (p) =>
    readdirSync(p, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(`${p}/${e.name}`) : [`${p}/${e.name}`],
    );
  const allowedText = new Set([
    'dist/robots.txt',
    'dist/licenses/Inter-OFL.txt',
    'dist/licenses/Outfit-OFL.txt',
  ]);
  for (const file of walk('dist')) {
    assert.ok(allowedText.has(file) || !/\.(pdf|txt|env)$/i.test(file), file);
    if (/\.(js|css|html)$/.test(file))
      assert.ok(
        !/source-material|CreatedByUserId|student.?id|Mariam Gamal|maryamgamal188|mariammgamall|D:\\\\My-Portfolio/i.test(
          readFileSync(file, 'utf8'),
        ),
        file,
      );
  }
  assert.ok(!markup.includes('download='));
});
test('standard anchors and reduced-motion support remain available', () => {
  const css = readFileSync('src/style.css', 'utf8');
  assert.ok(css.includes('prefers-reduced-motion'));
  for (const anchor of [
    '#home',
    '#about',
    '#education',
    '#skills',
    '#projects',
    '#experience',
    '#certifications',
    '#contact',
  ])
    assert.ok(markup.includes(`href="${anchor}"`));
  assert.ok(markup.includes('Switch to light theme'));
});
test('all 37 reviewed gallery images and their thumbnails are packaged', () => {
  assert.deepEqual(
    Object.fromEntries(Object.entries(projectMedia).map(([slug, media]) => [slug, media.length])),
    { careflow: 10, events: 10, timetable: 10, rental: 7 },
  );
  for (const media of Object.values(projectMedia).flat()) {
    assert.ok(existsSync(`public${media.src}`), media.src);
    assert.ok(existsSync(`dist${media.src}`), media.src);
    assert.ok(existsSync(`dist${media.thumbnail}`), media.thumbnail);
    assert.ok(media.width > 0 && media.height > 0 && media.alt.length > 10);
  }
});
