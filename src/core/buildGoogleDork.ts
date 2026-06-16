import Config from '../types/config';

/**
 * Show only images with a particular title
 * @param config
 * @returns
 */
function filterByTitlesBuilder(config: Config): string {
  return config.filterByTitles && config.filterByTitles.length > 0
    ? '(' + config.filterByTitles.map(title => `intitle:"${title}"`).join(' OR ') + ')'
    : '';
}

/**
 * Show only images without some specific words
 * @param config
 * @returns
 */
function excludeWordsBuilder(config: Config): string {
  const EXCLUDE_WORDS = [];
  if (config.excludeWords) {
    for (const excludeWord of config.excludeWords) {
      EXCLUDE_WORDS.push(`-"${excludeWord}"`);
    }
  }
  return EXCLUDE_WORDS.join(' ');
}

/**
 * Show only images of some particular domains
 * @param config
 * @returns
 */
function onlyDomainsBuilder(config: Config): string {
  const DOMAINS = [];
  if (config.domains) {
    for (const domain of config.domains) {
      DOMAINS.push(`site:"${domain}"`);
    }
  }
  return DOMAINS.join(' OR ');
}

/**
 * Don't show images from particular domains
 * @param config
 * @returns
 */
function excludeDomainsBuilder(config: Config): string {
  const EXCLUDE_DOMAINS = [];
  if (config.excludeDomains) {
    for (const excludeDomain of config.excludeDomains) {
      EXCLUDE_DOMAINS.push(`-site:"${excludeDomain}"`);
    }
  }
  return EXCLUDE_DOMAINS.join(' ');
}

/**
 * Only show images with a domain that match a particular regex
 * @param config
 * @returns
 */
function urlMatchBuilder(config: Config): string {
  return config.urlMatch && config.urlMatch.length > 0
    ? '(' + config.urlMatch.map(match => `inurl:"${match}"`).join(' OR ') + ')'
    : '';
}

/**
 * Build google dork string based on the config query
 * @param config
 * @returns
 */
function buildGoogleDorks(config: Config): string {
  return [
    config.search,
    urlMatchBuilder(config),
    excludeWordsBuilder(config),
    excludeDomainsBuilder(config),
    onlyDomainsBuilder(config),
    filterByTitlesBuilder(config)
  ]
    .join(' ')
    .trim();
}

export default buildGoogleDorks;
