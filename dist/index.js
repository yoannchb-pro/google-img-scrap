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
exports.GOOGLE_QUERY = exports.GOOGLE_IMG_INVERSE_ENGINE_UPLOAD = exports.GOOGLE_IMG_INVERSE_ENGINE_URL = exports.GOOGLE_IMG_SCRAP = void 0;
const form_data_1 = __importDefault(require("form-data"));
const parseGoogleImages_1 = __importDefault(require("./core/parseGoogleImages"));
const verifyGoogleQuery_1 = __importDefault(require("./core/verifyGoogleQuery"));
const constructGoogleUrl_1 = __importDefault(require("./core/constructGoogleUrl"));
const limitResultSize_1 = __importDefault(require("./core/limitResultSize"));
const GOOGLE_QUERY_1 = __importDefault(require("./constant/query/GOOGLE_QUERY"));
exports.GOOGLE_QUERY = GOOGLE_QUERY_1.default;
const GOOGLE_CONSTANT_1 = __importDefault(require("./constant/GOOGLE_CONSTANT"));
const inverseGetGoogleImageURL_1 = __importDefault(require("./core/inverseGetGoogleImageURL"));
const getSearchFromGoogleUrl_1 = __importDefault(require("./core/getSearchFromGoogleUrl"));
/**
 * Inverse google image search engine with image buffer
 * @param imageData
 * @param proxy
 * @returns
 */
function GOOGLE_IMG_INVERSE_ENGINE_UPLOAD(imageData, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const formData = new form_data_1.default();
        formData.append("encoded_image", imageData);
        const URL_LENS = GOOGLE_CONSTANT_1.default.inverse.upload;
        const GOOGLE_IMG_URL = yield (0, inverseGetGoogleImageURL_1.default)(URL_LENS, config === null || config === void 0 ? void 0 : config.proxy, formData);
        return GOOGLE_IMG_SCRAP(Object.assign({ search: (0, getSearchFromGoogleUrl_1.default)(GOOGLE_IMG_URL) }, config));
    });
}
exports.GOOGLE_IMG_INVERSE_ENGINE_UPLOAD = GOOGLE_IMG_INVERSE_ENGINE_UPLOAD;
/**
 * Inverse google image search engine with an image url
 * @param imageUrl
 * @param proxy
 * @returns
 */
function GOOGLE_IMG_INVERSE_ENGINE_URL(imageUrl, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const URL_LENS = GOOGLE_CONSTANT_1.default.inverse.url + encodeURIComponent(imageUrl);
        const GOOGLE_IMG_URL = yield (0, inverseGetGoogleImageURL_1.default)(URL_LENS, config === null || config === void 0 ? void 0 : config.proxy);
        return GOOGLE_IMG_SCRAP(Object.assign({ search: (0, getSearchFromGoogleUrl_1.default)(GOOGLE_IMG_URL) }, config));
    });
}
exports.GOOGLE_IMG_INVERSE_ENGINE_URL = GOOGLE_IMG_INVERSE_ENGINE_URL;
/**
 * Search images on google image
 * @param config
 * @returns
 */
function GOOGLE_IMG_SCRAP(config) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, verifyGoogleQuery_1.default)(config);
        const URL = (0, constructGoogleUrl_1.default)(config);
        const result = yield (0, parseGoogleImages_1.default)(URL, config === null || config === void 0 ? void 0 : config.proxy);
        const slicedResult = (0, limitResultSize_1.default)(config === null || config === void 0 ? void 0 : config.limit, result);
        return {
            url: URL,
            search: config.search,
            result: slicedResult,
        };
    });
}
exports.GOOGLE_IMG_SCRAP = GOOGLE_IMG_SCRAP;
//# sourceMappingURL=index.js.map