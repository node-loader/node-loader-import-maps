import path from "path";
import { promises as fs } from "fs";

let importMapPromise = getImportMapPromise();

export async function resolve(specifier, context, defaultResolve) {
  const { parentURL = null } = context;
  const importMap = await importMapPromise;
  const importMapUrl = resolveSpecifier(importMap, specifier, parentURL);
  if (importMapUrl) {
    return {
      url: importMapUrl,
    };
  } else {
    return defaultResolve(specifier, context, defaultResolve);
  }
}

async function getImportMapPromise() {
  const relativePath = process.env.IMPORT_MAP_PATH || "node.importmap";
  const importMapPath = path.resolve(process.cwd(), relativePath);

  let str;
  try {
    str = await fs.readFile(importMapPath);
  } catch (err) {
    return emptyMap();
  }

  let json;
  try {
    json = await JSON.parse(str);
  } catch (err) {
    throw Error(
      `Import map at ${importMapPath} contains invalid json: ${err.message}`
    );
  }

  return resolveAndComposeImportMap(json);
}

global.nodeLoader = global.nodeLoader || {};

global.nodeLoader.setImportMapPromise = function setImportMapPromise(promise) {
  importMapPromise = promise;
};

function resolveAndComposeImportMap(map) {
  // TODO: implement
  return map;
}

function resolveSpecifier(importMap, specifier, parentURL) {
  // TODO: implement
  return importMap.imports[specifier];
}

function emptyMap() {
  return { imports: {}, scopes: {} };
}
