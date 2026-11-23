import ts from 'typescript';
import fs from 'node:fs';
for(const file of ['src/main.tsx','src/data.ts','vite.config.ts']){
 const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 fs.writeFileSync(file,ts.createPrinter({newLine:ts.NewLineKind.LineFeed}).printFile(source));
}
const css=fs.readFileSync('src/style.css','utf8');
fs.writeFileSync('src/style.css',css.replaceAll('}', '}\n').replaceAll('{',' {\n  ').replaceAll(';',';\n  '));
