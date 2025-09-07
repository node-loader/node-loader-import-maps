# @node-loader/import-maps

[NodeJS customization hooks](https://nodejs.org/api/module.html#customization-hooks) to add support for [import maps](https://github.com/WICG/import-maps) to NodeJS. This allows you to customize module resolution by creating a `node.importmap` file.

## Installation

```sh
npm install --save @node-loader/import-maps
pnpm install --save @node-loader/import-maps
```

## Usage

Create a file (e.g. `node.importmap`) in the current working directory:

```json
{
  "imports": {
    "my-module": "file:///home/name/code/my-module.js"
  }
}
```

Now create a file `main.js` that imports the mapped module:

```js
import "my-module";
```

Now create a [startup module](https://nodejs.org/api/cli.html#--importmodule) `register-hooks.js`:

```js
import { register } from "node:module";
import { MessageChannel } from "node:worker_threads";

const messageChannel = new MessageChannel();

global.importMapPort = messageChannel.port1;

register("@node-loader/import-maps", {
  data: {
    // optional, provides a way to update the import map later on
    port: messageChannel.port2,

    // optional, import map object
    importMap: {
      imports: {},
      scopes: {},
    },

    // optional, file url resolved relative to current working directory
    // This option is ignored if importMap is provided
    importMapUrl: "./node.importmap",
  },
  transferList: [messageChannel.port2],
});
```

Now run main.js with the [`--import`](https://nodejs.org/api/cli.html#--importmodule) NodeJS flag:

To dynamically change the import map after startup, do the following:

```js
global.importMapPort.postMessage({
  // Provide either importMap or importMapUrl, but not both
  importMap: {
    imports: {},
    scopes: {},
  },

  importMapUrl: "./node.importmap",
});
```

```sh
node --import ./register-hooks.js main.js
```
