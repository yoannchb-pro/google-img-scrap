const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require('../dist');

(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: 'cats',
    query: {
      TYPE: GOOGLE_QUERY.TYPE.GIF
    },
    limit: 5
  });

  console.log(test, test.result.length);
})();
