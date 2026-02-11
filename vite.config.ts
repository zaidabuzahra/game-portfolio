import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    // This tells Vite to bundle the library into the SSR build
    noExternal: ["react-syntax-highlighter"],
  },
  optimizeDeps: {
    // This ensures the browser handles the library correctly
    include: ["react-syntax-highlighter", "react-syntax-highlighter/dist/esm/prism-async"],
  },
});
