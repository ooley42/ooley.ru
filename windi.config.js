// @ts-check - enable TS check for js file
import { defineConfig } from "windicss/helpers";

export default defineConfig({
  separator: "_",
  plugins: [require("windicss/plugin/line-clamp")],
});
