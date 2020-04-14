import path from "path";
import { promises as fs } from "fs";

console.log("here");

let importMapPromise = getImportMapPromise();

export async function resolve(specifier, context, defaultResolve) {
  console.log("resolve", specifier);
  const { parentURL = null } = context;
  const importMap = await importMapPromise;
  const importMapUrl = resolveSpecifier(importMap, specifier, parentURL);
  console.log("import map url", importMapUrl);
  if (importMapUrl) {
    return {
      url: importMapUrl,
    };
  } else {
    return defaultResolve(specifier, context, defaultResolve);
  }
}

async function getImportMapPromise() {
  const importMapPath = path.resolve(process.cwd(), "node.importmap");

  let str;
  try {
    str = await fs.readFile(importMapPath);
  } catch (err) {
    console.warn(`No import map found at ${importMapPath}`);
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
