import path from "path";
import { promises as fs } from "fs";
import {
  resolveAndComposeImportMap,
  resolveSpecifier,
} from "./import-map-utils.js";

let importMapPromise = getImportMapPromise();

export async function resolve(specifier, context, defaultResolve) {
  const { parentURL = null } = context;
  const importMap = await importMapPromise;
  const importMapUrl = resolveSpecifier(importMap, specifier, parentURL);

  return defaultResolve(importMapUrl ?? specifier, context, defaultResolve);
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
  importMapPromise = promise.then((map) => {
    return resolveAndComposeImportMap(map);
  });
};

function emptyMap() {
  return { imports: {}, scopes: {} };
}
