const got = require("got");
const { FastHTMLParser } = require("fast-html-dom-parser");

const { GOOGLE_CONSTANT } = require("../constant/GOOGLE_CONSTANT");
const { GOOGLE_QUERY } = require("../constant/query/GOOGLE_QUERY");
const EXTENSIONS = require("../constant/extensions/IMAGES_EXTENSIONS.json");

const { buildQuery, unicodeToChar } = require("../utils/UTILS");

/**
 * Validation of the arguments passed
 * @param {import("../../types").Config} config
 */
function verify(config) {
  if (config.excludeDomains && config.domains)
    throw "Can not set 'excludeDomains' and 'domains' as same times";

  if (!config.search || config.search.trim() == "")
    throw "'search' can not be empty";

  if (config.query) {
    const queryToVerify = Object.keys(GOOGLE_QUERY);

    for (const key of Object.keys(config.query)) {
      if (!queryToVerify.includes(key)) throw `Invalide query name '${key}'`;

      const VALUES = Object.values(GOOGLE_QUERY[key]);
      const ACTUAL_VALUE = config.query[key];
      if (!VALUES.includes(ACTUAL_VALUE))
        throw `'${ACTUAL_VALUE}' is not a valide argument for the query : '${key}'`;
    }
  }
}

/**
 * Verifify the url is an image
 * @param {string} content
 * @returns {boolean}
 */
function containImage(content = "") {
  return EXTENSIONS.some((extension) => content.includes(extension));
}

/**
 *Parse the html from google image to get the images links
 * @param {string} url
 * @returns {import("../../types").FinalResult[]}
 */
async function parse(url) {
  const result = [];

  const response = await got(url, {
    headers: GOOGLE_CONSTANT.headers,
  });
  const parser = new FastHTMLParser(response.body);

  const scripts = parser.getElementsByTagName("script");

  if (!scripts) return result;

  for (const script of scripts) {
    const body = script.innerHTML;

    const valide = containImage(body);

    if (valide) {
      const regex = /\["(http.+?)",(\d+),(\d+)\]/gi;

      let res = null;

      while ((res = regex.exec(body)) != null) {
        if (res.length >= 4 && res[1].match(/http/gi).length < 2)
          result.push({
            url: unicodeToChar(res[1]),
            height: res[2],
            width: res[3],
          });
      }
    }
  }

  return result;
}

/**
 * Main function to build google image dork URL
 * @param {import("../../types").Config} config
 * @returns {import("../../types").Results}
 */
async function GOOGLE_IMG_SCRAP(config = {}) {
  verify(config);

  //exclude domains
  const EXCLUDE_DOMAINS = [];
  if (config.excludeDomains)
    config.excludeDomains.forEach((domain) =>
      EXCLUDE_DOMAINS.push(`-site:"${domain}"`)
    );

  //domains
  const DOMAINS = [];
  if (config.domains)
    config.domains.forEach((domain) => DOMAINS.push(`site:"${domain}"`));

  //exclude words
  const EXCLUDE_WORDS = [];
  if (config.excludeWords)
    config.excludeWords.forEach((word) => EXCLUDE_WORDS.push(`-"${word}"`));

  //filter by titles
  const FILTER_TITLE = [];
  if (config.filterByTitles)
    config.filterByTitles.forEach((titleFilter) => {
      const value = titleFilter.map((title) => {
        return `intitle:"${title}"`;
      });

      FILTER_TITLE.push(`(${value.join(" AND ")})`);
    });

  //url match words
  const URL_MATCH = [];
  if (config.urlMatch)
    config.urlMatch.forEach((urlMatch) => {
      const value = urlMatch.map((content) => {
        return `inurl:${content}`;
      });

      URL_MATCH.push(`(${value.join(" AND ")})`);
    });

  //building url
  const SEARCH_TERM =
    config.search +
    " " +
    URL_MATCH.join(" OR ") +
    " " +
    FILTER_TITLE.join(" OR ") +
    " " +
    EXCLUDE_WORDS.join(" ") +
    " " +
    EXCLUDE_DOMAINS.join(" ") +
    " " +
    DOMAINS.join(" OR ");

  const SEARCH = encodeURIComponent(SEARCH_TERM.trim());
  const QUERY = Object.assign(GOOGLE_CONSTANT.forceGoogleImage, {
    [GOOGLE_CONSTANT.queryParam]: Object.values(config.query || {}).join(","),
    q: SEARCH,
  });

  const CUSTOM_PARAM = config.custom ? `&${config.custom}` : "";
  const SAFE_SEARCH = config.safeSearch ? `&safe=active` : "";

  const URL =
    GOOGLE_CONSTANT.url + buildQuery(QUERY) + CUSTOM_PARAM + SAFE_SEARCH;

  //parsing
  const result = await parse(URL);

  //excute function
  let finalResult = [];
  if (config.execute)
    result.forEach((element) => {
      const value = config.execute(element);
      if (value) finalResult.push(value);
    });
  else finalResult = result;

  //limit result
  let slicedResult = [];
  const { limit } = config;

  if (limit && limit > 0 && finalResult.length > limit) {
    slicedResult = finalResult.slice(0, limit);
  }
  //result
  return {
    url: URL,
    result: slicedResult.length > 0 ? slicedResult : finalResult,
  };
}

module.exports = { GOOGLE_IMG_SCRAP, GOOGLE_QUERY };
