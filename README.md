# Google-img-scrap v1.0.6

Scrap images from google image with lot of tools and options.

## Update

- See [changelog](CHANGELOG.md)

## Found a bug ?

- Tell it in my github issues dont be afraid :)

## Installation

```
npm i google-img-scrap
```

## Import

- NPM

```js
const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('google-img-scrap');
```

- From GITHUB

```js
const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('./src/google-img-scrap');
```

## Params

- "search" (String) what you want to search
- "execute" (Function) allow you to execute a function to remove "gstatic.com" domains for example
- "excludeWords" (Array of String) exclude some words from the search
- "domains" (Array of String) filter by domains
- "excludeDomains" (Array of String) exclude some domains
- "safeSearch" (Boolean) active safe search or not for nsfw for example
- "custom" (String) add extra query
- "urlMatch" (Array of Array) get image when an url match a string (example: "cdn") | ```example below```
- "filterByTitles" (Array of Array) filter images by titles | ```example below```
- "query" (Object) set a query (can be [TYPE, DATE, COLOR, SIZE, LICENCE, EXTENSION]) (use GOOGLE_QUERY items | ```example below```
- "limit" (Int) to limit the size of the results

## Result

```js
}
{
  url: 'https://images.google.com/search?tbm=isch&tbs=itp:clipart,qdr:y,ic:gray,isz:l,il:ol,ift:jpg&q=cats',
  result: [
    {
      url: 'https://media.istockphoto.com/vectors/black-cats-set-vector-id599123506',
      height: '806',
      width: '1024'
    },
    {
      url: 'https://media.istockphoto.com/vectors/cats-vector-id455327075',
      height: '860',
      width: '1024'
    },
    {
      url: 'https://media.istockphoto.com/vectors/purring-cats-vector-silhouette-vector-id165749810?s=2048x2048',
      height: '1895',
      width: '2048'
    },
    ...
  ]
}
```

## How to use ?

- For the query parameter you need to set the name in upper case !

```js
const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('google-img-scrap');

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
        limit: 5,
        domains: ["alamy.com", "istockphoto.com", "vecteezy.com"],
        excludeWords: ["black", "white"], //If you don't like black and white cats
        custom: "name=content&name2=content2",
        safeSearch: false,
        // excludeDomains: ["istockphoto.com", "alamy.com"]
    });

    console.log(test, test.result.length);
})();
```

OR ALSO

```js
const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('google-img-scrap');

(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
    });

    console.log(test, test.result.length);
})();
```

## Removing gstatic.com

```js
const { GOOGLE_IMG_SCRAP , GOOGLE_QUERY } = require('google-img-scrap');

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
```

## How urlMatch and filterByTitles work ?

- urlMatch work like filterByTiles

```js
const { GOOGLE_IMG_SCRAP } = require('google-img-scrap');

(async function(){
    const test = await GOOGLE_IMG_SCRAP({
        search: "cats",
        //will build something like this "(draw and white) or (albino and white)"
        filterByTitles: [
            ["draw", "white"],
            ["albino", "white"]
        ],
        execute: function(element){
            if(!element.url.match('gstatic.com')) return element;
        }
    });

    console.log(test, test.result.length);
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
