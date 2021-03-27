const { fetcher, url } = require("../utils");
const cheerio = require("cheerio");

module.exports = async () => {
  try {
    const fetchUrl = url(__filename);
    const html = await fetcher(fetchUrl);

    const $ = cheerio.load(html);
    const h3 = $("h3");

    return [
      ...h3.map((i, el) => {
        const title = $(el).text().trim();

        let text = "";
        el = $(el);
        while ((el = el.next())) {
          if (el.length === 0 || el.prop("tagName") === "H3") break;
          text += el.text() + "\n";
        }

        return { title, text };
      }),
    ];
  } catch (e) {
    console.log(e);
  }
};
