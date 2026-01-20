import parseGoogleImages from './core/parseGoogleImages';
import verifyGoogleQuery from './core/verifyGoogleQuery';
import constructGoogleUrl from './core/constructGoogleUrl';
import limitResultSize from './core/limitResultSize';

import Config from './types/config';
import Results from './types/results';

import GOOGLE_QUERY from './constant/query/GOOGLE_QUERY';

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
    result: slicedResult
  };
}

export { GOOGLE_IMG_SCRAP, GOOGLE_QUERY };
