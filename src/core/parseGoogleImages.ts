import { buildQuery, getStringBetweenStrings, unicodeToChar } from '../utils/utils';
import GOOGLE_CONSTANT from '../constant/GOOGLE_CONSTANT';
import ImageResultItem from '../types/imageResultItem';
import { Impit } from 'impit';
import fs from 'fs';
import Config from '../types/config';
import buildGoogleDorks from './buildGoogleDork';

/**
 * Inspired from googlethis
 * My first impleemeentation is not working anymore beause google ask for cookies now
 * Old version: 1.1.8
 * @param config
 * @returns
 */
async function scrapGoogleImages(config: Config): Promise<string> {
  const CUSTOM_PARAM = config.custom ? `&${config.custom}` : '';
  const SAFE_SEARCH = config.safeSearch ? `&safe=active` : '';
  const GOOGLE_DORK = buildGoogleDorks(config);

  const QUERY = '?' + CUSTOM_PARAM + SAFE_SEARCH;

  const impit = new Impit({
    browser: 'chrome',
    proxyUrl: config?.proxy,
    ignoreTlsErrors: true,
    followRedirects: true,
    timeout: 30_000,
    maxRedirects: 10,
    headers: {
      ...GOOGLE_CONSTANT.headers
    }
  });

  const form_data = new URLSearchParams();

  const payload = [
    [
      [
        'HoAMBc',
        JSON.stringify([
          null,
          null,
          [0, null, 2529, 85, 2396, [], [9429, 9520], [194, 194], false, null, null, 9520],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          [GOOGLE_DORK],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          [null, Object.values(config.query ?? {}).join(','), 'GGwgAA=='],
          null,
          true
        ]),
        null,
        'generic'
      ]
    ]
  ];

  form_data.append('f.req', JSON.stringify(payload));

  console.log(
    `https://www.google.com/_/VisualFrontendUi/data/batchexecute${QUERY}`,
    GOOGLE_DORK,
    JSON.stringify([null, Object.values(config.query ?? {}).join(','), 'GGwgAA=='])
  );
  const response = await impit.fetch(
    `https://www.google.com/_/VisualFrontendUi/data/batchexecute${QUERY}`,

    {
      method: 'POST',
      body: form_data,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        ...GOOGLE_CONSTANT.headers
      }
    }
  );

  return response.text();
}

/**
 * Parse the html from google image to get the images links
 * Inspired from googlethis
 * For old version please check: 1.1.8
 * @param url
 * @returns
 */
async function parseGoogleImages(config: Config): Promise<ImageResultItem[]> {
  const body: string = await scrapGoogleImages(config);

  const res = '[null' + (getStringBetweenStrings(body, '"[null', ']"') || '') + ']';

  const data = JSON.parse(res.replace(/\\"/g, '"').replace(/\\\\"/g, "'"));
  fs.writeFileSync('googleImagesParsed.html', JSON.stringify(data, null, 2));

  const items = data[56]?.[1]?.[0]?.[0]?.[1]?.[0];

  const results = items
    .map((el: any) => {
      const item = el[0]?.[0]?.['444383007'];

      if (!item?.[1]) return;

      const image_data = item[1]?.filter((el: any) => Array.isArray(el));

      const image = image_data?.[1];
      const preview = image_data?.[0];

      const origin = item[1]?.find((el: any) => el?.[2001]);

      if (image && preview && origin)
        return {
          id: item[1][1],
          url: decodeURIComponent(JSON.parse('"' + image[0].replace(/"/g, '"') + '"')),
          width: image[1],
          height: image[2],
          title: origin['2008'][1],
          originalUrl: origin['2003'][2]
        } satisfies ImageResultItem;
    })
    .filter((item: ImageResultItem | undefined): item is ImageResultItem => !!item);

  return results;
}

export default parseGoogleImages;
