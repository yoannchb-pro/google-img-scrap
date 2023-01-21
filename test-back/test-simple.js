const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require("../src/google-img-scrap");

// console.log(GOOGLE_QUERY);

(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
  });

  console.log(test, test.result.length);
})();
