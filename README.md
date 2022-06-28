# Google-img-scrap v1.0.7

Scrap images from google images with customs pre filled options

## Update

- See [changelog](CHANGELOG.md)

## Found a bug ?

- Tell it in my github issues dont be afraid :)

## Installation

```
npm i google-img-scrap
```

## Import

```js
const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('google-img-scrap');
```

## Query Params

- "search" (String) what you want to search
- "execute" (Function) allow you to execute a function to remove "gstatic.com" domains for example
- "excludeWords" (String[]) exclude some words from the search
- "domains" (String[]) filter by domains
- "excludeDomains" (String[]) exclude some domains
- "safeSearch" (Boolean) active safe search or not for nsfw for example
- "custom" (String) add extra query
- "urlMatch" (String[][]) get image when an url match a string (example: "cdn") | ```example below```
- "filterByTitles" (String[][]) filter images by titles | ```example below```
- "query" (Object) set a query (can be [TYPE, DATE, COLOR, SIZE, LICENCE, EXTENSION]) (use GOOGLE_QUERY items | ```example below```
- "limit" (Int) to limit the size of the results

## Result

```js
{
  url: 'https://images.google.com/search?tbm=isch&tbs=itp:clipart,qdr:y,ic:gray,isz:l,il:ol,ift:jpg&q=cats%20%20%20-%22black%22%20-%22white%22&name=content&name2=content2',
  result: [
    {
      url: 'https://media.gettyimages.com/vectors/cat-eating-fish-vector-id1216628506',
      height: '1024',
      width: '1024'
    },
    {
      url: 'https://www.ariatrade.gr/images/products/2021/10/110294_1.jpg',
      height: '768',
      width: '1024'
    },
    {
      url: 'https://media.gettyimages.com/illustrations/panther-leaping-illustration-id152406879?s=2048x2048',
      height: '2048',
      width: '2048'
    },
    {
      url: 'https://media.gettyimages.com/illustrations/botany-plants-antique-engraving-illustration-erythrina-variegata-illustration-id970781520',
      height: '1024',
      width: '828'
    }
  ]
  ...
}
```

## How to use ?

- **For the query parameter you need to set the name in upper case !**

## Simple example

Search cats images

```js
(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
    });

    console.log(test);
})();
```

## Removing gstatic.com

```js
(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "demon slayer background hd",
        execute: function(element){
            if(!element.url.match('gstatic.com')) return element;
        }
    });

    console.log(test);
})();
```

## Custom query

All query options are optional (see below for all the options)

```js
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
    });

    console.log(test);
})();
```

## Limit result size

```js
(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
        limit: 5,
    });

    console.log(test);
})();
```

## Domains

Only scrap from a specific domain

```js
(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
        domains: ["alamy.com", "istockphoto.com", "vecteezy.com"],
    });

    console.log(test);
})();
```

## Exclude domains

```js
(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
        excludeDomains: ["istockphoto.com", "alamy.com"]
    });

    console.log(test);
})();
```

## Exclude words

If you don' like black cats and white cats

```js
(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
        excludeWords: ["black", "white"], //If you don't like black cats and white cats
    });

    console.log(test, test.result.length);
})();
```

## Safe search (no nsfw)

```js
(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
        safeSearch: false,
    });

    console.log(test);
})();
```

## Custom query params

```js
(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
        custom: "name=content&name2=content2",
    });

    console.log(test);
})();
```

## How urlMatch and filterByTitles work ?

- urlMatch work like filterByTiles

```js
(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
        //will build something like this "(draw and white) or (albino and white)"
        filterByTitles: [
            ["draw", "white"],
            ["albino", "white"]
        ],
    });

    console.log(test);
})();
```

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
