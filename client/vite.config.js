import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
// proxy and api routes need to go/ live
// checks for proxy from hepers.jsx

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\//, ""),
      },
    },
  },
});
