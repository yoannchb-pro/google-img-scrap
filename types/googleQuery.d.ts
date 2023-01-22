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

export default GoogleQuery;
