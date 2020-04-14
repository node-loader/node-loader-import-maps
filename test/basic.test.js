import assert from "assert";
import { version } from "./fixtures/foo.js";

describe(`basic usage`, () => {
  it(`overrides the default nodejs resolution`, () => {
    console.log("version", version);
    assert.equal(version, "overridden");
  });
});
