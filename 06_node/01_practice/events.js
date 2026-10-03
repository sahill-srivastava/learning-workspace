import { EventEmitter } from "node:events";

const emitter = new EventEmitter();

console.log(emitter)

emitter.on("message", () => {
    console.log("hii sahil");
})

emitter.emit("message")


console.log(emitter)