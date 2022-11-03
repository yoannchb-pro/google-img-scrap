const { GOOGLE_IMG_SCRAP } = require("../src/google-img-scrap");
const V107 = require("../src/back/google-img-scrap-1.0.7-.js");

// console.log(GOOGLE_QUERY);

(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
  });

  const test2 = await V107.GOOGLE_IMG_SCRAP({
    search: "cats",
    execute: function (element) {
      if (!element.url.match("gstatic.com")) return element;
    },
  });

  console.log(test.result.length, test2.result.length);
})();
