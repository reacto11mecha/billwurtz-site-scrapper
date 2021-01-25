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
        const released = $(this).find("td:nth-child(1)");
        const anchor = $(this).find("a:nth-child(1)");
        const info = $(this).find("a:nth-child(2)");

        let obj = {
          released: released.text(),
        };

        if (anchor.length > 0) {
          Object.assign(obj, {
            title: anchor.text(),
            link: config.origin + "/" + anchor.attr("href"),
          });
        } else {
          const title = $(this).find("td:nth-child(2)");

          Object.assign(obj, {
            title: title.text(),
          });
        }

        if (info.length > 0) {
          Object.assign(obj, {
            info: info.attr("href"),
          });
        }

        return obj;
      }),
    ];

    return data;
  } catch (e) {
    console.log(e);
  }
};
