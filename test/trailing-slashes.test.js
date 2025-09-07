import assert from "assert";

describe(`packages via trailing slashes`, () => {
  before(() => {
    global.importMapPort.postMessage({
      importMapUrl: new URL(
        "./fixtures/trailing-slashes.importmap",
        import.meta.url,
      ).href,
    });
  });

  it(`can load the pkg entry module`, async () => {
    const pkgIndex = await import("pkg");
    assert.equal(pkgIndex.default, "pkg index");
  });

  it(`can load submodules of pkg`, async () => {
    const pkgFile = await import("pkg/pkg-file.js");
    assert.equal(pkgFile.default, "pkg file");
  });

  it(`can load modules with @ in their name`, async () => {
    const pkgFile = await import("@scope/foo");
    assert.equal(pkgFile.default, "@scope/foo index");
  });

  it(`can load submodules of packages with @ in their name`, async () => {
    const pkgFile = await import("@scope/foo/bar.js");
    assert.equal(pkgFile.default, "@scope/foo bar");
  });
});
