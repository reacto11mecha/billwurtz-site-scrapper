const config = require("./config.json");
const { videos, songs } = require("./scrapper");
const path = require("path");
const fs = require("fs");

const outputDir = path.join(__dirname, config.outputDirectory);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

(async function () {
  const songList = await songs();
  const videoList = await videos();

  const all = JSON.stringify({ song: songList, video: videoList }, null, 2);
  const songsJson = JSON.stringify(songList, null, 2);
  const videoJson = JSON.stringify(videoList, null, 2);

  fs.writeFileSync(path.join(outputDir, "all.json"), all);
  fs.writeFileSync(path.join(outputDir, "songs.json"), songsJson);
  fs.writeFileSync(path.join(outputDir, "videos.json"), videoJson);
})();
