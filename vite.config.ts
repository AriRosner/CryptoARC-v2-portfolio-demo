import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/CryptoARC-v2-portfolio-demo/",
  plugins: [react(), tailwindcss()],
  server: {
    host: "127.0.0.1",
    port: 4173
  }
});
