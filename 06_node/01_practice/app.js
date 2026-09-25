import fs from "node:fs";

const watcher = fs.watch("./data.txt", (eventType, filename) => {
    console.log(`Event: ${eventType}`);
    console.log(`Filename: ${filename}`);
});