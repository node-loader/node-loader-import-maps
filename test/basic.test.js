import assert from "assert";
import fs from "fs";

describe(`basic usage`, () => {
  before(() => {
    global.nodeLoader.setImportMapPromise(
      Promise.resolve().then(async () => {
        const str = await fs.promises.readFile(
          "./test/fixtures/basic.importmap"
        );
        return JSON.parse(str);
      })
    );
  });

  it(`overrides the default nodejs resolution`, async () => {
    const foo = await import("./fixtures/foo.js");
    assert.equal(foo.version, "overridden");
  });

  it(`cannot override a cjs file`, async () => {
    const something = await import("./fixtures/something.cjs");
    assert.equal(something.version, "default");
  });

  it(`can override a bare specifier in node-modules`, async () => {
    const leftPad = await import("left-pad");
    assert.equal(leftPad.default, "overridden");
  });

  it(`can override a bare specifier not in node_modules`, async () => {
    const thing = await import("thing");
    assert.equal(thing.default, "thing");
  });
});
