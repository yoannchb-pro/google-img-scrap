const { GOOGLE_IMG_INVERSE_ENGINE_UPLOAD } = require("../dist");
const fs = require("fs");
const path = require("path");

(async function () {
  const image = fs.readFileSync(
    path.resolve(__dirname, "../assets/demonSlayer.png")
  );
  const test = await GOOGLE_IMG_INVERSE_ENGINE_UPLOAD(image);

  console.log(test, test.result.length);
})();
