import Mocha from "mocha";

const mocha = new Mocha();

mocha.addFile("./test/basic.test.js");
mocha.addFile("./test/scopes.test.js");
mocha.addFile("./test/trailing-slashes.test.js");

mocha.loadFilesAsync().then(() => {
  mocha.run();
});
