# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.5.0](https://github.com/mIaborde/ng-start/compare/v1.4.0...v1.5.0) (2021-01-12)

### Features

- forgot/reset password ([fc1e9cc](https://github.com/mIaborde/ng-start/commit/fc1e9ccd99bd7ad7be98a974d144840b28b562f7))
- **auth:** strapi ready reactive auth forms ([bdb9e49](https://github.com/mIaborde/ng-start/commit/bdb9e499773b2ac2b19722ef38ba0aeacb85e7f5))
- **settings:** bettter settings, accessibility improved ([d7ea11a](https://github.com/mIaborde/ng-start/commit/d7ea11af9dc4ed29b052d368f619adc0afe0ea82))

### Bug Fixes

- blank page on production build ([3f340ed](https://github.com/mIaborde/ng-start/commit/3f340ed5a5c22c5e9031af5d5236bdaed0c894ee))
- import ([c3be577](https://github.com/mIaborde/ng-start/commit/c3be57712cc0c5b3635aff90088283ae16893f54))

## [1.4.0](https://github.com/mIaborde/ng-start/compare/v1.3.0...v1.4.0) (2020-10-14)

### Features

- **auth:** forms validation on submit, if fail validate on change to correct user ([4abf9b9](https://github.com/mIaborde/ng-start/commit/4abf9b9a123e43dba3a18368ba71b8dc90de7f2f))

## [1.3.0](https://github.com/miaborde/ng-start/compare/v1.2.0...v1.3.0) (2020-09-07)

### Features

- **pwa:** pwa theme color = app theme primary color ([99e9ca4](https://github.com/miaborde/ng-start/commit/99e9ca44da3e3df1571b31a0e382fca61272e504))

### Bug Fixes

- **a11y:** add aria-label on each matTooltip ([a9f686d](https://github.com/miaborde/ng-start/commit/a9f686da70f6e3ce663a1a6bb6e4199932b2f553))

## [1.2.0](https://github.com/miaborde/ng-start/compare/v1.1.0...v1.2.0) (2020-09-07)

### Features

- auth guards, user state service ([4b74ad9](https://github.com/miaborde/ng-start/commit/4b74ad9b9fc046fbee57f8f909df110114dafd1b))
- package.json version in app footer, different for dev/prod mode ([a4bfb6d](https://github.com/miaborde/ng-start/commit/a4bfb6d63d39ad243f9c139ccc0184b379e0486f))

## [1.1.0](https://github.com/mIaborde/ng-start/compare/v1.0.0...v1.1.0) (2020-08-30)

### Features

- base responsive layout, lazy loaded routes, fake profile ([d683496](https://github.com/mIaborde/ng-start/commit/d683496395e318b6594699baccc477ebdc82b31f))
- signin and singup pages ([bf77379](https://github.com/mIaborde/ng-start/commit/bf77379620f0e4d33d976c8d4af42daf601a3164))
- user edit page with avatar upload template ([a081009](https://github.com/mIaborde/ng-start/commit/a081009e6e1cc9bbb150da12339573d7a8d051ad))

## 1.0.0 (2020-08-20)

### ⚠ BREAKING CHANGES

- **i18n:** build output path change, dist/ng-start -> dist/ng-start/en-US & dist/ng-start/fr

### Features

- **container:** app in container, complete nginx.conf with https & language redirection ([7c91db7](https://github.com/miaborde/ng-start/commit/7c91db748106fc7d8c5f1adaba499c7e034eda74))
- **git:** commit convention, interactive commit cli, auto version increment & changelog on release ([291751d](https://github.com/miaborde/ng-start/commit/291751daa93af47a8477ce3431f190b842415653))
- **i18n:** angular i18n, aot fr en-US builds, xliffmerge tool to handle xlf locale files ([a7410a8](https://github.com/miaborde/ng-start/commit/a7410a80916d19b496e2787113969b8c9893c4a5))
- **lint:** ng lint pre-commit hook, prettier & ng lint applied ([bf61ec3](https://github.com/miaborde/ng-start/commit/bf61ec35e66d5c68d0b3fef0d094bf0879a1cd0a))
- **lint:** strict lint, code formatting with pre-commit, vscode extensions recommendations ([96d0fc1](https://github.com/miaborde/ng-start/commit/96d0fc191850612ef2a565a76818f5ee6510ed42))
- **material:** angular material framework, custom theme, animations, typography ([d43b047](https://github.com/miaborde/ng-start/commit/d43b04777b975d95496b5380feeecfba4988e7a0))
- **material:** custom config with dark/light theme and css classes to expose color palette ([ba1fefd](https://github.com/miaborde/ng-start/commit/ba1fefd4a8dfc4e3412b1904ffae11c375960185))
- **material:** dark/light theme switcher, reduced material css bundle size, custom color classes ([5a0c253](https://github.com/miaborde/ng-start/commit/5a0c253519d782b67978a437306dd292709b955b))
- **pwa:** website is now a progressive web app ([a62fd90](https://github.com/miaborde/ng-start/commit/a62fd905227a7aec2796cb26b571919e67d6e03f))
- **vscode:** ready to use debugger for chrome, start app with 'ng serve' vscode config ([4838464](https://github.com/miaborde/ng-start/commit/48384644a7b9a2241a2443220232a9d27d4f0d59))

## 0.0.0 (2020-08-18)

### Features

- **git:** commit convention, interactive commit cli, auto version increment & changelog on release ([291751d](https://github.com/miaborde/ng-start/commit/291751daa93af47a8477ce3431f190b842415653))
- **lint:** ng lint pre-commit hook, prettier & ng lint applied ([bf61ec3](https://github.com/miaborde/ng-start/commit/bf61ec35e66d5c68d0b3fef0d094bf0879a1cd0a))
- **lint:** strict lint, code formatting with pre-commit, vscode extensions recommendations ([96d0fc1](https://github.com/miaborde/ng-start/commit/96d0fc191850612ef2a565a76818f5ee6510ed42))
- **pwa:** website is now a progressive web app ([a62fd90](https://github.com/miaborde/ng-start/commit/a62fd905227a7aec2796cb26b571919e67d6e03f))
- **vscode:** ready to use debugger for chrome, start app with 'ng serve' vscode config ([4838464](https://github.com/miaborde/ng-start/commit/48384644a7b9a2241a2443220232a9d27d4f0d59))
