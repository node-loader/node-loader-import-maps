# @node-loader/import-maps

## 2.0.0

- breaking: Rewrite to use new initialization customization hook. Update documentation. 08b56d2 ([#12](https://github.com/node-loader/node-loader-import-maps/pull/12)) by Jolyn

`@node-loader/import-maps` no longer assumes `node.importmap` file path, but instead require explicitly setting the importMap or importMapUrl via [options.data](https://nodejs.org/api/module.html#moduleregisterspecifier-parenturl-options).

`@node-loader/import-maps` no longer uses `@node-loader/core` global variables. It now supports updating the import map by passing in `importMapPort` as data to the initialization hook, and then calling `port.postMessage({importMap})` or `port.postMessage({importMapUrl})`.
