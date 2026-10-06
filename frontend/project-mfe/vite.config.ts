import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "ProjectMfe",
      filename: "remoteEntry.js",

      // Shell imports "projectMFE/Project"
      // and receives ProjectRemote.tsx
      exposes: {
        "./Project": "./src/ProjectRemote.tsx",
      },

      // React must be shared between Shell and Remote
      shared: {
        react: {
          import: false,
          requiredVersion: false,
        },
        "react-dom": {
          import: false,
          requiredVersion: false,
        },
        "react-redux": {},
      },
    }),
  ],

  server: {
    port: 5175,
  },

  build: {
    target: "esnext",
    cssCodeSplit: false,
  },
});
