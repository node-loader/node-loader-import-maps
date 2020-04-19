import assert from "assert";
import { version as fooVersion } from "./fixtures/foo.js";
import { version as somethingVersion } from "./fixtures/something.cjs";
import leftPad from "left-pad";

describe(`basic usage`, () => {
  it(`overrides the default nodejs resolution`, () => {
    assert.equal(fooVersion, "overridden");
  });

  it(`cannot override a cjs file`, () => {
    assert.equal(somethingVersion, "default");
  });

  it(`can override a bare specifier in node-modules`, () => {
    assert.equal(leftPad, "overridden");
  });
});
