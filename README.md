create-krome-app
================

Kick off modern Chrome extension development instantly

[![Version](https://img.shields.io/npm/v/create-krome-app.svg)](https://npmjs.org/package/create-krome-app)
[![License](https://img.shields.io/npm/l/create-krome-app.svg)](https://github.com/kromejs/create-krome-app/blob/master/package.json)

#### Features
- Starter app with [snowpack](https://www.snowpack.dev/)
- Typescript
- Autoload or manually load the content script
- Support [Svelte](https://svelte.dev/)

# Usage
Execute and follow the prompt:
```sh
yarn exec create-krome-app
```
or
```sh
yarn create krome-app
```

To see all options:
```sh
yarn exec create-krome-app -h
```

# Commands

* [`create-krome-app [APPNAME]`](#create-krome-app-appname)

## `create-krome-app [APPNAME]`

Generate the krome starter app

```
USAGE
  $ create-krome-app [APPNAME]

ARGUMENTS
  APPNAME  the app name

OPTIONS
  -a, --author=author              author name
  -f, --framework=framework        framework to use
  -h, --help                       show CLI help
  -t, --templateName=templateName  template to use
  -v, --version                    show CLI version
  --description=description        app description
  --doInstall                      install dependencies
```

_See code: [src/index.ts](src/index.ts)_
