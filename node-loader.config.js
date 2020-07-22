import importMaps from "./lib/node-import-map-loader";

export default {
  loaders: [
    importMaps({
      importMap: {
        imports: {},
      },
    }),
  ],
};
