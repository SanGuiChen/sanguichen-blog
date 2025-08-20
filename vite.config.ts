import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/sanguichen-blog/", // 替换为你的仓库名
  build: {
    outDir: "dist",
  },
  assetsInclude: ["**/*.md"], // 包含Markdown文件
});
