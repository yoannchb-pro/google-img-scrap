const { GOOGLE_IMG_SCRAP } = require("../dist");

//simple example to see if it's working without launching tests
(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
    limit: 5,
  });

  console.log(test, test.result.length);
})();
