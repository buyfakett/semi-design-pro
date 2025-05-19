import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import path from 'path';

export default defineConfig({
  source: {
    entry: {
      index: './src/main.tsx'
    },
    alias: {
      '@': path.resolve(__dirname, './')
    }
  },
  plugins: [pluginReact(), pluginSass()],
  dev: {
    proxy: {
      '/api': {
        target: 'https://api.f2gpt.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  output: {
    distPath: {
      root: 'dist',
    },
    inlineScripts({ size }) {
      return size < 10 * 1000;
    },
  },
  performance: {
    chunkSplit: {
      // 代码拆分
      strategy: 'split-by-size',
      minSize: 30000, // 30k
      maxSize: 500000, // 50k
    },
  },
});
