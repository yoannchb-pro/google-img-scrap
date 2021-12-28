# Google-img-scrap v1.0.1
Scrap images from google image with lot of options

## Update

- Added the missing dependencie

## Found a bug ?

- Tell it in my github issues dont be afraid :)

## Installation

```
npm i google-img-scrap
```

## Import

```js
const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('../src/google-img-scrap');
```

## Result

```js
[
    {
        url: "...",
        width: 1920,
        height: 1080
    },
    ...
]
```

## How to use ?

- For the query parameter you need to set the name in upper case !

```js
const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('../src/google-img-scrap');

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
```

OR ALSO

```js
const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('../src/google-img-scrap');

(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
    });

    console.log(test, test.result.length);
})();
```
## Params

- "search" what you want to search
- "domains" filter by domains
- "excludeDomains" exclude some domains
- "safeSearch" active safe search or not
- "custom" add extra query
- "query" set a query (can be [TYPE, DATE, COLOR, SIZE, LICENCE, EXTENSION])

## Google query

```js
{
  SIZE: { 
    LARGE, 
    MEDIUM, 
    ICON 
  },
  COLOR: {
    BLACK_AND_WHITE,
    TRANSPARENT,
    RED,
    BLUE,
    PURPLE,
    ORANGE,
    YELLOW,
    GREEN,
    TEAL,
    PINK,
    WHITE,
    GRAY,
    BLACK,
    BROWN
  },
  TYPE: { 
    CLIPART, 
    DRAW, 
    GIF 
  },
  EXTENSION: {
    JPG,
    GIF,
    BMP,
    PNG,
    SVG,
    WEBP,
    ICO,
    RAW
  },
  DATE: { 
    DAY, 
    WEEK, 
    MONTH, 
    YEAR 
  },
  LICENCE: { 
    CREATIVE_COMMONS, 
    COMMERCIAL_AND_OTHER 
  }
}
```