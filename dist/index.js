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
exports.GOOGLE_QUERY = exports.GOOGLE_IMG_SCRAP = void 0;
const parseGoogleImages_1 = require("./core/parseGoogleImages");
const GOOGLE_QUERY_1 = require("./constant/query/GOOGLE_QUERY");
exports.GOOGLE_QUERY = GOOGLE_QUERY_1.default;
const verifyGoogleQuery_1 = require("./core/verifyGoogleQuery");
const constructGoogleUrl_1 = require("./core/constructGoogleUrl");
const limitResultSize_1 = require("./core/limitResultSize");
function GOOGLE_IMG_SCRAP(config) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, verifyGoogleQuery_1.default)(config);
        const URL = (0, constructGoogleUrl_1.default)(config);
        const result = yield (0, parseGoogleImages_1.default)(URL);
        const slicedResult = (0, limitResultSize_1.default)(config === null || config === void 0 ? void 0 : config.limit, result);
        return {
            url: URL,
            result: slicedResult,
        };
    });
}
exports.GOOGLE_IMG_SCRAP = GOOGLE_IMG_SCRAP;
//# sourceMappingURL=index.js.map