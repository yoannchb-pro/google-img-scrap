import { EXTENSIONS } from '../constant/query/EXTENSIONS';

/**
 * Build the query for url
 * @param query
 * @returns
 */
function buildQuery(query: Record<string, string>) {
  const result = [];
  const params = Object.keys(query);

  for (const param of params) {
    const queryName = param;
    result.push(`${queryName}=${encodeURIComponent(query[param])}`);
  }

  return '?' + result.join('&');
}

/**
 * Transform unicode to char for more visibility and fix invaldie url
 * @param text
 * @returns
 */
function unicodeToChar(text: string) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}

/**
 * Verify the url is an image
 * @param content
 * @returns
 */
function isImage(content = '') {
  return EXTENSIONS.some(extension => content.includes(extension));
}

/**
 * Escape string for regex
 * @param string
 * @returns
 */
function escapeStringRegexp(string: string) {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

/**
 * Get the string between two strings
 * @param data
 * @param start_string
 * @param end_string
 * @returns
 */
function getStringBetweenStrings(data: string, start_string: string, end_string: string) {
  const regex = new RegExp(
    `${escapeStringRegexp(start_string)}(.*?)${escapeStringRegexp(end_string)}`,
    's'
  );
  const match = data.match(regex);
  return match ? match[1] : undefined;
}

export { buildQuery, unicodeToChar, isImage, getStringBetweenStrings };
