import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Two build flavours:
//  - default `vite build`  -> normal static site in dist/ (deploy to any host)
//  - `vite build --mode standalone` -> ONE self-contained HTML in dist-standalone/
//    (CSS + JS inlined) that works offline via double-click / on a phone.
export default defineConfig(({ mode }) => {
  const standalone = mode === 'standalone'
  return {
    // Relative base so the built site works under any sub-path (e.g. GitHub Pages
    // project pages like /opus-test/) and from the file:// protocol.
    base: './',
    plugins: [react(), ...(standalone ? [viteSingleFile()] : [])],
    build: {
      outDir: standalone ? 'dist-standalone' : 'dist',
      emptyOutDir: true,
      // Keep it lean; no source maps in the shipped artefact.
      sourcemap: false,
    },
  }
})
