/**
 * Build the query for url
 * @param query
 * @returns
 */
declare function buildQuery(query: Record<string, string>): string;
/**
 * Transform unicode to char for more visibility and fix invaldie url
 * @param text
 * @returns
 */
declare function unicodeToChar(text: string): string;
/**
 * Verify the url is an image
 * @param content
 * @returns
 */
declare function isImage(content?: string): boolean;
export { buildQuery, unicodeToChar, isImage };
