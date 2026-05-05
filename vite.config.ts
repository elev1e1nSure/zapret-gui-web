import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    /** Прокси GitHub API: браузер → localhost, Node добавляет User-Agent (иначе API часто отвечает 403). */
    proxy: {
      "/__gh-api": {
        target: "https://api.github.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/__gh-api/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader(
              "User-Agent",
              "zapret-gui-web (https://github.com/elev1e1nSure/zapret-gui-web)",
            );
            proxyReq.setHeader("Accept", "application/vnd.github+json");
            proxyReq.setHeader("X-GitHub-Api-Version", "2022-11-28");
          });
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
});
