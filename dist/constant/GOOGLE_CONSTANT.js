"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GOOGLE_CONSTANT = {
    url: "https://www.google.com/search",
    inverse: {
        base: "https://lens.google.com/",
        upload: "https://lens.google.com/upload",
        url: "https://lens.google.com/uploadbyurl?url=",
    },
    queryParam: "tbs",
    forceGoogleImage: {
        tbm: "isch", //needed to search on google image instead of google
    },
    headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    },
};
exports.default = GOOGLE_CONSTANT;
//# sourceMappingURL=GOOGLE_CONSTANT.js.map