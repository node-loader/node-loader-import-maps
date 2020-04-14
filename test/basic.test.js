import assert from "assert";
import { version } from "./fixtures/foo.js";

describe(`basic usage`, () => {
  it(`overrides the default nodejs resolution`, () => {
    assert.equal(version, "overridden");
  });
});
