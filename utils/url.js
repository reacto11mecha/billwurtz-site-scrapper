const config = require("../config.json");

module.exports = (filename) => {
  const split = filename.split("/");
  const jsName = split[split.length - 1];
  const name = jsName.replace(".js", "");

  return config[name];
};
