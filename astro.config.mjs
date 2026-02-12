import React from "@astrojs/react";
import SolidJS from "@astrojs/solid-js";
import Tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://mark-p0.github.io/",
  integrations: [
    Tailwind({
      applyBaseStyles: false,
    }),
    SolidJS({
      include: ["**/solid/*", "**/node_modules/solid-icons/**"],
    }),
    React({
      include: ["**/react/*"],
    }),
  ],
});
