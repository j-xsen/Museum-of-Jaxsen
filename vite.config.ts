import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vike(), react()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Split the 3D-scene vendor code out of the main bundle so it caches
        // independently and unrelated changes don't bust the whole chunk.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("node_modules/@react-three/drei")) return "vendor-drei";
          if (id.includes("node_modules/@react-three/uikit")) return "vendor-uikit";
          if (id.includes("node_modules/@react-three/fiber") || id.includes("node_modules/three/")) {
            return "vendor-three";
          }
        },
      },
    },
  },
});
