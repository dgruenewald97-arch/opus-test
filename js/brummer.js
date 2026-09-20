import * as THREE from '../assets/vendor/three.module.js';
import { RoundedBoxGeometry } from '../assets/vendor/RoundedBoxGeometry.js';
import { RoomEnvironment } from '../assets/vendor/RoomEnvironment.js';

// Persistent vinyl character. Body paint, gaze and wings have independent motion.
export function createBrummer(stage,availability=()=>{}) {
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.25:1.75));renderer.setSize(600,600,false);renderer.setClearColor(0x000000,0);
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;stage.append(renderer.domElement);
 const scene=new THREE.Scene();
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
 const env=pmrem.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=.45;room.dispose();pmrem.dispose();
 const camera=new THREE.OrthographicCamera(-3,3,3,-3,.1,50);camera.position.set(2.3,1.5,8);camera.lookAt(0,.3,0);
 scene.add(new THREE.HemisphereLight(0xffffff,0xa19669,.55));
 const key=new THREE.DirectionalLight(0xfff9e9,2.9);key.position.set(-4,6,5);scene.add(key);
 const rim=new THREE.DirectionalLight(0xdceaff,2);rim.position.set(4,3,-4);scene.add(rim);
 const yellow=new THREE.MeshPhysicalMaterial({color:0xf4d500,roughness:.33,metalness:0,clearcoat:.32,clearcoatRoughness:.22});
 const paint=yellow.clone();
 paint.onBeforeCompile=shader=>{
  shader.vertexShader='varying float vBodyY;\n'+shader.vertexShader;
  shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvBodyY = position.y;');
  shader.fragmentShader='varying float vBodyY;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\nfloat band = step(-0.41,vBodyY)*(1.0-step(-0.10,vBodyY)) + step(-0.98,vBodyY)*(1.0-step(-0.67,vBodyY));\ndiffuseColor.rgb = mix(diffuseColor.rgb,vec3(0.004,0.0045,0.005),band);');
 };
 const black=new THREE.MeshPhysicalMaterial({color:0x090a0c,roughness:.24,clearcoat:.55});
 const white=new THREE.MeshPhysicalMaterial({color:0xfffffb,roughness:.18,clearcoat:.7});
 const pink=new THREE.MeshPhysicalMaterial({color:0xff1e80,roughness:.25,clearcoat:.8});
 const blue=new THREE.MeshPhysicalMaterial({color:0x103dff,roughness:.19,metalness:.12,transparent:true,opacity:.84,side:THREE.DoubleSide,clearcoat:1,clearcoatRoughness:.1,depthWrite:false});
 const root=new THREE.Group();scene.add(root);
 const sphere=new THREE.SphereGeometry(1,40,28);
 function mesh(g,m,parent=root,x=0,y=0,z=0){const item=new THREE.Mesh(g,m);item.position.set(x,y,z);parent.add(item);return item;}
 function ball(m,x,y,z,sx,sy=sx,sz=sx,parent=root){const item=mesh(sphere,m,parent,x,y,z);item.scale.set(sx,sy,sz);return item;}
 function tube(points,r,mat=black){return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),28,r,10,false),mat);}
 mesh(new RoundedBoxGeometry(1.73,2.3,1.42,8,.64),paint,root,0,-.03,0);
 const wings=[];
 for(const side of [-1,1]){
  const pivot=new THREE.Group();pivot.position.set(side*.54,.49,-.55);root.add(pivot);
  const wing=ball(blue,side*.86,.51,0,1.24,.45,.065,pivot);wing.rotation.z=side*.49;
  const small=ball(blue,side*.63,.02,-.05,.8,.29,.05,pivot);small.rotation.z=-side*.06;
  wings.push({pivot,side});
  tube([[side*.39,1.03,.01],[side*.5,1.63,.03],[side*.76,1.91,.04],[side*.96,1.89,.07]],.045);
  ball(pink,side*.97,1.88,.07,.19);
  tube([[side*.76,-.1,.04],[side*.93,-.21,.14],[side*1.08,-.08,.25]],.055);
  ball(yellow,side*1.1,-.02,.28,.23,.25,.22);
  ball(black,side*.48,-1.19,.05,.21,.23,.25).rotation.z=side*.2;
 }
 const eyes=[];
 for(const side of [-1,1]){
  const eyeGroup=new THREE.Group();eyeGroup.position.set(side*.4,.45,.63);root.add(eyeGroup);
  ball(white,0,0,0,.44,.49,.33,eyeGroup);
  const pupilGroup=new THREE.Group();pupilGroup.position.set(.085,-.03,.29);eyeGroup.add(pupilGroup);
  ball(black,0,0,0,.19,.25,.095,pupilGroup);ball(white,-.048,.085,.082,.047,.047,.028,pupilGroup);
  eyes.push({eyeGroup,pupilGroup});
 }
 let lost=false,last=0;
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;stage.classList.remove('is-rendered');stage.dataset.renderer='fallback';availability(false);});
 renderer.domElement.addEventListener('webglcontextrestored',()=>{lost=false;stage.classList.add('is-rendered');stage.dataset.renderer='webgl';availability(true);});
 stage.classList.add('is-rendered');stage.dataset.renderer='webgl';
 return {
  draw(time,{gazeX=0,gazeY=0,velocity=0,flight=0,still=false,perched=false}={}){
   if(lost||(!still&&innerWidth<700&&time-last<32))return;last=time;
   const t=still?0:time*.001;
   root.position.y=Math.sin(t*1.8)*.055;
   root.rotation.set(.03+Math.sin(t*1.3)*.025,-.15+Math.sin(t*.7)*.09+gazeX*.06,-.25+Math.sin(t*1.5)*.045+THREE.MathUtils.clamp(velocity*.002,-.22,.22));
   for(const {pivot,side} of wings){pivot.rotation.x=perched?.32:.1+Math.sin(t*(38+flight*17))*.75;pivot.rotation.y=perched?side*.14:side*(.07+Math.sin(t*38)*.16);}
   for(const {eyeGroup,pupilGroup} of eyes){pupilGroup.position.x=.065+gazeX*.07;pupilGroup.position.y=-.025+gazeY*.07;eyeGroup.scale.y=!still&&Math.sin(t*.67)>.998?.15:1;}
   renderer.render(scene,camera);
  },
  dispose(){renderer.dispose();env.dispose();scene.traverse(o=>o.geometry?.dispose());[yellow,paint,black,white,pink,blue].forEach(m=>m.dispose());renderer.domElement.remove();}
 };
}
