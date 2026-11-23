import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const walk=async dir=>(await Promise.all((await fs.readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(`${dir}/${e.name}`):`${dir}/${e.name}`))).flat();
for(const file of await walk('dist')){const url='http://127.0.0.1:4173/'+file.slice(5);const result=await fetch(url);assert.equal(result.status,200,url);assert.equal((await result.arrayBuffer()).byteLength,(await fs.stat(file)).size,url);}
console.log('All 14 production files returned HTTP 200 with matching byte sizes.');
