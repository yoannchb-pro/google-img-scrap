const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('../src/google-img-scrap');

console.log(GOOGLE_QUERY);

(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
        query: {
            TYPE: GOOGLE_QUERY.TYPE.CLIPART,
            DATE: GOOGLE_QUERY.DATE.YEAR,
            COLOR: GOOGLE_QUERY.COLOR.BLACK_AND_WHITE,
            SIZE: GOOGLE_QUERY.SIZE.LARGE,
            LICENCE: GOOGLE_QUERY.LICENCE.COMMERCIAL_AND_OTHER,
            EXTENSION: GOOGLE_QUERY.EXTENSION.JPG
        },
        domains: [],
        custom: "name=content&name2=content2",
        safeSearch: false,
        excludeDomains: []
    });

    console.log(test, test.result.length);
})();