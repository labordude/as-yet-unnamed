import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
// proxy and api routes need to go/ live 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/home": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/home/, ""),
      },
      "/profile": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
      },
      "/signup": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
      },
      "/login": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\//, ""),
      },
      "/logout": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\//, ""),
      },
      "/games": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\//, ""),
      },
      "/check_session": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\//, ""),
      },
    },
  },
});
