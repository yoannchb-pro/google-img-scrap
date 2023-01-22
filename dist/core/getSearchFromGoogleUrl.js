"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the search question of a google url
 * @param url
 * @returns
 */
function getSearchFromGoogleUrl(url) {
    const search = /search\?q=([^&]+)/gi.exec(url)[1].split("+").join(" ");
    return decodeURIComponent(search);
}
exports.default = getSearchFromGoogleUrl;
//# sourceMappingURL=getSearchFromGoogleUrl.js.map