# @node-loader/import-maps

A [nodejs loader](https://nodejs.org/dist/latest-v13.x/docs/api/esm.html#esm_experimental_loaders) for [import maps](https://github.com/WICG/import-maps). This allows you to customize module resolution by creating a `node.importmap` file.

## Installation

```sh
npm install --save @node-loader/import-maps

# Or, if you prefer Yarn
yarn add --save @node-loader/import-maps
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
node --experimental-loader @node-loader/import-maps file.js
```

## Configuration

By default, node-loader import maps looks for a configuration file called `node.importmap` in the current working directory. To specify the file path to the configuration file, provide the `IMPORT_MAP_PATH` environment variable:

```sh
IMPORT_MAP_PATH=/Users/name/some/dir/node.importmap node --experimental-loader @node-loader/import-maps file.js
```

## Composition

If you wish to combine import maps with other NodeJS loaders, you may do so by using [node-loader-core](https://github.com/node-loader/node-loader-core).
