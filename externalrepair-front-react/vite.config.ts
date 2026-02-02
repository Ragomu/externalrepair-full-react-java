import { resolve } from 'path';
import { telefunc } from 'telefunc/vite';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';

export default ({ mode, isSsrBuild }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    define: {
      'process.env': process.env,
    },
    server: {
      proxy: {
        '/api': {
          target:
            'https://dev-externalrepair-back-java-186726132534.us-east1.run.app',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      minify: !isSsrBuild,
    },
    ssr: {
      // Add npm packages containing invalid code here
      noExternal: [
        '@platformbuilders/fluid-react',
        'styled-components',
        '@emotion/*',
        'react-imask',
        '@platformbuilders/vike-builders',
        'lodash',
        '@brillout/json-serializer',
        'telefunc',
      ],
    },
    resolve: {
      alias: [
        { find: '~/', replacement: resolve(__dirname, './src') },
        { find: '~/api', replacement: resolve(__dirname, './src/api') },
        {
          find: '~/assets',
          replacement: resolve(__dirname, './src/assets'),
        },
        {
          find: '~/assets/svg',
          replacement: resolve(__dirname, './src/assets/svg'),
        },
        {
          find: '~/assets/images',
          replacement: resolve(__dirname, './src/assets/images'),
        },
        {
          find: '~/assets/animations',
          replacement: resolve(__dirname, './src/assets/animations'),
        },
        {
          find: '~/components',
          replacement: resolve(__dirname, './src/components'),
        },
        { find: '~/routes', replacement: resolve(__dirname, './src/routes') },
        { find: '~/scenes', replacement: resolve(__dirname, './src/scenes') },
        { find: '~/locales', replacement: resolve(__dirname, './src/locales') },
        {
          find: '~/services',
          replacement: resolve(__dirname, './src/services'),
        },
        { find: '~/stores', replacement: resolve(__dirname, './src/stores') },
        { find: '~/theme', replacement: resolve(__dirname, './src/theme') },
        { find: '~/utils', replacement: resolve(__dirname, './src/utils') },
        {
          find: '~/utils/types',
          replacement: resolve(__dirname, './src/utils/types'),
        },
        { find: '~/scenes', replacement: resolve(__dirname, './src/scenes') },
        { find: '~/mocks', replacement: resolve(__dirname, './src/mocks') },
      ],
    },
    plugins: [
      react({
        jsxRuntime: 'classic',
        babel: {
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            ['@babel/preset-env', { modules: false }],
            '@babel/preset-typescript',
          ],
          plugins: [
            'babel-plugin-styled-components',
            'add-module-exports',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      }),
      vike({
        redirects: {
          '/': '/login',
        },
      }),
      telefunc(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'masked-icon.svg',
        ],
        manifest: {
          short_name: process.env.VITE_APP_NAME,
          name: process.env.VITE_APP_NAME,
          description: 'My Awesome description',
          start_url: '.',
          display: 'standalone',
          theme_color: '#000000',
          background_color: '#ffffff',
          icons: [
            {
              src: 'favicon.ico',
              sizes: '64x64 32x32 24x24 16x16',
              type: 'image/x-icon',
            },
            {
              src: 'android-icon.png',
              type: 'image/png',
              sizes: '192x192',
            },
            {
              src: 'favicon.png',
              type: 'image/png',
              sizes: '512x512',
            },
          ],
        },
      }),
    ],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  });
};
