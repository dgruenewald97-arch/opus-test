"""Start a loopback-only preview using Python's standard library."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
import webbrowser
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--headless', action='store_true')
parser.add_argument('--port', type=int, default=8877)
options = parser.parse_args()

class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, max-age=0')
        super().end_headers()

root = Path(__file__).resolve().parent.parent
server = None
for port in range(options.port, options.port + 21):
    try:
        server = ThreadingHTTPServer(('127.0.0.1', port), partial(PreviewHandler, directory=str(root)))
        break
    except OSError:
        continue
if server is None:
    raise SystemExit('Kein freier Vorschau-Port zwischen 8877 und 8897.')
url = f'http://127.0.0.1:{port}/index.html'
print(f'GRELLWERK laeuft unter {url}\nZum Beenden dieses Fenster schliessen oder Strg+C druecken.', flush=True)
if options.headless:
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
    raise SystemExit(0)
Thread(target=server.serve_forever, daemon=True).start()
webbrowser.open(url)
try:
    while True:
        input()
except (KeyboardInterrupt, EOFError):
    server.shutdown()
    server.server_close()
