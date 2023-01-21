"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Limit the result size
 * @param config
 * @param imagesItems
 * @returns
 */
function limitResultSize(limit, imagesItems) {
    let slicedResult = [];
    if (limit && limit > 0 && imagesItems.length > limit) {
        slicedResult = imagesItems.slice(0, limit);
    }
    return slicedResult.length > 0 ? slicedResult : imagesItems;
}
exports.default = limitResultSize;
//# sourceMappingURL=limitResultSize.js.map