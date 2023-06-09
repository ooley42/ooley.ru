import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";

import Unocss from 'unocss/vite'
import { transformerDirectives, presetIcons, presetUno, extractorSplit } from 'unocss'
import extractorPug from '@unocss/extractor-pug'

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
    Unocss({
      transformers: [
        transformerDirectives(),
      ],
      presets: [
        presetIcons({
          scale: 1.2,
          extraProperties: {
            'vertical-align': 'middle'
          }
        }),
        presetUno(),
      ],
      extractors: [
        extractorSplit,
        extractorPug()
      ]
    }),
  ],
  optimizeDeps: {
    include: ["vue", "@vueuse/core"],
  },
  ssr: {
    noExternal: ["ol"],
  },
});
