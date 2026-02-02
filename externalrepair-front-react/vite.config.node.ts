import { defineConfig, loadEnv } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    build: {
      outDir: 'dist_server',
      minify: true,
    },
    plugins: [
      ...VitePluginNode({
        adapter: 'express',
        appPath: './server/index.ts',
        exportName: 'serverNode',
        initAppOnBoot: false,
        tsCompiler: 'esbuild',
        swcOptions: {},
      }),
    ],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  });
};
