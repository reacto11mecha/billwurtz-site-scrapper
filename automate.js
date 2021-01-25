const config = require("./config.json");
const { videos, songs } = require("./scrapper");
const { jsonFormatter } = require("./utils");
const path = require("path");
const fs = require("fs");

const outputDir = path.join(__dirname, config.outputDirectory);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

(async function () {
  const songList = await songs();
  const videoList = await videos();

  const all = jsonFormatter({ song: songList, video: videoList });
  const songsJson = jsonFormatter(songList);
  const videoJson = jsonFormatter(videoList);

  Promise.all([
    fs.writeFileSync(path.join(outputDir, "all.json"), all),
    fs.writeFileSync(path.join(outputDir, "songs.json"), songsJson),
    fs.writeFileSync(path.join(outputDir, "videos.json"), videoJson),
  ]).then(() => console.log("File writed"));
})();
