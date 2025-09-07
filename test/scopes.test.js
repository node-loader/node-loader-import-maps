import assert from "assert";
import fs from "fs";

describe(`basic usage`, () => {
  before(() => {
    global.importMapPort.postMessage({
      importMapUrl: new URL("./fixtures/scopes.importmap", import.meta.url)
        .href,
    });
  });

  it(`uses a scope mapping instead of top level mapping`, async () => {
    const foo = await import("foo");
    assert.equal(foo.version, "overridden");
  });
});
