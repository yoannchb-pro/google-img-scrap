import { isImage } from "../utils/utils";
import GOOGLE_CONSTANT from "../constant/GOOGLE_CONSTANT";
import axios from "axios";
import ImageResultItem from "../../types/imageResultItem";

const { FastHTMLParser } = require("fast-html-dom-parser");

/**
 * Parse the html from google image to get the images links
 * @param url
 * @returns
 */
async function parseGoogleImages(url: string): Promise<ImageResultItem[]> {
  const { data } = await axios(url, {
    headers: GOOGLE_CONSTANT.headers,
  });
  const parser = new FastHTMLParser(data);
  const scripts = parser.getElementsByTagName("script");

  const result: ImageResultItem[] = [];

  if (!scripts) return result;

  for (const script of scripts) {
    const body = script.innerHTML;

    if (!isImage(body)) continue;

    //getting image url, height, width, average
    const regex =
      /\["(http[^"]+?)",(\d+),(\d+)\],[\w\d]+?,[\w\d]+?,"rgb\((\d+),(\d+),(\d+)\)"/gi;
    //getting originalUrl, title, id
    const secondRegex = /\[[\w\d]+?,"([^"]+?)","(http[^"]+?)","([^"]+?)"/gi;

    let res = null;
    let secondRes = null;

    while (
      (res = regex.exec(body)) != null &&
      (secondRes = secondRegex.exec(body)) != null
    ) {
      if (
        res.length >= 4 &&
        res[1].match(/http/gi).length < 2 &&
        secondRes.length === 4 &&
        secondRes[2].match(/http/gi).length < 2
      ) {
        const [r, g, b] = [res[4], res[5], res[6]].map((e) => parseInt(e, 10));

        result.push({
          id: secondRes[1],
          title: secondRes[3],
          url: res[1],
          originalUrl: secondRes[2],
          averageColor: `rgb(${r}, ${g}, ${b})`,
          averageColorObject: {
            r,
            g,
            b,
          },
          height: parseInt(res[2], 10),
          width: parseInt(res[3], 10),
        });
      }
    }
  }

  return result;
}

export default parseGoogleImages;
