const config = require("./config.json");
const { videos, songs, notebook } = require("./scrapper");
const { jsonFormatter } = require("./utils");
const Listr = require("listr");
const path = require("path");
const fs = require("fs");

const outputDir = path.join(__dirname, config.outputDirectory);

const task = new Listr([
  {
    title: "Check Output Directory",
    task: async () =>
      await Promise.all([
        !fs.existsSync(outputDir) && fs.mkdirSync(outputDir),
      ]).then(() => Promise.resolve()),
  },
  {
    title: "Scrapping Songs",
    task: async (ctx) => {
      try {
        const songList = await songs();
        const songsJson = jsonFormatter(songList);

        ctx.song = songList;

        return Promise.all([
          fs.writeFileSync(path.join(outputDir, "songs.json"), songsJson),
        ]).then(() => Promise.resolve("Songs File Writed"));
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
  {
    title: "Scrapping Video",
    task: async (ctx) => {
      try {
        const videoList = await videos();
        const videoJson = jsonFormatter(videoList);

        ctx.video = videoList;

        return Promise.all([
          fs.writeFileSync(path.join(outputDir, "videos.json"), videoJson),
        ]).then(() => Promise.resolve("Video File Writed"));
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
  {
    title: "Scrapping Notebook",
    task: async (ctx) => {
      try {
        const noteList = await notebook();
        const noteJson = jsonFormatter(noteList);

        ctx.note = noteList;

        return Promise.all([
          fs.writeFileSync(path.join(outputDir, "notebook.json"), noteJson),
        ]).then(() => Promise.resolve("Video File Writed"));
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
  {
    title: "Combine All Data",
    task: async (ctx) => {
      const allJson = jsonFormatter({ ...ctx });

      return Promise.all([
        fs.writeFileSync(path.join(outputDir, "all.json"), allJson),
      ]).then(() => Promise.resolve("Combined File Writed"));
    },
  },
]);

task.run();
