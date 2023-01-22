"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const GOOGLE_CONSTANT_1 = __importDefault(require("../constant/GOOGLE_CONSTANT"));
const utils_1 = require("../utils/utils");
/**
 * Return google images url from lens.google.com inverse search image engine
 * @param url
 * @param extraHeader
 * @returns
 */
function inverseGetGoogleImageURL(url, proxy, formData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (formData) {
            //we send the image buffer to google
            const data = (yield axios_1.default.post(url, formData, Object.assign({ headers: Object.assign(Object.assign({}, GOOGLE_CONSTANT_1.default.headers), formData.getHeaders()) }, (proxy !== null && proxy !== void 0 ? proxy : {})))).data;
            //we need to get the google lens url generated
            url = data.match(/https:\/\/lens.google.com\/[^"]+/gi)[0];
        }
        //we scrap google lens to get the original google image search
        const data = (yield axios_1.default.get(url, Object.assign({ headers: GOOGLE_CONSTANT_1.default.headers }, (proxy !== null && proxy !== void 0 ? proxy : {})))).data;
        const urlStr = data.match(/https:\/\/www.google.com\/search\?q[^"]+/gi)[0];
        return ((0, utils_1.unicodeToChar)(urlStr) +
            "&" +
            Object.entries(GOOGLE_CONSTANT_1.default.forceGoogleImage).flat().join("="));
    });
}
exports.default = inverseGetGoogleImageURL;
//# sourceMappingURL=inverseGetGoogleImageURL.js.map