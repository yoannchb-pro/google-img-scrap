# Google-img-scrap

Scrap images from google images with customs pre filled dorking options

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
const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require("google-img-scrap");
```

## Query Params

- "search" `string` what you want to search
- "execute" `(element: FinalResult) => FinalResult | undefined` allow you to execute a function to filter results
- "excludeWords" `string[]` exclude some words from the search
- "domains" `string[]` filter by domains
- "excludeDomains" `string[]` exclude some domains
- "safeSearch" `boolean` active safe search or not for nsfw for example
- "custom" `string` add extra query
- "urlMatch" `string[][]` get image when an url match a string (example: "cdn") | `example below`
- "filterByTitles" `string[][]` filter images by titles | `example below`
- "query" `GoogleQuery` set a query (can be [TYPE, DATE, COLOR, SIZE, LICENCE, EXTENSION]) (use GOOGLE_QUERY items | `example below`
- "limit" `number` to limit the size of the results

## Result

```js
{
  url: 'https://images.google.com/search?tbm=isch&tbs=itp:clipart,qdr:y,ic:gray,isz:l,il:ol,ift:jpg&q=cats%20%20%20-%22black%22%20-%22white%22&name=content&name2=content2',
  result: [
    {
      id: "HA6fW6faerBfPM",
      title: "CAT eating a fish",
      originalUrl: "https://media.gettyimages.com/vectors/cat-article.html",
      url: 'https://media.gettyimages.com/vectors/cat-eating-fish-vector-id1216628506',
      averageColor: "rgb(241, 25, 60)",
      averageColorObject: { r: 241, g: 25, b: 60},
      height: 1024,
      width: 1024
    },
    {
      id: "OPSfyUtrsrYUI",
      title: "Cat",
      originalUrl: "https://www.ariatrade.gr/images/products/2021/10/article.html",
      url: 'https://www.ariatrade.gr/images/products/2021/10/110294_1.jpg',
      averageColor: "rgb(201, 250, 65)",
      averageColorObject: { r: 201, g: 250, b: 65},
      height: 768,
      width: 1024
    },
    ...
  ]
}
```

## How to use ?

**NOTE**: For the query parameter you need to set the name in upper case !

## Simple example

Search cats images

```js
(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
  });

  console.log(test);
})();
```

## Filtering

```js
(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "demon slayer background hd",
    execute: function (element) {
      if (element.url.length < 20) return element;
    },
  });

  console.log(test);
})();
```

## Custom query

All query options are optional (see below for all the options)

```js
(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
    query: {
      TYPE: GOOGLE_QUERY.TYPE.CLIPART,
      DATE: GOOGLE_QUERY.DATE.YEAR,
      COLOR: GOOGLE_QUERY.COLOR.BLACK_AND_WHITE,
      SIZE: GOOGLE_QUERY.SIZE.LARGE,
      LICENCE: GOOGLE_QUERY.LICENCE.COMMERCIAL_AND_OTHER,
      EXTENSION: GOOGLE_QUERY.EXTENSION.JPG,
    },
  });

  console.log(test);
})();
```

## Limit result size

```js
(async function () {
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
(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
    domains: ["alamy.com", "istockphoto.com", "vecteezy.com"],
  });

  console.log(test);
})();
```

## Exclude domains

```js
(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
    excludeDomains: ["istockphoto.com", "alamy.com"],
  });

  console.log(test);
})();
```

## Exclude words

If you don' like black cats and white cats

```js
(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
    excludeWords: ["black", "white"], //If you don't like black cats and white cats
  });

  console.log(test);
})();
```

## Safe search (no nsfw)

```js
(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
    safeSearch: false,
  });

  console.log(test);
})();
```

## Custom query params

```js
(async function () {
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
(async function () {
  const test = await GOOGLE_IMG_SCRAP({
    search: "cats",
    //will build something like this "(draw and white) or (albino and white)"
    filterByTitles: [
      ["draw", "white"],
      ["albino", "white"],
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
