# NgStart

A try to make a production ready angular progressive web app starter.

- Github Pages [here](https://miaborde.github.io/ng-start)
- Change log [here](./CHANGELOG.md)

## Useful commands

```bash
# run this project
npm run start

# build for github pages
npx ng build --prod --output-path docs --base-href /ng-start/

# conventional commit with cli-tool
npm run gc

# increment version number and generate a CHANGELOG.md (see https://semver.org)
npm run release:major
npm run release:minor
npm run release:patch
```

## VSCode Chrome debugger

You can easily launch this app in debug mode, you need this [extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome), and Google Chrome. Follow this [guide](https://github.com/microsoft/vscode-recipes/tree/master/Angular-CLI) to know more.

> **Use Chromium instead of Chrome on Linux distros**
>
> create an alias with this command : `sudo ln -s /usr/bin/chromium /usr/bin/google-chrome`, path can be different on your distro !
