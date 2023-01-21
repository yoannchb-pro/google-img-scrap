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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const GOOGLE_CONSTANT_1 = require("../constant/GOOGLE_CONSTANT");
const axios_1 = require("axios");
const { FastHTMLParser } = require("fast-html-dom-parser");
/**
 * Parse the html from google image to get the images links
 * @param url
 * @returns
 */
function parseGoogleImages(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield (0, axios_1.default)(url, {
            headers: GOOGLE_CONSTANT_1.default.headers,
        });
        const parser = new FastHTMLParser(data);
        const scripts = parser.getElementsByTagName("script");
        const result = [];
        if (!scripts)
            return result;
        for (const script of scripts) {
            const body = script.innerHTML;
            if (!(0, utils_1.isImage)(body))
                continue;
            //getting image url, height, width, average
            const regex = /\["(http[^"]+?)",(\d+),(\d+)\],[\w\d]+?,[\w\d]+?,"rgb\((\d+),(\d+),(\d+)\)"/gi;
            //getting originalUrl, title, id
            const secondRegex = /\[[\w\d]+?,"([^"]+?)","(http[^"]+?)","([^"]+?)"/gi;
            let res = null;
            let secondRes = null;
            while ((res = regex.exec(body)) != null &&
                (secondRes = secondRegex.exec(body)) != null) {
                if (res.length >= 4 &&
                    res[1].match(/http/gi).length < 2 &&
                    secondRes.length === 4 &&
                    secondRes[2].match(/http/gi).length < 2) {
                    const [r, g, b] = [res[4], res[5], res[6]].map((e) => parseInt(e, 10));
                    result.push({
                        id: secondRes[1],
                        title: secondRes[3],
                        url: res[1],
                        originalUrl: secondRes[2],
                        averageColor: `rgb(${r}, ${g}, ${b})`,
                        averageColorObject: {
                            r,
                            g,
                            b,
                        },
                        height: parseInt(res[2], 10),
                        width: parseInt(res[3], 10),
                    });
                }
            }
        }
        return result;
    });
}
exports.default = parseGoogleImages;
//# sourceMappingURL=parseGoogleImages.js.map