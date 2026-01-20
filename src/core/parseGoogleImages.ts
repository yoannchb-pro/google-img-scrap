import { unicodeToChar } from '../utils/utils';
import GOOGLE_CONSTANT from '../constant/GOOGLE_CONSTANT';
import axios from 'axios';
import ImageResultItem from '../types/imageResultItem';
import { HttpsProxyAgent } from 'https-proxy-agent';

/**
 * Scrap google images scripts tag
 * @param url
 * @returns
 */
async function scrapGoogleImages(url: string, proxy?: HttpsProxyAgent<any>) {
  const { data } = await axios(url, {
    headers: GOOGLE_CONSTANT.headers,
    httpsAgent: proxy
  });

  return data;
}

/**
 * Construct the final object image from regex match with all informations
 * @param informationsMatch
 * @param otherInformationsMatch
 * @returns
 */
function getGoogleImageObject(
  informationsMatch: RegExpExecArray,
  otherInformationsMatch: RegExpExecArray
) {
  return {
    id: otherInformationsMatch[1],
    title: otherInformationsMatch[3],
    url: unicodeToChar(informationsMatch[1]),
    originalUrl: otherInformationsMatch[2],
    height: parseInt(informationsMatch[2], 10),
    width: parseInt(informationsMatch[3], 10)
  };
}

/**
 * Parse the html from google image to get the images links
 * @param url
 * @returns
 */
async function parseGoogleImages(
  url: string,
  proxy?: HttpsProxyAgent<any>
): Promise<ImageResultItem[]> {
  const result: ImageResultItem[] = [];

  const body: string = await scrapGoogleImages(url, proxy);

  //getting image url, height, width, color average
  const informationsRegex = /\["(http[^"]+?)",(\d+),(\d+)\]/gi;
  //getting originalUrl, title, id
  const otherInformationsRegex = /\[[\w\d]+?,"([^"]+?)","(http[^"]+?)","([^"]+?)"/gi;

  let informationsMatch: RegExpExecArray;

  while ((informationsMatch = informationsRegex.exec(body)) !== null) {
    if (informationsMatch[1].startsWith('https://encrypted-tbn0.gstatic.com')) continue;

    const otherInformationsMatch = otherInformationsRegex.exec(body);

    if (otherInformationsMatch === null) return result;

    if (informationsMatch.length < 4 || otherInformationsMatch.length < 4) continue;
    if (
      informationsMatch[1].match(/http/gi).length > 2 ||
      otherInformationsMatch[2].match(/http/gi).length > 2
    )
      continue;

    result.push(getGoogleImageObject(informationsMatch, otherInformationsMatch));
  }

  return result;
}

export default parseGoogleImages;
