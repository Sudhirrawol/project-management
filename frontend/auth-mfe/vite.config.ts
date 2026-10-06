import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),federation({
    name:"authMFE", //remote name
    filename:"remoteEntry.js",
    exposes:{
      "./Login":"./src/App.tsx",
    },
    shared:["react","react-dom"]
  })],
  build:{target:"esnext"}

})
