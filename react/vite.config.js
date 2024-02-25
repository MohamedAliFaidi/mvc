import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression(), splitVendorChunkPlugin()],
  build: {
    outDir:"../dist",
    cssCodeSplit:true,
    manifest:true,
    sourcemap:true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          console.log(id)
          // Split third-party dependencies into smaller chunks
          if (id.includes("node_modules")) {
            // Split common React-related dependencies

            if (id.includes("@motionone")) {
              return "@motionone_vendor";
            }
            if (id.includes("axios")) {
              return "axios_vendor";
            }

            if (
              id.includes("react-router-dom") ||
              id.includes("@remix-run") ||
              id.includes("react-router")
            ) {
              return "@react-router_vendor";
            }
            if (id.includes("@heroicons")) {
              return "@heroicons_vendor";
            }
            if (id.includes("react-hot-toast") || id.includes("zustand")) {
              return "react-dom_vendor";
            }
            if (id.includes("react-hot-toast")) {
              return "react-hot-toast_vendor";
            }
            if (id.includes("formik")) {
              return "formik_vendor";
            }
            if (id.includes("yup")) {
              return "yup_vendor";
            }
            if (id.includes("react_icons")) {
              return "react_icons_vendor";
            }

            if (id.includes("react")) {
              return "react_vendor";
            }

            // Split other third-party dependencies
            else {
              return "other_vendor";
            }
          }
        },
      },
    },
  },
});
