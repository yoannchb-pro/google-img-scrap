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
const utils_1 = require("../utils/utils");
const GOOGLE_CONSTANT_1 = __importDefault(require("../constant/GOOGLE_CONSTANT"));
const axios_1 = __importDefault(require("axios"));
const { FastHTMLParser } = require("fast-html-dom-parser");
/**
 * Scrap google images scripts tag
 * @param url
 * @returns
 */
function scrapGoogleImagesScriptsTag(url, proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield (0, axios_1.default)(url, Object.assign({ headers: GOOGLE_CONSTANT_1.default.headers }, (proxy !== null && proxy !== void 0 ? proxy : {})));
        const parser = new FastHTMLParser(data);
        const scripts = parser.getElementsByTagName("script");
        return scripts;
    });
}
/**
 * Construct the final object image from regex match with all informations
 * @param informationsMatch
 * @param otherInformationsMatch
 * @returns
 */
function getGoogleImageObject(informationsMatch, otherInformationsMatch) {
    const [r, g, b] = [
        informationsMatch[4],
        informationsMatch[5],
        informationsMatch[6],
    ].map((e) => parseInt(e, 10));
    return {
        id: otherInformationsMatch[1],
        title: otherInformationsMatch[3],
        url: (0, utils_1.unicodeToChar)(informationsMatch[1]),
        originalUrl: otherInformationsMatch[2],
        averageColor: `rgb(${r}, ${g}, ${b})`,
        averageColorObject: {
            r,
            g,
            b,
        },
        height: parseInt(informationsMatch[2], 10),
        width: parseInt(informationsMatch[3], 10),
    };
}
/**
 * Parse the html from google image to get the images links
 * @param url
 * @returns
 */
function parseGoogleImages(url, proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const scripts = yield scrapGoogleImagesScriptsTag(url, proxy);
        if (!scripts)
            return result;
        for (const script of scripts) {
            const body = script.innerHTML;
            // if we dont find any image extension we can skip
            if (!(0, utils_1.isImage)(body))
                continue;
            //getting image url, height, width, color average
            const informationsRegex = /\["(http[^"]+?)",(\d+),(\d+)\],[\w\d]+?,[\w\d]+?,"rgb\((\d+),(\d+),(\d+)\)"/gi;
            //getting originalUrl, title, id
            const otherInformationsRegex = /\[[\w\d]+?,"([^"]+?)","(http[^"]+?)","([^"]+?)"/gi;
            let informationsMatch, otherInformationsMatch;
            while ((informationsMatch = informationsRegex.exec(body)) !== null &&
                (otherInformationsMatch = otherInformationsRegex.exec(body)) !== null) {
                if (informationsMatch.length < 4 || otherInformationsMatch.length < 4)
                    continue;
                if (informationsMatch[1].match(/http/gi).length > 2 ||
                    otherInformationsMatch[2].match(/http/gi).length > 2)
                    continue;
                result.push(getGoogleImageObject(informationsMatch, otherInformationsMatch));
            }
            //if we get the correct scripts with all images we can exit
            if (result.length > 0)
                return result;
        }
        return result;
    });
}
exports.default = parseGoogleImages;
//# sourceMappingURL=parseGoogleImages.js.map