import FormData from "form-data";

import parseGoogleImages from "./core/parseGoogleImages";
import verifyGoogleQuery from "./core/verifyGoogleQuery";
import constructGoogleUrl from "./core/constructGoogleUrl";
import limitResultSize from "./core/limitResultSize";

import Config from "./types/config";
import Results from "./types/results";

import GOOGLE_QUERY from "./constant/query/GOOGLE_QUERY";
import GOOGLE_CONSTANT from "./constant/GOOGLE_CONSTANT";
import inverseGetGoogleImageURL from "./core/inverseGetGoogleImageURL";
import getSearchFromGoogleUrl from "./core/getSearchFromGoogleUrl";

/**
 * Inverse google image search engine with image buffer
 * @param imageData
 * @param proxy
 * @returns
 */
async function GOOGLE_IMG_INVERSE_ENGINE_UPLOAD(
  imageData: Buffer,
  config?: Omit<Config, "search">
): Promise<Results> {
  const formData = new FormData();
  formData.append("encoded_image", imageData);

  const URL_LENS = GOOGLE_CONSTANT.inverse.upload;
  const GOOGLE_IMG_URL = await inverseGetGoogleImageURL(
    URL_LENS,
    config?.proxy,
    formData
  );
  return GOOGLE_IMG_SCRAP({
    search: getSearchFromGoogleUrl(GOOGLE_IMG_URL),
    ...config,
  });
}

/**
 * Inverse google image search engine with an image url
 * @param imageUrl
 * @param proxy
 * @returns
 */
async function GOOGLE_IMG_INVERSE_ENGINE_URL(
  imageUrl: string,
  config?: Omit<Config, "search">
): Promise<Results> {
  const URL_LENS = GOOGLE_CONSTANT.inverse.url + encodeURIComponent(imageUrl);
  const GOOGLE_IMG_URL = await inverseGetGoogleImageURL(
    URL_LENS,
    config?.proxy
  );
  return GOOGLE_IMG_SCRAP({
    search: getSearchFromGoogleUrl(GOOGLE_IMG_URL),
    ...config,
  });
}

/**
 * Search images on google image
 * @param config
 * @returns
 */
async function GOOGLE_IMG_SCRAP(config: Config): Promise<Results> {
  verifyGoogleQuery(config);

  const URL = constructGoogleUrl(config);
  const result = await parseGoogleImages(URL, config?.proxy);
  const slicedResult = limitResultSize(config?.limit, result);

  return {
    url: URL,
    search: config.search,
    result: slicedResult,
  };
}

export {
  GOOGLE_IMG_SCRAP,
  GOOGLE_IMG_INVERSE_ENGINE_URL,
  GOOGLE_IMG_INVERSE_ENGINE_UPLOAD,
  GOOGLE_QUERY,
};
