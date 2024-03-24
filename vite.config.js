// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/shelter/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        pets: resolve(__dirname, "our-pets.html"),
      },
    },
  },
});
