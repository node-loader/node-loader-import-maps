import assert from "node:assert";
import { URL } from "node:url";

describe(`basic usage`, () => {
  before(() => {
    global.importMapPort.postMessage({
      importMapUrl: new URL("./fixtures/basic.importmap", import.meta.url).href,
    });
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
