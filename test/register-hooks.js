import { register } from "node:module";
import { MessageChannel } from "node:worker_threads";

const messageChannel = new MessageChannel();

global.importMapPort = messageChannel.port1;

register("../lib/node-import-map-loader.js", import.meta.url, {
  data: {
    port: messageChannel.port2,
  },
  transferList: [messageChannel.port2],
});
