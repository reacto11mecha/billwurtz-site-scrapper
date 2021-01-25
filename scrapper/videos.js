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
        const anchor = $(this).find("a");

        if (anchor.length > 0) {
          const released = $(this).find("td:nth-child(1)").text();

          return {
            title: anchor.text(),
            link: config.origin + "/" + anchor.attr("href"),
            released,
          };
        }
      }),
    ];

    return data;
  } catch (e) {
    console.log(e);
  }
};
