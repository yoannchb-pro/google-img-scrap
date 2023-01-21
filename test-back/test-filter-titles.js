const { GOOGLE_IMG_SCRAP } = require("../dist");

(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
    filterByTitles: [
      ["draw", "white"],
      ["albino", "white"],
    ],
  });

  console.log(test, test.result.length);
})();
