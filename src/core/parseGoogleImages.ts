import { isImage, unicodeToChar } from "../utils/utils";
import GOOGLE_CONSTANT from "../constant/GOOGLE_CONSTANT";
import axios, { AxiosProxyConfig } from "axios";
import ImageResultItem from "../../types/imageResultItem";

const { FastHTMLParser } = require("fast-html-dom-parser");

/**
 * Scrap google images scripts tag
 * @param url
 * @returns
 */
async function scrapGoogleImagesScriptsTag(
  url: string,
  proxy?: AxiosProxyConfig
) {
  const { data } = await axios(url, {
    headers: GOOGLE_CONSTANT.headers,
    ...(proxy ?? {}),
  });

  const parser = new FastHTMLParser(data);
  const scripts = parser.getElementsByTagName("script");

  return scripts;
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
  const [r, g, b] = [
    informationsMatch[4],
    informationsMatch[5],
    informationsMatch[6],
  ].map((e) => parseInt(e, 10));

  return {
    id: otherInformationsMatch[1],
    title: otherInformationsMatch[3],
    url: unicodeToChar(informationsMatch[1]),
    originalUrl: otherInformationsMatch[2],
    averageColor: `rgb(${r}, ${g}, ${b})`,
    averageColorObject: {
      r,
      g,
      b,
    },
    height: parseInt(informationsMatch[2], 10),
    width: parseInt(informationsMatch[3], 10),
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

  const scripts = await scrapGoogleImagesScriptsTag(url, proxy);

  if (!scripts) return result;

  for (const script of scripts) {
    const body = script.innerHTML;

    // if we dont find any image extension we can skip
    if (!isImage(body)) continue;

    //getting image url, height, width, color average
    const informationsRegex =
      /\["(http[^"]+?)",(\d+),(\d+)\],[\w\d]+?,[\w\d]+?,"rgb\((\d+),(\d+),(\d+)\)"/gi;
    //getting originalUrl, title, id
    const otherInformationsRegex =
      /\[[\w\d]+?,"([^"]+?)","(http[^"]+?)","([^"]+?)"/gi;

    let informationsMatch: RegExpExecArray,
      otherInformationsMatch: RegExpExecArray;

    while (
      (informationsMatch = informationsRegex.exec(body)) !== null &&
      (otherInformationsMatch = otherInformationsRegex.exec(body)) !== null
    ) {
      if (informationsMatch.length < 4 || otherInformationsMatch.length < 4)
        continue;
      if (
        informationsMatch[1].match(/http/gi).length > 2 ||
        otherInformationsMatch[2].match(/http/gi).length > 2
      )
        continue;

      result.push(
        getGoogleImageObject(informationsMatch, otherInformationsMatch)
      );
    }

    //if we get the correct scripts with all images we can exit
    if (result.length > 0) return result;
  }

  return result;
}

export default parseGoogleImages;
