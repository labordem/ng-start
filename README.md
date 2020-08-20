# NgStart

Angular progressive web app starter.

- Features in [CHANGELOG.md](./CHANGELOG.md)
- Hosted result : [English](https://miaborde.github.io/ng-start/en-US) - [French](https://miaborde.github.io/ng-start/fr)

## How to use it

### Run this project on your machine

Get this repo :

```bash
# get this repo
git clone https://github.com/mIaborde/ng-start
# move in
cd ng-start
```

Run it with Node.js :

```bash
# run dev mode (en-US)
npm start
```

Run it with Docker or Podman :

```bash
# build image
docker build -t ng-start .
# run container
docker run --name ng-start -d -p 80:80 -p 443:443 ng-start

# OR let npm script build the container and run it, deleted when stopped
npm run container
```

> During build you can see `npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents`, it's normal, fsevents > is just for OSX systems, not required on Linux.

### Internationalization

This app include Angular i18n, see [Angular i18n](https://angular.io/guide/i18n) to know more. I use [ngx-i18nsupport-lib](https://github.com/martinroob/ngx-i18nsupport-lib) to easily update .xlf locale files, thanks to [martinroob](https://github.com/martinroob) for sharing his awesome library !

```bash
# update locale files :
# generate messages.xlf with angular built in i18n
# then auto update messages.fr.xlf from messages.xlf
npm run locale
# update locale files, open dev mode in french
npm run start:fr
# update locale files, open dev mode in english
npm run start:en-US
```

### Make your commits

```bash
# add your changes
git add .
# commit respecting the conventions
npm run gc
# push changes to repo
git push
```

### Deploy a version

Project respect conventional commit, we can generate [CHANGELOG.md](./CHANGELOG.md) automatically on release. Once you create a release the version number in package.json is incremented (see [semantic versioning](https://semver.org)) and a build for Github Pages system is created.

```bash
# increment version number, build demo github pages and generate a CHANGELOG.md
npm run release:major # can be (:major, :minor, :patch)
```

### Performances monitoring

You can follow app performances [here](https://web.dev/measure), this app start with a 99-100 lighthouse score.

```bash
# analyze your angular webpack bundle
npm run analyze
```

### VSCode Chrome debugger

You can easily launch this app in debug mode, you need this [extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome), and Google Chrome. Follow this [guide](https://github.com/microsoft/vscode-recipes/tree/master/Angular-CLI) to know more.

> **Use Chromium instead of Chrome on Linux distros**
>
> create an alias with this command : `sudo ln -s /usr/bin/chromium /usr/bin/google-chrome`, path can be different on your distro !
