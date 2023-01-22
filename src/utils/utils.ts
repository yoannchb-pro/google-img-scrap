import EXTENSIONS from "../constant/extensions/IMAGES_EXTENSIONS.json";

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

  return "?" + result.join("&");
}

/**
 * Transform unicode to char for more visibility and fix invaldie url
 * @param text
 * @returns
 */
function unicodeToChar(text: string) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
  });
}

/**
 * Verify the url is an image
 * @param content
 * @returns
 */
function isImage(content = "") {
  return EXTENSIONS.some((extension) => content.includes(extension));
}

export { buildQuery, unicodeToChar, isImage };
