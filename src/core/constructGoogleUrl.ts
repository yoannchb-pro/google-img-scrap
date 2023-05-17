import Config from "../types/config";
import GOOGLE_CONSTANT from "../constant/GOOGLE_CONSTANT";
import { buildQuery } from "../utils/utils";
import buildGoogleDorks from "./buildGoogleDork";

/**
 * Construct google url for scrapping
 * @param config
 * @returns
 */
function constructGoogleUrl(config: Config): string {
  const GOOGLE_DORK = buildGoogleDorks(config);
  const CUSTOM_PARAM = config.custom ? `&${config.custom}` : "";
  const SAFE_SEARCH = config.safeSearch ? `&safe=active` : "";

  const QUERY = Object.assign(GOOGLE_CONSTANT.forceGoogleImage, {
    [GOOGLE_CONSTANT.queryParam]: Object.values(config.query || {}).join(","),
    q: GOOGLE_DORK,
  });

  return GOOGLE_CONSTANT.url + buildQuery(QUERY) + CUSTOM_PARAM + SAFE_SEARCH;
}

export default constructGoogleUrl;
