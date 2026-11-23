import fs from 'node:fs/promises';
import sharp from 'sharp';

const collections = {
  careflow: {
    folder: 'careflow-IDS',
    labels: ['Network-flow overview', 'Traffic distribution by protocol', 'Protocol analysis and processing totals', 'Flow prediction inputs', 'Flow timing and TCP flags', 'Benign heuristic example', 'Attack heuristic example', 'Airflow DAG execution', 'Pipeline architecture illustration', 'Airflow pipeline list'],
  },
  events: {
    folder: 'AI Event Management Platform',
    labels: ['Platform home', 'Account navigation', 'Event discovery', 'Event creation workflow', 'Support center', 'Notifications', 'Event management overview', 'Attendance and booking states', 'Administration dashboard · simulated data', 'Sign-in experience'],
  },
  timetable: {
    folder: 'AI-EJUST-Timetable-Generator',
    labels: ['Timetable overview', 'First-year group schedule', 'Second-year group schedule', 'Computer Science section', 'Computer Networks section', 'AI and Data Science section', 'Bioinformatics section', 'Fourth-year section', 'Instructor search', 'Individual instructor schedule'],
  },
  rental: {
    folder: 'Car-Rental',
    order: [3, 4, 6, 7, 5, 1, 2],
    labels: ['Sign-in experience', 'Account creation', 'Operations dashboard · seed data', 'Fleet management · identifiers hidden', 'Customer management · details hidden', 'Rental lifecycle · seed data', 'Agency management · contact details hidden'],
  },
};
const gallery = {};
const review = [];
function mask(x, y, width, height, fill, label = '') {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="4" fill="${fill}"/>${label ? `<text x="${x + 14}" y="${y + height / 2 + 5}" font-family="Arial" font-size="18" fill="${fill === '#e7edf4' ? '#475569' : '#b8c6dc'}">${label}</text>` : ''}`;
}
for (const [slug, config] of Object.entries(collections)) {
  const directory = `../source-material/projects/${config.folder}`;
  const files = (await fs.readdir(directory)).filter(file => /\.png$/i.test(file)).sort((a,b) => a.localeCompare(b, undefined, {numeric: true}));
  if (files.length !== config.labels.length) throw new Error(`${slug}: review inventory changed`);
  gallery[slug] = [];
  await fs.mkdir(`public/images/projects/${slug}`, {recursive:true});
  for (const number of config.order || files.map((_,index) => index + 1)) {
    const file = files[number - 1];
    let input = await fs.readFile(`${directory}/${file}`);
    const original = await sharp(input).metadata();
    const overlays = [];
    if (slug === 'events' && number === 2) overlays.push(mask(1490, 140, 200, 62, '#12383f', 'Account hidden'));
    if (slug === 'events' && number === 5) {
      overlays.push(mask(385, 350, 335, 135, '#173438', 'Contact details hidden'));
      overlays.push(mask(780, 350, 325, 88, '#203a39', 'Location details hidden'));
      overlays.push(mask(475, 524, 115, 30, '#173438'));
    }
    if (slug === 'events' && number === 10) {
      overlays.push(mask(713, 313, 449, 57, '#e7edf4', 'Account hidden'));
      overlays.push(mask(713, 432, 449, 57, '#e7edf4', 'Password hidden'));
    }
    if (slug === 'rental' && number === 4) overlays.push(mask(500, 341, 143, 378, '#0a2039', 'Hidden'));
    if (slug === 'rental' && number === 5) overlays.push(mask(136, 345, 1088, 231, '#092139', 'Customer details hidden'));
    if (slug === 'rental' && number === 7) overlays.push(mask(150, 287, 925, 254, '#1c2333', 'Agency contact details hidden'));
    if (slug === 'careflow' && [8,10].includes(number)) overlays.push(mask(original.width - 100, 0, 100, 70, '#ffffff'));
    if (overlays.length) input = await sharp(input).composite([{input:Buffer.from(`<svg width="${original.width}" height="${original.height}">${overlays.join('')}</svg>`),left:0,top:0}]).png().toBuffer();
    if (slug === 'rental' && number >= 3) input = await sharp(input).extract({left:0,top:82,width:original.width,height:original.height - 82}).png().toBuffer();
    const id = String(number).padStart(2,'0');
    const src = `/images/projects/${slug}/${id}.webp`;
    const thumbnail = `/images/projects/${slug}/${id}-thumb.webp`;
    const output = await sharp(input).resize({width:1920,withoutEnlargement:true}).webp({quality:90}).toFile(`public${src}`);
    await sharp(input).resize({width:320,withoutEnlargement:true}).webp({quality:78}).toFile(`public${thumbnail}`);
    gallery[slug].push({src,thumbnail,title:config.labels[number - 1],alt:`${slug === 'rental' ? 'CarAgencies' : slug === 'careflow' ? 'CareFlow IDS' : slug === 'events' ? 'Elshaboury Events' : 'CSIT Timetable Engine'} — ${config.labels[number - 1]}`,width:output.width,height:output.height});
    review.push({slug,number,file,redacted:overlays.length > 0 || (slug === 'rental' && number >= 3),src});
  }
}
await fs.writeFile('src/projectMedia.ts',`// Reviewed public derivatives. Original source documents are not required at runtime.\nexport interface ProjectMedia { src: string; thumbnail: string; title: string; alt: string; width: number; height: number; }\nexport const projectMedia: Record<string, ProjectMedia[]> = ${JSON.stringify(gallery,null,2)};\n`);
await fs.writeFile('qa/project-media-review.json',JSON.stringify(review,null,2));
console.log(`Prepared ${review.length} reviewed project images and thumbnails.`);
