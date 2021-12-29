const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('../src/google-img-scrap');

(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "demon slayer background hd",
        query: {
            SIZE: GOOGLE_QUERY.SIZE.LARGE,
        },
        domains: ["alphacoders.com"],
        safeSearch: false,
        execute: function(element){
            if(!element.url.match('gstatic.com')) return element;
        }
    });

    console.log(test, test.result[test.result.length-1].url, test.result.length);
})();