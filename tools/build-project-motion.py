"""Cut the three credited stock clips into local animated GIF studies."""
from pathlib import Path
import argparse, subprocess

parser=argparse.ArgumentParser()
parser.add_argument('--source-dir',required=True)
parser.add_argument('--ffmpeg',default='ffmpeg')
args=parser.parse_args()
source=Path(args.source_dir).resolve()
out=Path(__file__).resolve().parent.parent/'assets/motion'

for name,start,duration,grade in [
 ('coffee',2,4,'eq=contrast=1.08:saturation=0.55'),
 ('footwork',4,4,'hue=s=0,eq=contrast=1.06,colorchannelmixer=rr=0.9:gg=1:bb=0.75'),
 ('cream',0.8,4,'eq=contrast=1.05:saturation=0.65')]:
 def run(*more):
  subprocess.run([args.ffmpeg,'-hide_banner','-loglevel','error','-y',*map(str,more)],check=True)
 vf=f'{grade},fps=14,scale=480:270:flags=lanczos,hqdn3d=2:1.5:2:2,split[a][b];[a]palettegen=max_colors=64:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5'
 run('-ss',start,'-i',source/f'{name}.mp4','-t',duration,'-filter_complex',vf,'-loop','0',out/f'{name}.gif')
 run('-ss',start,'-i',source/f'{name}.mp4','-vf',grade+',scale=1280:720','-frames:v','1','-c:v','libwebp','-quality','85',out/f'{name}-still.webp')
 print(name,(out/f'{name}.gif').stat().st_size,flush=True)
