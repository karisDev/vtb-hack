import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        titleProp: true,
      },
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/shared" },
      { find: "api", replacement: "/src/api" },
    ],
  },
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  },
  server: {
    host: true,
  },
});
