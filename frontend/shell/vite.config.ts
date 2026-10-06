import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [
    react(),
    federation({
      name: "shell",
      remotes: {
        authMFE: "http://localhost:5174/assets/remoteEntry.js",
        projectMFE: "http://localhost:5175/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-redux"],
    }),
  ],
});
