import Mocha from "mocha";

const mocha = new Mocha();

mocha.addFile("./test/basic.test.js");

mocha.loadFilesAsync().then(() => {
  mocha.run();
});
