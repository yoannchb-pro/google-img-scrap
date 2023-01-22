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
const {
  GOOGLE_IMG_SCRAP,
  GOOGLE_IMG_INVERSE_ENGINE_URL,
  GOOGLE_IMG_INVERSE_ENGINE_UPLOAD,
  GOOGLE_QUERY,
} = require("google-img-scrap");
// OR
import {
  GOOGLE_IMG_SCRAP,
  GOOGLE_IMG_INVERSE_ENGINE_URL,
  GOOGLE_IMG_INVERSE_ENGINE_UPLOAD,
  GOOGLE_QUERY,
} from "google-img-scrap";
```

## Options definition

- "search" `string` what you want to search
- "proxy" `AxiosProxyConfig` configure a proxy with axios proxy
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
  url: 'https://images.google.com/search?tbm=isch&tbs=&q=cats',
  search: "cats",
  result: [
    {
      id: 'K6Qd9XWnQFQCoM',
      title: 'Domestic cat',
      url: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_2x1.jpg',
      originalUrl: 'https://www.nationalgeographic.com/animals/mammals/facts/domestic-cat',
      averageColor: 'rgb(208, 189, 170)',
      averageColorObject: {
        r: 208,
        g: 189,
        b: 170
      },
      height: 1536,
      width: 3072
    },
    {
      id: 'HkevFQZ5DYu7oM',
      title: 'Cat - Wikipedia',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg',
      originalUrl: 'https://en.wikipedia.org/wiki/Cat',
      averageColor: 'rgb(128, 115, 96)',
      averageColorObject: {
        r: 128,
        g: 115,
        b: 96
      },
      height: 2226,
      width: 3640
    },
    ...
  ]
}
```

## How to use ?

## Simple example

Search cats images

```js
const test = await GOOGLE_IMG_SCRAP({
  search: "cats",
});

console.log(test);
```

## Reverse search engine

The second parameter is like GOOGLE_IMG_SCRAP it include all type of options omitting search. (Omit<Config, "search">)

### With an url (cost: 2 request)

```js
const test = await GOOGLE_IMG_INVERSE_ENGINE_URL(
  "https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg",
  { limit: 5 }
);

console.log(test);
```

### With a local image (cost: 3 request)

```js
const imageBuffer = fs.readFileSync("demonSlayer.png");
const test = await GOOGLE_IMG_INVERSE_ENGINE_UPLOAD(imageBuffer, {
  limit: 5,
});

console.log(test);
```

## Custom query

All query options are optional (see below for all the options) and need to be in uppercase. You can combine as much as you want.
Find all possible query options below.

```js
const test = await GOOGLE_IMG_SCRAP({
  search: "cats",
  query: {
    TYPE: GOOGLE_QUERY.TYPE.CLIPART,
    LICENCE: GOOGLE_QUERY.LICENCE.COMMERCIAL_AND_OTHER,
    EXTENSION: GOOGLE_QUERY.EXTENSION.JPG,
  },
});

console.log(test);
```

## Limit result size

```js
const test = await GOOGLE_IMG_SCRAP({
  search: "cats",
  limit: 5,
});

console.log(test);
```

## Proxy

See axios documentation to setup the proxy

```js
const test = await GOOGLE_IMG_SCRAP({
  search: "cats",
  proxy: {
    protocol: "https",
    host: "example.com",
    port: 8080,
  },
});

console.log(test);
```

## Domains

Only scrap from a specific domain

```js
const test = await GOOGLE_IMG_SCRAP({
  search: "cats",
  domains: ["alamy.com", "istockphoto.com", "vecteezy.com"],
});

console.log(test);
```

## Exclude domains

```js
const test = await GOOGLE_IMG_SCRAP({
  search: "cats",
  excludeDomains: ["istockphoto.com", "alamy.com"],
});

console.log(test);
```

## Exclude words

If you don' like black cats and white cats

```js
const test = await GOOGLE_IMG_SCRAP({
  search: "cats",
  excludeWords: ["black", "white"], //If you don't like black cats and white cats
});

console.log(test);
```

## Safe search (no nsfw)

```js
const test = await GOOGLE_IMG_SCRAP({
  search: "cats",
  safeSearch: false,
});

console.log(test);
```

## Custom query params

```js
const test = await GOOGLE_IMG_SCRAP({
  search: "cats",
  custom: "name=content&name2=content2",
});

console.log(test);
```

## How urlMatch and filterByTitles work ?

```js
const test = await GOOGLE_IMG_SCRAP({
  search: "cats",
  //will build something like this "(draw and white) or (albino and white)"
  filterByTitles: [
    ["draw", "white"],
    ["albino", "white"],
  ],
  //will build something like this "(cdn and wikipedia) or (cdn istockphoto)"
  urlMatch: [
    ["cdn", "wikipedia"],
    ["cdn", "istockphoto"],
  ],
});

console.log(test);
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
