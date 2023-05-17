import GOOGLE_PARAMS from "./GOOGLE_PARAMS";
import COLORS from "./GOOGLE_COLORS";
import EXTENSIONS from "../extensions/IMAGES_EXTENSIONS.json";
import GoogleQuery from "../../types/googleQuery";

const GOOGLE_QUERY = {
  SIZE: {
    LARGE: GOOGLE_PARAMS.SIZE + ":l",
    MEDIUM: GOOGLE_PARAMS.SIZE + ":m",
    ICON: GOOGLE_PARAMS.SIZE + ":i",
  },

  COLOR: {
    BLACK_AND_WHITE: GOOGLE_PARAMS.COLOR + ":gray",
    TRANSPARENT: GOOGLE_PARAMS.COLOR + ":trans",
  },

  TYPE: {
    CLIPART: GOOGLE_PARAMS.TYPE + ":clipart",
    DRAW: GOOGLE_PARAMS.TYPE + ":lineart",
    GIF: GOOGLE_PARAMS.TYPE + ":animated",
  },

  EXTENSION: {},

  DATE: {
    DAY: GOOGLE_PARAMS.DATE + ":d",
    WEEK: GOOGLE_PARAMS.DATE + ":w",
    MONTH: GOOGLE_PARAMS.DATE + ":m",
    YEAR: GOOGLE_PARAMS.DATE + ":y",
  },

  LICENCE: {
    CREATIVE_COMMONS: GOOGLE_PARAMS.LICENCE + ":cl",
    COMMERCIAL_AND_OTHER: GOOGLE_PARAMS.LICENCE + ":ol",
  },
};

//build extension
for (const EXTENSION of EXTENSIONS) {
  const queryName = EXTENSION.toUpperCase();
  (GOOGLE_QUERY as any).EXTENSION[queryName] =
    GOOGLE_PARAMS.IMAGE_EXTENSION + ":" + EXTENSION;
}

//build colors
for (const COLOR of COLORS) {
  const queryName = COLOR.toUpperCase();
  (GOOGLE_QUERY as any).COLOR[queryName] =
    GOOGLE_PARAMS.COLOR +
    ":specific," +
    GOOGLE_PARAMS.SPECIFIC_COLOR +
    ":" +
    COLOR;
}

export default GOOGLE_QUERY as GoogleQuery;
