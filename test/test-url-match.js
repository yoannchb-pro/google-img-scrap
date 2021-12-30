const { GOOGLE_IMG_SCRAP } = require('../src/google-img-scrap');

(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
        urlMatch: [
            ["cdn"],
            ["istockphoto"]
        ],
        execute: function(element){
            if(!element.url.match('gstatic.com')) return element;
        }
    });

    console.log(test, test.result.length);
})();