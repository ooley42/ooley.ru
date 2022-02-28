// @ts-check - enable TS check for js file
import { defineConfig } from "windicss/helpers";
import clamp from "windicss/plugin/line-clamp";

export default defineConfig({
  separator: "_",
  plugins: [clamp],
});
