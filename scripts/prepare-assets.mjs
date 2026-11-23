import sharp from 'sharp';
import fs from 'node:fs/promises';
const sources={careflow:'careflow-IDS/CareFlow_dashboard_clean.png',events:'AI Event Management Platform/AI-Event-Management-Platform-1.png',timetable:'AI-EJUST-Timetable-Generator/AI-EJUST-Timetable-Generator-1.png',rental:'Car-Rental/Screenshot 2026-09-11 213150.png'};
for(const [name,file] of Object.entries(sources)){
 const source=`../source-material/projects/${file}`;
 let input=await fs.readFile(source);
 if(name==='rental'){
  const mask='<svg width="1918" height="560"><rect x="145" y="205" width="925" height="255" fill="#1c2333"/><text x="180" y="330" fill="#c4cbe0" font-family="Arial" font-size="24">Agency contact details hidden for privacy</text></svg>';
  input=await sharp(input).extract({left:0,top:82,width:1918,height:560}).composite([{input:Buffer.from(mask),top:0,left:0}]).png().toBuffer();
 }
 await sharp(input).resize({width:1200,withoutEnlargement:true}).webp({quality:86}).toFile(`public/images/${name}.webp`);
 await sharp(input).resize({width:1920,withoutEnlargement:true}).webp({quality:93}).toFile(`public/images/${name}-large.webp`);
}
await import('./prepare-project-gallery.mjs');
await import('./create-social-preview.mjs');
await fs.writeFile('qa/asset-inventory.json',JSON.stringify(sources,null,2));
