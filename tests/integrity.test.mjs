import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
const data=readFileSync('src/data.ts','utf8');
const app=readFileSync('src/main.tsx','utf8');
test('all four dossier repositories and public contacts are preserved',()=>{for(const value of ['CareFlow-CIC-IDS','AI-Event-Management-Platform','AI-EJUST-Timetable-Creator','Car-Agencies-Rental','mohamed.320230191@ejust.edu.eg','mohamed-elshaboury-87a093303'])assert.ok(data.includes(value));});
test('case studies retain important evaluation limitations',()=>{for(const value of ['intra-cohort','Cross-cohort','heuristic','held-out','simulated'])assert.ok(data.includes(value));});
test('public bundle contains no PDFs, credentials, source originals or source paths',()=>{const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${p}/${e.name}`):[`${p}/${e.name}`]);for(const file of walk('dist')){assert.ok(file.endsWith("/robots.txt") || !/\.(pdf|txt|env)$/i.test(file));if(/\.(js|html|css)$/.test(file)){const content=readFileSync(file,'utf8');assert.ok(!/source-material|CreatedByUserId|student.?id|D:\\\\My-Portfolio/i.test(content));}}});
test('required landmarks, skip link, modal and reduced motion support exist',()=>{for(const value of ['id="main"','className="skip"','<dialog','onCancel','aria-current','id="contact"'])assert.ok(app.includes(value));assert.ok(readFileSync('src/style.css','utf8').includes('prefers-reduced-motion'));});
