import parseGoogleImages from "./core/parseGoogleImages";
import GOOGLE_QUERY from "./constant/query/GOOGLE_QUERY";
import verifyGoogleQuery from "./core/verifyGoogleQuery";
import constructGoogleUrl from "./core/constructGoogleUrl";
import limitResultSize from "./core/limitResultSize";
import Config from "../types/config";
import Results from "../types/results";

async function GOOGLE_IMG_SCRAP(config: Config): Promise<Results> {
  verifyGoogleQuery(config);

  const URL = constructGoogleUrl(config);
  const result = await parseGoogleImages(URL);
  const slicedResult = limitResultSize(config?.limit, result);

  return {
    url: URL,
    result: slicedResult,
  };
}

export { GOOGLE_IMG_SCRAP, GOOGLE_QUERY };
