import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";
import { ViteAliases } from "vite-aliases";
import Pages from "vite-plugin-pages";
import { extendRoute } from "./vitepress-pages";
import Inspect from "vite-plugin-inspect";

export default defineConfig({
  server: {
    port: 3342,
  },
  plugins: [
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/, // .vue
      ],
      imports: ["vue"],
    }),
    Pages({
      dirs: [
        { dir: "post", baseRoute: "post" },
        { dir: "event", baseRoute: "event" },
        { dir: "theory", baseRoute: "theory" },
        { dir: "overview", baseRoute: "overview" },
        { dir: "report", baseRoute: "report" },
        { dir: "workshop", baseRoute: "workshop" },
        { dir: "project", baseRoute: "project" },
        { dir: "research", baseRoute: "research" },
        { dir: "world", baseRoute: "world" },
      ],
      extensions: ["md"],
      extendRoute,
    }),
    // ViteAliases({
    //   dir: ".vitepress",
    //   deep: false,
    //   adjustDuplicates: true,
    // }),
    Components({
      dirs: [".vitepress/theme/components", ".vitepress/comps"],
      extensions: ["vue", "ts"],
      directoryAsNamespace: true,
      globalNamespaces: ["global"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/node_modules/, /\.git/],
      resolvers: [
        IconsResolver({
          componentPrefix: "",
        }),
      ],
    }),
    Icons({
      defaultStyle: "vertical-align: middle;",
    }),
    WindiCSS({
      scan: {
        dirs: [".vitepress"],
        include: ["index.md"],
        exclude: ["**/examples/**/*"],
        fileExtensions: ["vue", "ts"],
      },
    }),
  ],
  optimizeDeps: {
    include: ["vue", "@vueuse/core"],
  },
});
