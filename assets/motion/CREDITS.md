# GRELLWERK / Bewegtbild / Revision 9

20.09.2026. Die Startseite verwendet zwei bearbeitete Stock-Filmaufnahmen. Personen und Licht bewegen sich im aufgenommenen Motiv. Die fotografische Zoom-Montage aus Revision 7 ist ersetzt.

## Quellen

- [Close up vertical video of a dancer under neon lights, Mixkit 50433](https://mixkit.co/free-stock-video/close-up-vertical-video-of-a-dancer-under-neon-lights-50433/). Datei dance.mp4, Originaldownload https://assets.mixkit.co/videos/50433/50433-720.mp4. Verwendeter Ausschnitt: 0,3 bis 5,8 Sekunden, um 90 Grad gegen den Uhrzeigersinn gedreht.
- [Man in cyberpunk glasses dances under neon lights, Mixkit 50453](https://mixkit.co/free-stock-video/man-in-cyberpunk-glasses-dances-under-neon-lights-50453/). Datei performer.mp4, Originaldownload https://assets.mixkit.co/videos/50453/50453-720.mp4. Verwendeter Ausschnitt: 0 bis 5,5 Sekunden.

Beide konkreten Artikelseiten weisen am 20.09.2026 die [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree) für kommerzielle und private Verwendung aus. Es werden keine Zustimmung, Zusammenarbeit oder Kundenbeziehung mit den abgebildeten Personen behauptet. Die Personen sind Stock-Models und gehören nicht zur fiktiven KI-Crew auf About.

## Bearbeitung und Ausgaben

Schnitt, Drehung, monochrome Farbkorrektur mit säuregrünen Lichtern, Hochformatbeschnitt, GIF-Konvertierung. Kein Ton, keine Bewegung aus Standbildern, keine K72-Medien.

- home-film.mp4: 11 Sekunden, 1280 × 720, 24 fps, H.264, rund 3,7 MB.
- home-film-mobile.mp4: 11 Sekunden, 576 × 1024, 24 fps, H.264, rund 2,3 MB.
- pulse.gif: 360 × 202, 76 Frames, 5,43 Sekunden, rund 2,3 MB.
- signal.gif: 360 × 202, 77 Frames, 5,5 Sekunden, rund 1,2 MB.
- pulse-still.webp und signal-still.webp: ruhige Ersatzbilder für Pause, reduzierte Bewegung und GIF-Ausfall.

Die beiden echten GIF-Dateien erscheinen abwechselnd innerhalb der Überschrift. Der Hintergrund verwendet die effizientere MP4-Kodierung derselben Aufnahmen. Es werden keine Dateien zur Laufzeit von Mixkit geladen.

Reproduktion mit FFmpeg und den beiden oben genannten Originaldateien:

`python tools/build-home-motion.py --source-dir PFAD_ZU_DEN_QUELLEN --ffmpeg PFAD_ZU_FFMPEG`

## Projektstudien / Revision 9

Drei weitere echte GIF-Loops ergänzen die Markenwelten. Die Motive sind atmosphärische Studien, keine behaupteten Produktaufnahmen der erfundenen Marken. Seit Revision 10 stehen die großen Filmflächen auf Projects und in den drei passenden Cases. About zeigt coffee.gif zur Erklärung der KOLD-BREW-Zusammenarbeit. Home bleibt ausschließlich der Film-Hero.

- [Coffee beans falling in reverse, Mixkit 208](https://mixkit.co/free-stock-video/coffee-beans-falling-in-reverse-208/): coffee.mp4, Originaldownload https://assets.mixkit.co/videos/208/208-720.mp4. Ausschnitt 2 bis 6 Sekunden. Entsättigung und Kontrastkorrektur. coffee.gif: 4.717.478 Bytes.
- [Dancer feet dancing on a dirty floor, Mixkit 446](https://mixkit.co/free-stock-video/dancer-feet-dancing-on-a-dirty-floor-446/): footwork.mp4, Originaldownload https://assets.mixkit.co/videos/446/446-720.mp4. Ausschnitt 4 bis 8 Sekunden. Monochrom mit grüner Tönung. footwork.gif: 1.869.531 Bytes.
- [Coffee creamer swirling in coffee, Mixkit 207](https://mixkit.co/free-stock-video/coffee-creamer-swirling-in-coffee-207/): cream.mp4, Originaldownload https://assets.mixkit.co/videos/207/207-720.mp4. Ausschnitt 0,8 bis 4,8 Sekunden. Dezente Entsättigung und Kontrastkorrektur. cream.gif: 2.067.164 Bytes. Die Aufnahme belegt keine Haferzutaten; sie dient als fließende Textur zur Markenstudie.

Alle drei konkreten Artikelseiten weisen die Mixkit Stock Video Free License aus. Jeder GIF enthält 56 Frames bei 480 × 270 Pixeln, 14 Bildern pro Sekunde und 4 Sekunden Laufzeit. Passende WebP-Standbilder liegen daneben. GIFs werden nur bei Sichtbarkeit geladen und bei Pause, verborgenem Tab, geöffnetem Menü oder reduzierter Bewegung durch Standbilder ersetzt.

Reproduktion: `python tools/build-project-motion.py --source-dir PFAD_ZU_DEN_DREI_QUELLEN --ffmpeg PFAD_ZU_FFMPEG`
