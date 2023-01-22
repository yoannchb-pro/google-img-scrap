const { GOOGLE_IMG_INVERSE_ENGINE_URL } = require("../dist");

(async function () {
  const test = await GOOGLE_IMG_INVERSE_ENGINE_URL(
    "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg"
  );

  console.log(test, test.result.length);
})();
