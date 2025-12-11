import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from '@nabla/vite-plugin-eslint';
import { visualizer } from 'rollup-plugin-visualizer';
import postcssNested from 'postcss-nested';
import tailwindcss from '@tailwindcss/postcss';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { AtRule } from 'postcss';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    eslint(),
    visualizer({ filename: 'stats.html', open: true }),
    viteStaticCopy({
      targets: [{ src: 'staticwebapp.config.json', dest: '' }],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssNested(),
        tailwindcss(),
        {
          postcssPlugin: 'remove-layers', // If you want to flatten layers except base layer
          AtRule: {
            layer(rule) {
              if (rule.params !== 'base') {
                rule.each(child => {
                  rule.parent.insertAfter(rule, child);
                });
                rule.remove();
              }
            },
          },
        },
        {
          postcssPlugin: 'wrap-with-undp-container', // If you want to wrap all the class in .undp-container
          OnceExit(root) {
            const skipSelectors = ['html', 'body', ':root', ':host'];
            root.walkRules(rule => {
              if (rule.parent && rule.parent.type === 'atrule') {
                const parent = rule.parent as AtRule;
                if (parent.name === 'keyframes' || parent.name === 'supports') {
                  return;
                }
              }
              rule.selectors = rule.selectors.map(selector => {
                if (selector.startsWith('.undp-container')) return selector;
                if (skipSelectors.some(skip => selector.startsWith(skip)))
                  return selector;
                return `.undp-container ${selector}`;
              });
            });
          },
        },
        {
          postcssPlugin: 'move-media-queries-last', // If you want to reorder media queries to the end
          OnceExit(root) {
            const mediaQueries = [];

            // Collect all media queries
            root.walkAtRules('media', mediaRule => {
              mediaQueries.push(mediaRule.clone());
              mediaRule.remove();
            });

            // Append them at the end
            mediaQueries.forEach(mediaQuery => {
              root.append(mediaQuery);
            });
          },
        },
      ],
    },
  },
  build: {
    manifest: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react')) return 'react';
          if (id.includes('@undp/design-system-react')) return 'undp';
          if (id.includes('@undp/data-viz')) return 'undp';
        },
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name].[ext]',
        entryFileNames: '[name].js',
      },
      treeshake: true,
    },
  },
  server: {
    cors: {
      origin: '*',
      methods: ['GET'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
