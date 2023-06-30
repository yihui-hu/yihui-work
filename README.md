# yihui.work

An updated portfolio / personal site for 2023, built in [Astro](https://astro.build) and typeset in [Fragment Mono](https://fonts.google.com/specimen/Fragment+Mono) and [Inter](https://fonts.google.com/specimen/Inter).

## 🚧 Project Structure

```
/
├── public/
│   └── assets/                 (images of works / for articles)
│   └── CNAME
│   └── favicon.svg
├── src/
│   └── pages/
│       └── about/
│       └── logs/               (WIP)
│       └── works/
│       └── writing/            (WIP)
│       └── index.astro
│   └── components/             (React components + Astro islands)
│   └── data/                   (static data of works)
│   └── layouts/                (for sidebar and articles)
│   └── store/                  (global store for tags)
│   └── styles/ 
└── package.json
```

Project pages in `src/pages/works` are written in `.mdx` files, and each page is exposed as a route based on its filename.

`src/components/` contains miscellaneous React/Astro components.

All static assets, compressed and converted to `.webp` format wherever possible, live in the `public/` directory.

## 💻 Development

```bash
# clone project
git clone https://github.com/yihui-hu/yihui-work.git
cd yihui-work

# install dependencies
npm install

# build project
npm run build
```

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🔖 Sites referenced:
1. [https://kevinnchen.com/](https://kevinnchen.com/)
2. [https://gemmacope.land/](https://gemmacope.land/)
3. [https://jake.isnt.online/](https://jake.isnt.online/)
4. [https://www.sang.design/](https://www.sang.design/)
5. [https://allpibslowplay.org/](https://allpibslowplay.org/#v2)
6. [https://www.tiger.exposed/index](https://www.tiger.exposed/index)
7. [https://tdingsun.github.io/reading-machines/](https://tdingsun.github.io/reading-machines/)
8. [https://eternal.how/](https://eternal.how/)
9. [http://r-m.work/](http://r-m.work/)
10. [http://studioran.tokyo/](http://studioran.tokyo/)
## 🛠️ Resources:
1. [Astro Crash Course in 20 minutes](https://www.youtube.com/watch?v=zrPVTf761OI&t=4s)
2. [Sass in 100 seconds](https://www.youtube.com/watch?v=akDIJa0AP5c)
3. [Framer Motion](https://www.framer.com/motion/)