/**
 * Get the search question of a google url
 * @param url
 * @returns
 */
function getSearchFromGoogleUrl(url: string): string {
  const search = /search\?q=([^&]+)/gi.exec(url)[1].split("+").join(" ");
  return decodeURIComponent(search);
}

export default getSearchFromGoogleUrl;
