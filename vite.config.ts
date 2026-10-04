import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// Copies any image files (.jpg, .jpeg, .png, .webp, .gif, .svg) placed in the repository root
// into the dist folder during build, and creates 404.html for GitHub Pages SPA support.
function githubPagesRootAssetsPlugin(): Plugin {
  return {
    name: 'github-pages-root-assets',
    closeBundle() {
      const rootDir = path.resolve(__dirname, '.');
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) return;

      const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);
      const entries = fs.readdirSync(rootDir, {withFileTypes: true});

      for (const entry of entries) {
        if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          if (imageExtensions.has(ext)) {
            fs.copyFileSync(
              path.join(rootDir, entry.name),
              path.join(distDir, entry.name)
            );
          }
        }
      }

      const indexHtml = path.join(distDir, 'index.html');
      const notFoundHtml = path.join(distDir, '404.html');
      if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, notFoundHtml);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/Mukesh-Guru/',
    plugins: [react(), tailwindcss(), githubPagesRootAssetsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
