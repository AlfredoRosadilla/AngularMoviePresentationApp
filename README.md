# AngularMoviePresentationApp

This project was generated with [ngX-Rocket](https://github.com/ngx-rocket/generator-ngx-rocket/)
version 5.0.1

# Getting started

1. Go to project folder and install dependencies:
 ```sh
 npm install
 ```

2. Launch development server, and open `localhost:4200` in your browser:
 ```sh
 npm start
 ```

# Project structure

```
.
├── LICENSE
├── README.md
├── angular.json
├── docs
│   └──── AMPA Manual
├── e2e
│   ├── protractor.conf.js
│   ├── src
│   │   ├── app.e2e-spec.ts
│   │   └── app.po.ts
│   └── tsconfig.e2e.json
├── package-lock.json
├── package.json
├── proxy.conf.js
├── reports
│   ├── coverage
│   │   ├── base.css
│   │   ├── block-navigation.js
│   │   ├── index.html
│   │   ├── lcov.info
│   │   ├── prettify.css
│   │   ├── prettify.js
│   │   ├── sort-arrow-sprite.png
│   │   ├── sorter.js
│   │   └── src
│   │       ├── app
│   │       │   ├── app.component.ts.html
│   │       │   ├── components
│   │       │   │   ├── components.module.ts.html
│   │       │   │   ├── favorites
│   │       │   │   │   ├── favorites-routing.module.ts.html
│   │       │   │   │   ├── favorites.component.ts.html
│   │       │   │   │   ├── favorites.module.ts.html
│   │       │   │   │   └── index.html
│   │       │   │   ├── home
│   │       │   │   │   ├── home-routing.module.ts.html
│   │       │   │   │   ├── home.component.ts.html
│   │       │   │   │   ├── home.module.ts.html
│   │       │   │   │   └── index.html
│   │       │   │   ├── index.html
│   │       │   │   ├── login
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── login-routing.module.ts.html
│   │       │   │   │   ├── login.component.ts.html
│   │       │   │   │   └── login.module.ts.html
│   │       │   │   ├── movie-detail
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── movie-detail-routing.module.ts.html
│   │       │   │   │   ├── movie-detail.component.ts.html
│   │       │   │   │   └── movie-detail.module.ts.html
│   │       │   │   ├── search
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── search-routing.module.ts.html
│   │       │   │   │   ├── search.component.ts.html
│   │       │   │   │   └── search.module.ts.html
│   │       │   │   └── user-profile
│   │       │   │       ├── index.html
│   │       │   │       ├── user-profile-routing.module.ts.html
│   │       │   │       ├── user-profile.component.ts.html
│   │       │   │       └── user-profile.module.ts.html
│   │       │   ├── index.html
│   │       │   ├── material.module.ts.html
│   │       │   ├── services
│   │       │   │   ├── alert
│   │       │   │   │   ├── alert.service.ts.html
│   │       │   │   │   └── index.html
│   │       │   │   ├── authentication
│   │       │   │   │   ├── authentication.guard.ts.html
│   │       │   │   │   ├── authentication.service.ts.html
│   │       │   │   │   └── index.html
│   │       │   │   ├── business
│   │       │   │   │   ├── business.module.ts.html
│   │       │   │   │   ├── index.html
│   │       │   │   │   └── movies
│   │       │   │   │       ├── index.html
│   │       │   │   │       ├── movie.mock-data.ts.html
│   │       │   │   │       ├── movie.model.ts.html
│   │       │   │   │       ├── movies.service.ts.html
│   │       │   │   │       └── service.mock.ts.html
│   │       │   │   ├── i18n
│   │       │   │   │   ├── i18n.service.ts.html
│   │       │   │   │   └── index.html
│   │       │   │   ├── index.html
│   │       │   │   ├── index.ts.html
│   │       │   │   ├── logger
│   │       │   │   │   ├── index.html
│   │       │   │   │   └── logger.service.ts.html
│   │       │   │   ├── route
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── route-reusable-strategy.ts.html
│   │       │   │   │   └── route.service.ts.html
│   │       │   │   ├── services.module.ts.html
│   │       │   │   └── theme
│   │       │   │       ├── index.html
│   │       │   │       └── theme.service.ts.html
│   │       │   └── shared
│   │       │       ├── components
│   │       │       │   ├── alert
│   │       │       │   │   ├── alert.component.ts.html
│   │       │       │   │   └── index.html
│   │       │       │   ├── footer
│   │       │       │   │   ├── footer.component.ts.html
│   │       │       │   │   └── index.html
│   │       │       │   ├── header
│   │       │       │   │   ├── header.component.ts.html
│   │       │       │   │   └── index.html
│   │       │       │   ├── icon-input
│   │       │       │   │   ├── icon-input.component.ts.html
│   │       │       │   │   └── index.html
│   │       │       │   ├── loader
│   │       │       │   │   ├── index.html
│   │       │       │   │   └── loader.component.ts.html
│   │       │       │   ├── movie-card
│   │       │       │   │   ├── index.html
│   │       │       │   │   └── movie-card.component.ts.html
│   │       │       │   ├── movie-grid
│   │       │       │   │   ├── index.html
│   │       │       │   │   └── movie-grid.component.ts.html
│   │       │       │   └── shell
│   │       │       │       ├── index.html
│   │       │       │       └── shell.component.ts.html
│   │       │       ├── index.html
│   │       │       ├── index.ts.html
│   │       │       └── shared.module.ts.html
│   │       ├── environments
│   │       │   ├── environment.ts.html
│   │       │   └── index.html
│   │       ├── index.html
│   │       ├── polyfills.ts.html
│   │       └── test.ts.html
│   └── junit
│       └── TESTS-xunit.xml
├── src
│   ├── app
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── components
│   │   │   ├── components.module.spec.ts
│   │   │   ├── components.module.ts
│   │   │   ├── favorites
│   │   │   │   ├── favorites-routing.module.ts
│   │   │   │   ├── favorites.component.html
│   │   │   │   ├── favorites.component.scss
│   │   │   │   ├── favorites.component.spec.ts
│   │   │   │   ├── favorites.component.ts
│   │   │   │   └── favorites.module.ts
│   │   │   ├── home
│   │   │   │   ├── home-routing.module.ts
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.scss
│   │   │   │   ├── home.component.spec.ts
│   │   │   │   ├── home.component.ts
│   │   │   │   └── home.module.ts
│   │   │   ├── login
│   │   │   │   ├── login-routing.module.ts
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.scss
│   │   │   │   ├── login.component.spec.ts
│   │   │   │   ├── login.component.ts
│   │   │   │   └── login.module.ts
│   │   │   ├── movie-detail
│   │   │   │   ├── movie-detail-routing.module.ts
│   │   │   │   ├── movie-detail.component.html
│   │   │   │   ├── movie-detail.component.scss
│   │   │   │   ├── movie-detail.component.spec.ts
│   │   │   │   ├── movie-detail.component.ts
│   │   │   │   └── movie-detail.module.ts
│   │   │   ├── search
│   │   │   │   ├── search-routing.module.ts
│   │   │   │   ├── search.component.html
│   │   │   │   ├── search.component.scss
│   │   │   │   ├── search.component.spec.ts
│   │   │   │   ├── search.component.ts
│   │   │   │   └── search.module.ts
│   │   │   └── user-profile
│   │   │       ├── user-profile-routing.module.ts
│   │   │       ├── user-profile.component.html
│   │   │       ├── user-profile.component.scss
│   │   │       ├── user-profile.component.spec.ts
│   │   │       ├── user-profile.component.ts
│   │   │       └── user-profile.module.ts
│   │   ├── material.module.ts
│   │   ├── services
│   │   │   ├── alert
│   │   │   │   ├── alert.service.spec.ts
│   │   │   │   └── alert.service.ts
│   │   │   ├── authentication
│   │   │   │   ├── authentication.guard.spec.ts
│   │   │   │   ├── authentication.guard.ts
│   │   │   │   ├── authentication.service.spec.ts
│   │   │   │   └── authentication.service.ts
│   │   │   ├── business
│   │   │   │   ├── business.module.spec.ts
│   │   │   │   ├── business.module.ts
│   │   │   │   └── movies
│   │   │   │       ├── movie.mock-data.ts
│   │   │   │       ├── movie.model.ts
│   │   │   │       ├── movies.service.spec.ts
│   │   │   │       ├── movies.service.ts
│   │   │   │       └── service.mock.ts
│   │   │   ├── i18n
│   │   │   │   ├── i18n.service.spec.ts
│   │   │   │   └── i18n.service.ts
│   │   │   ├── index.ts
│   │   │   ├── logger
│   │   │   │   ├── logger.service.spec.ts
│   │   │   │   └── logger.service.ts
│   │   │   ├── route
│   │   │   │   ├── route-reusable-strategy.ts
│   │   │   │   ├── route.service.spec.ts
│   │   │   │   └── route.service.ts
│   │   │   ├── services.module.spec.ts
│   │   │   ├── services.module.ts
│   │   │   └── theme
│   │   │       ├── theme.service.spec.ts
│   │   │       └── theme.service.ts
│   │   └── shared
│   │       ├── components
│   │       │   ├── alert
│   │       │   │   ├── alert.component.html
│   │       │   │   ├── alert.component.scss
│   │       │   │   ├── alert.component.spec.ts
│   │       │   │   └── alert.component.ts
│   │       │   ├── footer
│   │       │   │   ├── footer.component.html
│   │       │   │   ├── footer.component.scss
│   │       │   │   ├── footer.component.spec.ts
│   │       │   │   └── footer.component.ts
│   │       │   ├── header
│   │       │   │   ├── header.component.html
│   │       │   │   ├── header.component.scss
│   │       │   │   ├── header.component.spec.ts
│   │       │   │   └── header.component.ts
│   │       │   ├── icon-input
│   │       │   │   ├── icon-input.component.html
│   │       │   │   ├── icon-input.component.scss
│   │       │   │   ├── icon-input.component.spec.ts
│   │       │   │   └── icon-input.component.ts
│   │       │   ├── loader
│   │       │   │   ├── loader.component.html
│   │       │   │   ├── loader.component.scss
│   │       │   │   ├── loader.component.spec.ts
│   │       │   │   └── loader.component.ts
│   │       │   ├── movie-card
│   │       │   │   ├── movie-card.component.html
│   │       │   │   ├── movie-card.component.scss
│   │       │   │   ├── movie-card.component.spec.ts
│   │       │   │   └── movie-card.component.ts
│   │       │   ├── movie-grid
│   │       │   │   ├── movie-grid.component.html
│   │       │   │   ├── movie-grid.component.scss
│   │       │   │   ├── movie-grid.component.spec.ts
│   │       │   │   └── movie-grid.component.ts
│   │       │   └── shell
│   │       │       ├── shell.component.html
│   │       │       ├── shell.component.scss
│   │       │       ├── shell.component.spec.ts
│   │       │       └── shell.component.ts
│   │       ├── index.ts
│   │       ├── shared.module.ts
│   │       └── styles
│   │           ├── classes.scss
│   │           ├── colors.scss
│   │           ├── index.scss
│   │           ├── media-queries.scss
│   │           └── mixins.scss
│   ├── apple-touch-icon.png
│   ├── assets
│   │   ├── images
│   │   │   ├── Thumbs.db
│   │   │   ├── american-gangster.jpg
│   │   │   ├── ant-man.jpg
│   │   │   ├── bad-boys.jpg
│   │   │   ├── bridge-of-spies.jpg
│   │   │   ├── deadpool.jpg
│   │   │   ├── fast-and-furious-7.jpg
│   │   │   ├── gangster-squad.jpg
│   │   │   ├── gridiron-gang.jpg
│   │   │   ├── jurassic-world.jpg
│   │   │   ├── legend.jpg
│   │   │   ├── mission-impossible-rogue-nation.jpg
│   │   │   ├── now-you-see-me.jpg
│   │   │   ├── project-x.jpg
│   │   │   ├── running-scared.jpg
│   │   │   ├── sicario.jpg
│   │   │   ├── southpaw.jpg
│   │   │   ├── spectre.jpg
│   │   │   ├── straight-outta-compton.jpg
│   │   │   ├── the-dark-knight.jpg
│   │   │   ├── the-hangover.jpg
│   │   │   ├── the-man-from-uncle.jpg
│   │   │   ├── the-matrix.jpg
│   │   │   ├── the-tournament.jpg
│   │   │   ├── tracers.jpg
│   │   │   └── we-are-the-millers.jpg
│   │   └── video
│   │       └── deadpool.mp4
│   ├── browserslist
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── karma.conf.js
│   ├── main.scss
│   ├── main.ts
│   ├── polyfills.ts
│   ├── robots.txt
│   ├── test.ts
│   ├── theme
│   │   ├── theme-variables.scss
│   │   └── theme.scss
│   ├── translations
│   │   ├── en-US.json
│   │   └── es-EN.json
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json
└── tslint.json

```

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

Task                            | Description
--------------------------------|--------------------------------------------------------------------------------------
`npm start`                     | Run development server on `http://localhost:4200/`
`npm run build [-- --env=prod]` | Lint code and build web app for production (with [AOT](https://angular.io/guide/aot-compiler)) in `dist/` folder
`npm test`                      | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode
`npm run test:ci`               | Lint code and run unit tests once for continuous integration
`npm run lint`                  | Lint code

When building the application, you can specify the target environment using the additional flag `--env <name>` (do not
forget to prepend `--` to pass arguments to npm scripts).

The default build environment is `prod`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.
You should not use `ng serve` directly, as it does not use the backend proxy configuration by default.

#### Tools

Development, build and quality processes are based on [angular-cli](https://github.com/angular/angular-cli) and
[NPM scripts](https://docs.npmjs.com/misc/scripts), which includes:

- Optimized build and bundling process with [Webpack](https://webpack.github.io)
- [Development server](https://webpack.github.io/docs/webpack-dev-server.html) with backend proxy and live reload
- Cross-browser CSS with [autoprefixer](https://github.com/postcss/autoprefixer) and
  [browserslist](https://github.com/ai/browserslist)
- Asset revisioning for [better cache management](https://webpack.github.io/docs/long-term-caching.html)
- Unit tests using [Jasmine](http://jasmine.github.io) and [Karma](https://karma-runner.github.io)
- End-to-end tests using [Protractor](https://github.com/angular/protractor)
- Static code analysis: [TSLint](https://github.com/palantir/tslint), [Codelyzer](https://github.com/mgechev/codelyzer),
  [Stylelint](http://stylelint.io) and [HTMLHint](http://htmlhint.com/)
- Local knowledgebase server using [Hads](https://github.com/sinedied/hads)

#### Libraries

- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io)
- [Angular Flex Layout](https://github.com/angular/flex-layout)
- [Material Icons](https://material.io/icons/)
- [RxJS](http://reactivex.io/rxjs)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Lodash](https://lodash.com)

#### Coding guides

- [Angular](docs/coding-guides/angular.md)
- [TypeScript](docs/coding-guides/typescript.md)
- [Sass](docs/coding-guides/sass.md)
- [HTML](docs/coding-guides/html.md)
- [Unit tests](docs/coding-guides/unit-tests.md)
- [End-to-end tests](docs/coding-guides/e2e-tests.md)

#### Other documentation

- [I18n guide](docs/i18n.md)
- [Working behind a corporate proxy](docs/corporate-proxy.md)
- [Updating dependencies and tools](docs/updating.md)
- [Using a backend proxy for development](docs/backend-proxy.md)
- [Browser routing](docs/routing.md)
