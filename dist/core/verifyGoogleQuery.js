"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GOOGLE_QUERY_1 = __importDefault(require("../constant/query/GOOGLE_QUERY"));
/**
 * Validation of the query passed as argument
 * @param config
 */
function verifyGoogleQuery(config) {
    var _a;
    if (config.excludeDomains && config.domains)
        throw new Error("Can not set 'excludeDomains' and 'domains' as same times");
    if (!config.search || config.search.trim() == "")
        throw new Error("'search' can not be empty");
    if (config.query) {
        const queryToVerify = Object.keys(GOOGLE_QUERY_1.default);
        for (const key of Object.keys(config.query)) {
            if (!queryToVerify.includes(key))
                throw new Error(`Invalide query name '${key}'`);
            const VALUES = Object.values(GOOGLE_QUERY_1.default[key]);
            const ACTUAL_VALUE = (_a = config.query[key]) !== null && _a !== void 0 ? _a : "";
            if (!VALUES.includes(ACTUAL_VALUE))
                throw new Error(`'${ACTUAL_VALUE}' is not a valide argument for the query : '${key}'`);
        }
    }
}
exports.default = verifyGoogleQuery;
//# sourceMappingURL=verifyGoogleQuery.js.map