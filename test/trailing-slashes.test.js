import assert from "assert";
import fs from "fs";

describe(`packages via trailing slashes`, () => {
  before(() => {
    global.nodeLoader.setImportMapPromise(
      Promise.resolve().then(async () => {
        const str = await fs.promises.readFile(
          "./test/fixtures/trailing-slashes.importmap",
          "utf-8"
        );
        return JSON.parse(str);
      })
    );
  });

  it(`can load the pkg entry module`, async () => {
    console.log("loading pkg index");
    const pkgIndex = await import("pkg");
    assert.equal(pkgIndex.default, "pkg index");
  });

  it(`can load submodules of pkg`, async () => {
    console.log("loading pkg file");
    const pkgFile = await import("pkg/pkg-file.js");
    assert.equal(pkgFile.default, "pkg file");
  });
});
