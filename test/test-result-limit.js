const { GOOGLE_IMG_SCRAP } = require("../src/google-img-scrap");

(async function () {
  const limit = 5;
  const testNoLimit = await GOOGLE_IMG_SCRAP({
    search: "cats",
    execute: function (element) {
      if (!element.url.match("gstatic.com")) return element;
    },
  });
  const testLimit = await GOOGLE_IMG_SCRAP({
    search: "cats",
    limit,
    execute: function (element) {
      if (!element.url.match("gstatic.com")) return element;
    },
  });
  try {
    console.log(
      `limit : ${limit}, testNoLimit length : ${testNoLimit.result.length}, testLimit length : ${testLimit.result.length}`
    );
  } catch (error) {
    console.log(error);
  }
})();
