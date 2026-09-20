import * as THREE from '../assets/vendor/three.module.js';
import { FontLoader } from '../assets/vendor/FontLoader.js';
import { TextGeometry } from '../assets/vendor/TextGeometry.js';
import fontData from './wordmark-font.js';

// The sculpture is real extruded type, rendered only when Home is mounted/resized.
let current=null;
export function syncHeroStage(){
 const element=document.querySelector('[data-wordmark]');
 if(current?.element===element)return;
 current?.dispose();current=null;
 if(!element)return;
 let renderer;
 try{
  renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setClearColor(0x000000,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const scene=new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff,0x99968a,2));
  const key=new THREE.DirectionalLight(0xfffdf2,4.4);key.position.set(-4,7,7);key.castShadow=true;
  key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-7;key.shadow.camera.right=7;
  key.shadow.camera.top=6;key.shadow.camera.bottom=-6;key.shadow.normalBias=.025;key.shadow.bias=-.0001;key.shadow.radius=4;scene.add(key);
  const rim=new THREE.DirectionalLight(0xbac9e0,2.5);rim.position.set(6,4,-2);scene.add(rim);
  const material=new THREE.MeshStandardMaterial({color:0x232424,roughness:.39,metalness:.05});
  const font=new FontLoader().parse(fontData);
  const group=new THREE.Group();group.rotation.y=-.12;scene.add(group);
  for(const [text,y,width] of [['GRELL',1.26,5.35],['//WERK',0,6]]){
   const geometry=new TextGeometry(text,{font,size:1.6,depth:.64,curveSegments:8,bevelEnabled:true,bevelThickness:.018,bevelSize:.014,bevelSegments:3});
   geometry.computeBoundingBox();
   const box=geometry.boundingBox;
   geometry.translate(-box.min.x,-box.min.y,0);
   geometry.scale(width/(box.max.x-box.min.x),1,1);
   const mesh=new THREE.Mesh(geometry,material);mesh.position.set(-width/2,y,0);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
  }
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(40,40),new THREE.ShadowMaterial({opacity:.15}));
  floor.rotation.x=-Math.PI/2;floor.position.y=-.035;floor.receiveShadow=true;scene.add(floor);
  const camera=new THREE.OrthographicCamera(-4,4,1.75,-1.75,.1,80);
  camera.position.set(5.1,4.2,12);camera.lookAt(0,1.12,0);
  function render(){const {width,height}=element.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height,false);const halfHeight=Math.max(1.75,3.7*height/width);camera.left=-halfHeight*width/height;camera.right=halfHeight*width/height;camera.top=halfHeight;camera.bottom=-halfHeight;camera.updateProjectionMatrix();renderer.render(scene,camera);}
  element.append(renderer.domElement);render();element.classList.add('is-rendered');
  const observer=new ResizeObserver(render);observer.observe(element);
  const fallback=()=>element.classList.remove('is-rendered');
  renderer.domElement.addEventListener('webglcontextlost',fallback);
  current={element,dispose(){observer.disconnect();renderer.dispose();scene.traverse(o=>{o.geometry?.dispose();});material.dispose();floor.material.dispose();renderer.domElement.remove();element.classList.remove('is-rendered');}};
 }catch{renderer?.dispose();element.classList.remove('is-rendered');}
}
