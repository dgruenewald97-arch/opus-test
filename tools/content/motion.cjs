const motion={kold:'coffee',neon:'footwork',hafer:'cream'};
function loop(name,{className='',alt=''}={}){
 return `<img class="${className}" src="assets/motion/${name}-still.webp" data-motion-loop data-motion-src="assets/motion/${name}.gif" data-still="assets/motion/${name}-still.webp" width="640" height="360" alt="${alt}" loading="lazy" decoding="async">`;
}
module.exports={loop,motion};
