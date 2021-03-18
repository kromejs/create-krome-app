# {{ appName }}
![Version](https://img.shields.io/github/package-json/v/{{ author }}/{{ appName }}?label=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> {{ description }}

## Usage
By default, content script would be injected manually. If you want it to be loaded automatically, modify `manifest.json` with:
```json
"content_scripts": [
  {
    "matches": ["https://*/*"],
    "js": ["content.js"]
  }
],
```

## Development

```sh
yarn start
yarn build
yarn bump
```

## Author

👤 **{{ author }}**

* Website: 
* Twitter: [@{{ author }}](https://twitter.com/{{ author }})
* Github: [@{{ author }}](https://github.com/{{ author }})
* LinkedIn: [@{{ author }}](https://linkedin.com/in/{{ author }})

## Show your support

Give a ⭐️ if this project helped you!
