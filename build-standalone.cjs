// Self-contained Home preview. The complete multipage experience is served over HTTP.
const fs=require('fs'),path=require('path');
const root=__dirname;
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const mime=p=>p.endsWith('.gif')?'image/gif':p.endsWith('.mp4')?'video/mp4':p.endsWith('.svg')?'image/svg+xml':p.endsWith('.webp')?'image/webp':p.endsWith('.ttf')?'font/ttf':'application/javascript';
const data=p=>'data:'+mime(p)+';base64,'+fs.readFileSync(path.join(root,p)).toString('base64');
let html=read('index.html');
let css=['reset','tokens','base','components','sections','motion','art','agency','studio','direction','about','home','editorial','interiors'].map(n=>read('css/'+n+'.css')).join('\n');
css=css.replace(/url\(['"]?\.\.\/(assets\/[^)'"]+)['"]?\)/g,(_,p)=>'url("'+data(p)+'")');
html=html.replace(/<link rel="stylesheet"[^>]+>/g,'').replace('</head>','<style>'+css+'</style></head>');
html=html.replace(/<link rel="preload"[^>]+>/g,'');
html=html.replace(/(src|href|poster|data-motion-src|data-still)="(assets\/[^"]+)"/g,(_,attr,p)=>attr+'="'+data(p)+'"');
html=html.replace(/\s+srcset="([^"]*)"/g,(_,value)=>value==='assets/campaigns/kold-street-v4-mobile.webp'?' srcset="'+data(value)+'"':'');
// Each module is stored once; the import map links the original local ESM graph.
const modules=['js/studio.js','js/reel.js','js/projects.js'];
const imports={};
for(const name of modules){
 let code=read(name);
 code=code.replace(/(from\s*|import\s*\()(['"])(\.[^'"]+)\2/g,(_,prefix,q,spec)=>{
  const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(name),spec.split('?')[0]));
  if(!modules.includes(resolved))throw Error('Unbundled dependency: '+resolved);
  return prefix+q+'gw/'+resolved+q;
 });
 imports['gw/'+name]='data:application/javascript;base64,'+Buffer.from(code).toString('base64');
}
html=html.replace('<script type="module" src="js/main.js?v=14"></script>','<script type="importmap">'+JSON.stringify({imports})+'</script><script type="module">import {initStudio} from "gw/js/studio.js";initStudio(document.querySelector("main"));</script>');
html=html.replace('<body data-page="home">','<body data-page="home"><aside class="standalone-note">Einzeldatei-Vorschau der Startseite. Die vollständige Website startet mit START-PREVIEW.cmd.</aside>');
fs.writeFileSync(path.join(root,'grellwerk-standalone.html'),html);
console.log('Wrote grellwerk-standalone.html ('+(Buffer.byteLength(html)/1024/1024).toFixed(1)+' MB, local fonts / images / campaign stage included)');
