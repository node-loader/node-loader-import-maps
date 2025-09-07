import { promises as fs } from "node:fs";
import { URL } from "node:url";
import {
  resolveAndComposeImportMap,
  resolveSpecifier,
} from "./import-map-utils.js";

let importMapPromise;

export async function initialize(registerData) {
  importMapPromise = processRegisterData(registerData);

  if (registerData.port) {
    registerData.port.on("message", (data) => {
      importMapPromise = processRegisterData(data);
    });
  }
}

async function processRegisterData(registerData) {
  let importMap;

  if (registerData.importMap) {
    importMap = resolveAndComposeImportMap(registerData.importMap);
  } else if (registerData.importMapUrl) {
    let str;
    try {
      str = await fs.readFile(new URL(registerData.importMapUrl), "utf-8");
    } catch (err) {
      console.error(
        `node-loader-import-maps: error reading import map from path '${registerData.importMapUrl}'`,
      );
      console.error(err);
      throw err;
    }

    let json;
    try {
      json = await JSON.parse(str);
    } catch (err) {
      console.error(err);
      throw Error(
        `Import map at ${registerData.importMapUrl} contains invalid json: ${err.message}`,
      );
    }

    importMap = resolveAndComposeImportMap(json);
  }

  return importMap;
}

export async function resolve(specifier, context, defaultResolve) {
  const importMap = await importMapPromise;

  let importMapUrl;

  if (importMap) {
    const { parentURL = null } = context;
    importMapUrl = resolveSpecifier(importMap, specifier, parentURL);
  }

  return defaultResolve(importMapUrl ?? specifier, context);
}
