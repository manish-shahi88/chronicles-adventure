// import { defineConfig } from "vite";
// export default defineConfig({
//   build: {
//     rollupOptions: {
//       input: {
//         main: "index.html",
//         game: "startPage.html",
//         levelEditor: "levelEditor.html"
//       },
//     },
//   },
// });


import { defineConfig } from 'vite';
export default defineConfig({
  base: '/chronicles-adventure/',
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        game: "startPage.html",
        levelEditor: "levelEditor.html"
      },
    },
  },
});