"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GOOGLE_PARAMS_1 = __importDefault(require("./GOOGLE_PARAMS"));
const GOOGLE_COLORS_1 = __importDefault(require("./GOOGLE_COLORS"));
const IMAGES_EXTENSIONS_json_1 = __importDefault(require("../extensions/IMAGES_EXTENSIONS.json"));
const GOOGLE_QUERY = {
    SIZE: {
        LARGE: GOOGLE_PARAMS_1.default.SIZE + ":l",
        MEDIUM: GOOGLE_PARAMS_1.default.SIZE + ":m",
        ICON: GOOGLE_PARAMS_1.default.SIZE + ":i",
    },
    COLOR: {
        BLACK_AND_WHITE: GOOGLE_PARAMS_1.default.COLOR + ":gray",
        TRANSPARENT: GOOGLE_PARAMS_1.default.COLOR + ":trans",
    },
    TYPE: {
        CLIPART: GOOGLE_PARAMS_1.default.TYPE + ":clipart",
        DRAW: GOOGLE_PARAMS_1.default.TYPE + ":lineart",
        GIF: GOOGLE_PARAMS_1.default.TYPE + ":animated",
    },
    EXTENSION: {},
    DATE: {
        DAY: GOOGLE_PARAMS_1.default.DATE + ":d",
        WEEK: GOOGLE_PARAMS_1.default.DATE + ":w",
        MONTH: GOOGLE_PARAMS_1.default.DATE + ":m",
        YEAR: GOOGLE_PARAMS_1.default.DATE + ":y",
    },
    LICENCE: {
        CREATIVE_COMMONS: GOOGLE_PARAMS_1.default.LICENCE + ":cl",
        COMMERCIAL_AND_OTHER: GOOGLE_PARAMS_1.default.LICENCE + ":ol",
    },
};
//build extension
for (const EXTENSION of IMAGES_EXTENSIONS_json_1.default) {
    const queryName = EXTENSION.toUpperCase();
    GOOGLE_QUERY.EXTENSION[queryName] =
        GOOGLE_PARAMS_1.default.IMAGE_EXTENSION + ":" + EXTENSION;
}
//build colors
for (const COLOR of GOOGLE_COLORS_1.default) {
    const queryName = COLOR.toUpperCase();
    GOOGLE_QUERY.COLOR[queryName] =
        GOOGLE_PARAMS_1.default.COLOR +
            ":specific," +
            GOOGLE_PARAMS_1.default.SPECIFIC_COLOR +
            ":" +
            COLOR;
}
exports.default = GOOGLE_QUERY;
//# sourceMappingURL=GOOGLE_QUERY.js.map