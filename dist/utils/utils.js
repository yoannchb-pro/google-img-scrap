"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isImage = exports.unicodeToChar = exports.buildQuery = void 0;
const IMAGES_EXTENSIONS_json_1 = __importDefault(require("../constant/extensions/IMAGES_EXTENSIONS.json"));
/**
 * Build the query for url
 * @param query
 * @returns
 */
function buildQuery(query) {
    const result = [];
    const params = Object.keys(query);
    for (const param of params) {
        const queryName = param;
        result.push(`${queryName}=${encodeURIComponent(query[param])}`);
    }
    return "?" + result.join("&");
}
exports.buildQuery = buildQuery;
/**
 * Transform unicode to char for more visibility and fix invaldie url
 * @param text
 * @returns
 */
function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    });
}
exports.unicodeToChar = unicodeToChar;
/**
 * Verify the url is an image
 * @param content
 * @returns
 */
function isImage(content = "") {
    return IMAGES_EXTENSIONS_json_1.default.some((extension) => content.includes(extension));
}
exports.isImage = isImage;
//# sourceMappingURL=utils.js.map