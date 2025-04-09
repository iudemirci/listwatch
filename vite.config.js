import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://newsapi.org/v2", // Target News API
        changeOrigin: true, // Change the origin to the target's origin
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' from the path before forwarding
      },
    },
  },
});
