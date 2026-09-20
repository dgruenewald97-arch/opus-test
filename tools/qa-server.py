"""Local fault-injection preview; never part of the deployed website.

python tools/qa-server.py --port 8878 --scenario fallback
Scenarios: fallback (Canvas + WebGL + KOLD image failure), reduced, slow.
"""
import argparse
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from time import sleep
from urllib.parse import urlsplit

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=8878)
parser.add_argument('--scenario', choices=['fallback', 'reduced', 'slow'], required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
scripts = {
    'fallback': "const nativeContext=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...options){if(String(kind).startsWith('webgl')||kind==='2d')return null;return nativeContext.call(this,kind,...options);};",
    'reduced': "const nativeMedia=window.matchMedia.bind(window);window.matchMedia=function(query){const result=nativeMedia(query);if(query==='(prefers-reduced-motion: reduce)')Object.defineProperty(result,'matches',{value:true});return result;};",
    'slow': '',
}

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        route = urlsplit(self.path).path
        if args.scenario == 'fallback' and ('/assets/campaigns/kold-' in route or route.endswith(('.mp4', '.gif'))):
            self.send_error(404, 'Intentional QA image failure')
            return
        if route.endswith('.html') or route == '/':
            target = (root / (route.lstrip('/') or 'index.html')).resolve()
            if not target.is_relative_to(root) or not target.is_file():
                self.send_error(404)
                return
            if args.scenario == 'slow' and route.endswith('arbeiten.html'):
                sleep(1.8)
            html = target.read_text(encoding='utf-8-sig')
            html = html.replace('<head>', '<head><script>'+scripts[args.scenario]+'</script>', 1)
            data = html.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            try:
                self.wfile.write(data)
            except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
                pass
            return
        super().do_GET()

    def log_message(self, *_):
        pass

print(f'QA {args.scenario}: http://127.0.0.1:{args.port}', flush=True)
ThreadingHTTPServer(('127.0.0.1', args.port), partial(Handler, directory=str(root))).serve_forever()
