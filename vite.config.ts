import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteCompression()],
  // assetsInclude:['**/*awesome.min.css'],
  resolve: {
    alias: {
      // 视图
      view: resolve(__dirname, "src/views"),
      // 组件
      conponent: resolve(__dirname, "src/components"),
      // 静态资源目录
      "/asset": resolve(__dirname, "src/assets"),
    },
  },
  mode: "development",
  // 打包配置打印信息
  base: "./",
  build: {

    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // chunkFileNames: "js/[name]-[hash].js",
        // entryFileNames: "js/[name]-[hash].js",
        // assetFileNames: (ChunkInfo) => {
        //   let regExg = /\.[a-zA-Z]{1,6}$/;
        //   let keys = regExg.exec(ChunkInfo.name)[0];
        //   switch (keys) {
        //     case ".js":
        //     case ".html":
        //     case ".css":
        //       return "[ext]/[name]-[hash].[ext]";
        //     case ".png":
        //     case ".jpg":
        //     case ".jpeg":
        //     case ".svg":
        //       return "images/[hash].[ext]";
        //     default:
        //       return "static/[name]-[hash].[ext]";
        //   }
        // },
      },
    },
  },
});
