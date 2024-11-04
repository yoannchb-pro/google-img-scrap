import Config from '../types/config';
import GoogleQuery from '../types/googleQuery';
import GOOGLE_QUERY from '../constant/query/GOOGLE_QUERY';

/**
 * Validation of the query passed as argument
 * @param config
 */
function verifyGoogleQuery(config: Config) {
  if (config.excludeDomains && config.domains)
    throw new Error("Can not set 'excludeDomains' and 'domains' as same times");

  if (!config.search || config.search.trim() == '') throw new Error("'search' can not be empty");

  if (config.query) {
    const queryToVerify = Object.keys(GOOGLE_QUERY);

    for (const key of Object.keys(config.query) as (keyof GoogleQuery)[]) {
      if (!queryToVerify.includes(key)) throw new Error(`Invalide query name '${key}'`);

      const VALUES = Object.values(GOOGLE_QUERY[key]);
      const ACTUAL_VALUE = config.query[key] ?? '';
      if (!VALUES.includes(ACTUAL_VALUE))
        throw new Error(`'${ACTUAL_VALUE}' is not a valide argument for the query : '${key}'`);
    }
  }
}

export default verifyGoogleQuery;
