import { unicodeToChar } from '../utils/utils';
import GOOGLE_CONSTANT from '../constant/GOOGLE_CONSTANT';
import axios, { AxiosProxyConfig, AxiosError } from 'axios';
import ImageResultItem from '../types/imageResultItem';

// Constants for retry logic
const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000; // 1 second
const MAX_DELAY = 30000; // 30 seconds

/**
 * Sleep function to add delay between requests
 * @param ms milliseconds to sleep
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Scrap google images scripts tag with retry logic
 * @param url
 * @returns
 */
async function scrapGoogleImages(url: string, proxy?: AxiosProxyConfig) {
  let retries = 0;
  let delay = INITIAL_DELAY;

  while (retries < MAX_RETRIES) {
    try {
      const { data } = await axios(url, {
        headers: GOOGLE_CONSTANT.headers,
        ...(proxy ?? {})
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 429) {
        retries++;
        if (retries === MAX_RETRIES) {
          throw new Error('Too many requests. Please try again later.');
        }

        // Exponential backoff with jitter
        const jitter = Math.random() * 1000;
        delay = Math.min(delay * 2 + jitter, MAX_DELAY);
        await sleep(delay);
        continue;
      }

      throw error;
    }
  }
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
  proxy?: AxiosProxyConfig
): Promise<ImageResultItem[]> {
  const result: ImageResultItem[] = [];

  try {
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse Google images: ${error.message}`);
    }
    throw error;
  }
}

export default parseGoogleImages;
