# node-import-map-loader

A [nodejs loader](https://nodejs.org/dist/latest-v13.x/docs/api/esm.html#esm_experimental_loaders) for [import maps](https://github.com/WICG/import-maps). This allows you to customize module resolution by creating a `node.importmap` file.

## Installation

```sh
npm install @node-loader/import-maps
```

## Usage

Create a file `node.importmap` in the current working directory:

```json
{
  "imports": {
    "my-module": "file:///Users/name/code/my-module.js"
  }
}
```

Now create a file that imports the mapped module:

```js
import "my-module";
```

Now run node with the `--experimental-loader` flag:

```sh
node --experimental-loader node-import-map-loader file.js
```
