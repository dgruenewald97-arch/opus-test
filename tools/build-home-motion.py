from pathlib import Path
import subprocess
from concurrent.futures import ThreadPoolExecutor

import argparse
parser=argparse.ArgumentParser(description='Build GRELLWERK Home film and actual GIF loops from credited source footage.')
parser.add_argument('--source-dir',required=True,help='Directory containing dance.mp4 and performer.mp4')
parser.add_argument('--ffmpeg',default='ffmpeg')
args=parser.parse_args()
ROOT = Path(__file__).resolve().parent.parent
WORK = Path(args.source_dir).resolve()
OUT = ROOT/'assets/motion'
FF = args.ffmpeg

def run(*args):
    subprocess.run([FF,'-hide_banner','-loglevel','error','-y',*map(str,args)],check=True)

# Genuine filmed body and light movement; no pan/zoom of still artwork.
# Neutral shadows and an acid highlight tint connect both shots to GRELLWERK.
grade = 'hue=s=0,eq=contrast=1.07:brightness=0.035,colorchannelmixer=rr=0.84:gg=1:bb=0.54'
def cut(name,start,duration,filters):
    run('-ss',start,'-i',WORK/f'{name}.mp4','-t',duration,'-vf',filters+','+grade+',setsar=1',
        '-an','-r','24','-c:v','libx264','-crf','19','-preset','fast','-pix_fmt','yuv420p',WORK/f'{name}-cut.mp4')

with ThreadPoolExecutor(2) as pool:
    list(pool.map(lambda x:cut(*x),[
        ('dance',0.3,5.5,'transpose=2,scale=1280:720'),
        ('performer',0,5.5,'scale=1280:720')]))
listing=WORK/'cut-list.txt'
listing.write_text("file 'dance-cut.mp4'\nfile 'performer-cut.mp4'\n")
run('-f','concat','-safe','0','-i',listing,'-c','copy','-movflags','+faststart',OUT/'home-film.mp4')
run('-i',OUT/'home-film.mp4','-vf','crop=ih*9/16:ih,scale=576:1024','-an','-c:v','libx264','-crf','21','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',OUT/'home-film-mobile.mp4')
for source,name in [('dance','pulse'),('performer','signal')]:
    vf='fps=14,scale=360:202:flags=lanczos,hqdn3d=2:1.5:2:2,split[s0][s1];[s0]palettegen=max_colors=64:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5'
    run('-i',WORK/f'{source}-cut.mp4','-filter_complex',vf,'-loop','0',OUT/f'{name}.gif')
    run('-ss','1','-i',WORK/f'{source}-cut.mp4','-frames:v','1','-c:v','libwebp','-quality','88',OUT/f'{name}-still.webp')
for name in ['home-film.mp4','home-film-mobile.mp4','pulse.gif','signal.gif','pulse-still.webp','signal-still.webp']:
    p=OUT/name
    print(name,p.stat().st_size,flush=True)
