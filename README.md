# [mark-p0.github.io](https://mark-p0.github.io/)

> #### Using multiple JSX frameworks
>
> [Set the appropriate `jsxImportSource` compiler option for a framework component via a comment pragma.](https://docs.astro.build/en/guides/typescript/#errors-typing-multiple-jsx-frameworks-at-the-same-time)
>
> ```tsx
> // For Solid
> /** @jsxImportSource solid-js */
>
> // For React
> /** @jsxImportSource react */
> ```
>
> The `jsx` compiler option also seems to differ between frameworks, but changing it does not seem to be required.
>
> [Astro's endorsed example](https://github.com/withastro/astro/tree/latest/examples/framework-multiple) sets `jsx` to `preserve`, and sets `jsxImportSource` explicitly per framework component.

## Dependencies

- [Astro](https://astro.build/), for static site generation with option for interactive components
- [SolidJS](https://www.solidjs.com/), for dynamic content loading
  - [Solid Icons](https://solid-icons.vercel.app/), for a close counterpart to the [React Icons](https://react-icons.github.io/react-icons/) collection
  - [SVG Repo](https://www.svgrepo.com/), for icons not available in the above collection
- [ReactJS](https://react.dev/), for customizable interactive elements
  - [Radix](https://www.radix-ui.com/primitives/docs) / [`shadcn`](https://ui.shadcn.com/), for a conventional headless library
- [IconKitchen](https://icon.kitchen), for generating favicon variants
- _Google Fonts_, for [Nunito](https://fonts.google.com/specimen/Nunito) and [PT Sans](https://fonts.google.com/specimen/PT+Sans) ([pair source](https://heyreliable.com/ultimate-google-font-pairings/))
- [Tailwind](https://tailwindcss.com/), for convenient utility styling
- [Firebase](https://firebase.google.com/), for dynamic content storage

## Credits

> Ideas and inspirations

- [Transparent Textures](https://www.transparenttextures.com/), for ambient background texture
  - https://wesbos.com/
- The Odin Project, for the [Personal Portfolio](https://www.theodinproject.com/lessons/node-path-advanced-html-and-css-personal-portfolio) guidelines
- [`extcolors`](https://github.com/CairX/extract-colors-py) (_Python_), for extracting color palettes from images
