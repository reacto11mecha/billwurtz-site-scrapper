const config = require("./config.json");
const path = require("path");

const outputDir = path.join(__dirname, config.outputDirectory);

const task = require("./tasklist")({ outputDir });
task.run();
