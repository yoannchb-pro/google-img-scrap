"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GOOGLE_CONSTANT_1 = __importDefault(require("../constant/GOOGLE_CONSTANT"));
const utils_1 = require("../utils/utils");
const buildGoogleDork_1 = __importDefault(require("./buildGoogleDork"));
/**
 * Construct google url for scrapping
 * @param config
 * @returns
 */
function constructGoogleUrl(config) {
    const GOOGLE_DORK = (0, buildGoogleDork_1.default)(config);
    const CUSTOM_PARAM = config.custom ? `&${config.custom}` : "";
    const SAFE_SEARCH = config.safeSearch ? `&safe=active` : "";
    const QUERY = Object.assign(GOOGLE_CONSTANT_1.default.forceGoogleImage, {
        [GOOGLE_CONSTANT_1.default.queryParam]: Object.values(config.query || {}).join(","),
        q: GOOGLE_DORK,
    });
    return GOOGLE_CONSTANT_1.default.url + (0, utils_1.buildQuery)(QUERY) + CUSTOM_PARAM + SAFE_SEARCH;
}
exports.default = constructGoogleUrl;
//# sourceMappingURL=constructGoogleUrl.js.map