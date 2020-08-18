# NgStart

A try to make a production ready angular progressive web app starter.

- Github Pages [here](https://miaborde.github.io/ng-start)
- Change log [here](./CHANGELOG.md)

## How to use it

### Run this project on your machine

```bash
# get this repo
git clone https://github.com/mIaborde/ng-start
# move in and install dependencies
cd ng-start && npm i
# run this project in dev mode
npm start
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
