import assert from "assert";
import fs from "fs";

describe(`basic usage`, () => {
  before(() => {
    global.nodeLoader.setImportMapPromise(
      Promise.resolve().then(async () => {
        const str = await fs.promises.readFile(
          "./test/fixtures/scopes.importmap"
        );
        return JSON.parse(str);
      })
    );
  });

  it(`uses a scope mapping instead of top level mapping`, async () => {
    const foo = await import("foo");
    assert.equal(foo.version, "overridden");
  });
});
