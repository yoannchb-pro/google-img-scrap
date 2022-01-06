type Config = {
  search: string;
  limit?:number;
  query?: {
    TYPE?: string;
    DATE?: string;
    COLOR?: string;
    SIZE?: string;
    LICENCE?: string;
    EXTENSION?: string;
  };
  domains?: string[];
  excludeWords?: string[];
  custom?: string;
  safeSearch?: boolean;
  excludeDomains?: string[];
  execute?: (element: FinalResult) => FinalResult | undefined;
  filterByTitles?: [string[]];
};
type FinalResult = {
  url: string;
  height: string;
  width: string;
};
type Results = {
  url: string;
  result: FinalResult[];
};
type GoogleQuery = {
  SIZE: {
    LARGE: string;
    MEDIUM: string;
    ICON: string;
  };

  COLOR: {
    BLACK_AND_WHITE: string;
    TRANSPARENT: string;
    RED: string;
    BLUE: string;
    PURPLE: string;
    ORANGE: string;
    YELLOW: string;
    GREEN: string;
    TEAL: string;
    PINK: string;
    WHITE: string;
    GRAY: string;
    BLACK: string;
    BROWN: string;
  };

  TYPE: {
    CLIPART: string;
    DRAW: string;
    GIF: string;
  };

  EXTENSION: {
    JPG: "jpg";
    GIF: "gif";
    BMP: "bmp";
    PNG: "png";
    SVG: "svg";
    WEBP: "webp";
    ICO: "ico";
    RAW: "raw";
  };

  DATE: {
    DAY: string;
    WEEK: string;
    MONTH: string;
    YEAR: string;
  };

  LICENCE: {
    CREATIVE_COMMONS: string;
    COMMERCIAL_AND_OTHER: string;
  };
};

/**
 * GOOGLE_IMG_SCRAP
 *
 * @param {Config} config
 * @returns {Results}
 */
export declare function GOOGLE_IMG_SCRAP(config: Config): Results;

/**
 * GOOGLE_QUERY
 *
 * @returns {GoogleQuery}
 */
export declare const GOOGLE_QUERY: GoogleQuery;
