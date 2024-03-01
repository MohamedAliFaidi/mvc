import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { splitVendorChunkPlugin } from "vite";
import Pages from "vite-plugin-pages";
import generateSitemap from "vite-plugin-pages-sitemap";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression(),
    splitVendorChunkPlugin(),
    Pages({
      onRoutesGenerated: (routes) => generateSitemap({ routes }),
    }),
    VitePWA(),
  ],
  build: {
    outDir: "../dist",
    cssCodeSplit: true,
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          console.log(id);
          // Split third-party dependencies into smaller chunks
          if (id.includes("node_modules")) {
            // Split common React-related dependencies

            if (id.includes("@motionone")) {
              return "one_vendor";
            }
            if (id.includes("axios")) {
              return "two_vendor";
            }

            if (
              id.includes("react-router-dom") ||
              id.includes("@remix-run") ||
              id.includes("react-router")
            ) {
              return "three_vendor";
            }
            if (id.includes("@heroicons")) {
              return "four_vendor";
            }
            if (id.includes("react-hot-toast") || id.includes("zustand")) {
              return "five_vendor";
            }
            if (id.includes("react-hot-toast")) {
              return "sixvendor";
            }
            if (id.includes("formik")) {
              return "seven_vendor";
            }
            if (id.includes("yup")) {
              return "eight_vendor";
            }
            if (id.includes("react_icons")) {
              return "nine_vendor";
            }

            if (id.includes("react")) {
              return "ten_vendor";
            }

            // Split other third-party dependencies
            else {
              return "x_vendor";
            }
          }
        },
      },
    },
  },
});
