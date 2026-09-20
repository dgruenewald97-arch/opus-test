# Lokale Medien

- `campaigns/`: acht aktive Kampagnenmotive der Revision 2 (`*-v2-*`) sowie die acht erhaltenen Motive der ersten Fassung (OpenAI ImageGen, 19.09.2026). Vier Hero-Motive und je eine separat erzeugte zweite Inszenierung. Fiktive Marken KOLD BREW, NEONTRITT, HAFERKRAFT und BLITZBANK. WebP-Ausgaben mit 800 und 1536 Pixeln Breite; Seitenverhältnis der erzeugten Originale erhalten.
- `fonts/Anton-Regular.ttf`: Anton, Google Fonts. Lizenz in `Anton-OFL.txt`.
- `fonts/SpaceGrotesk.ttf`: Space Grotesk, Google Fonts. Lizenz in `SpaceGrotesk-OFL.txt`.
- `vendor/`: Three.js 0.186.0, einschließlich `RoundedBoxGeometry`, `RoomEnvironment`, `FontLoader` und `TextGeometry`. MIT-Lizenz in `vendor/LICENSE`. Alle Importe auf die lokalen Module angepasst. `js/wordmark-font.js` ist ein mit OpenType.js 1.3.4 aus Anton erzeugter Glyphensatz; es gilt dieselbe OFL-Lizenz.
- `brummer-fallback.svg`: ruhige Vektorfassung der eigens aufgebauten Figur. Das bewegliche 3D-Modell entsteht in `js/brummer.js` aus Geometrien, Materialien und separaten Gelenken.

Die vollständigen Prompts für Revision 2 stehen in `IMAGE-PROMPTS-v2.md`. Die Referenz-Storyboards wurden nicht als Website-Grafiken eingesetzt. Kampagnenmotive und Typografie sind einzeln eingebunden.

Revision 4: KOLD-BREW-Stadtkampagne im Quer- und Hochformat mit dem integrierten image_gen-Werkzeug erzeugt. Generierte Person, fiktive Marke. Prompts und finale Dateien siehe IMAGE-PROMPTS-v4.md. Keine fremden Website-Assets übernommen.

Revision 5: js/reel.js erzeugt eine eigene Echtzeit-Sequenz aus GRELLWERK-Schrägstrichen, Typografie, grafischen Formen und vorhandenen Kampagnenmotiven. Kein Video-Download, keine übernommenen K72-Medien. CSS/JavaScript der Referenz wurden nur zur Analyse in work/k72-source gelesen.
