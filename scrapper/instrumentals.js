const config = require("../config.json");
const { fetcher, url } = require("../utils");
const cheerio = require("cheerio");

module.exports = async () => {
  try {
    const fetchUrl = url(__filename);
    const html = await fetcher(fetchUrl);

    const $ = cheerio.load(html);
    const tableContent = $("tbody > tr");

    const data = [
      ...tableContent.map(function () {
        const anchor = $(this).find("a:nth-child(1)");
        const anchorInfo = $(this).find("a:nth-child(2)");

        let obj = {};

        if (anchor.length > 0) {
          const released = $(this).find("td:nth-child(1)").text();

          Object.assign(obj, {
            title: anchor.text(),
            link: config.origin + "/" + anchor.attr("href"),
            released,
          });
        }

        if (anchorInfo.length > 0) {
          Object.assign(obj, {
            songInfo: anchorInfo.attr("href"),
          });
        }

        return obj;
      }),
    ];

    return data.filter((ins) => ins.title !== "").filter((ins) => ins.title);
  } catch (e) {
    console.log(e);
  }
};
