const { SIZE_PARAM, COLOR_PARAM, SPECIFIC_COLOR_PARAM, TYPE_PARAM, DATE_PARAM, LICENCE_PARAM, IMAGE_EXTENSION_PARAM } = require('./GOOGLE_PARAMS');
const { COLORS } = require('./GOOGLE_COLORS');
const EXTENSIONS = require("../extensions/IMAGES_EXTENSIONS.json");

const GOOGLE_QUERY = {
    SIZE: {
        LARGE: SIZE_PARAM + ":l",
        MEDIUM: SIZE_PARAM + ":m",
        ICON: SIZE_PARAM + ":i",
    },

    COLOR: {
        BLACK_AND_WHITE: COLOR_PARAM + ":gray",
        TRANSPARENT: COLOR_PARAM + ":trans",
    },

    TYPE: {
        CLIPART: TYPE_PARAM + ":clipart",
        DRAW: TYPE_PARAM + ":lineart",
        GIF: TYPE_PARAM + ":animated",
    },

    EXTENSION: {},

    DATE: {
        DAY: DATE_PARAM + ":d",
        WEEK: DATE_PARAM + ":w",
        MONTH: DATE_PARAM + ":m",
        YEAR: DATE_PARAM + ":y",
    },

    LICENCE: {
        CREATIVE_COMMONS: LICENCE_PARAM + ":cl",
        COMMERCIAL_AND_OTHER: LICENCE_PARAM + ":ol",
    },
};

//build extension
EXTENSIONS.forEach((EXTENSION) => {
    const queryName = EXTENSION.toUpperCase();
    GOOGLE_QUERY.EXTENSION[queryName] = IMAGE_EXTENSION_PARAM + ":" + EXTENSION;
});

//build colors
COLORS.forEach((COLOR) => {
    const queryName = COLOR.toUpperCase();
    GOOGLE_QUERY.COLOR[queryName] = COLOR_PARAM + ":specific," + SPECIFIC_COLOR_PARAM + ":" + COLOR;
});

module.exports = { GOOGLE_QUERY };