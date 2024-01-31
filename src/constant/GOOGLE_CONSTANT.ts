const GOOGLE_CONSTANT = {
  url: "https://www.google.com/search",
  inverse: {
    base: "https://lens.google.com/",
    upload: "https://lens.google.com/v3/upload",
    url: "https://lens.google.com/uploadbyurl?url=",
  },
  queryParam: "tbs",
  forceGoogleImage: {
    tbm: "isch", //needed to search on google image instead of google
  },
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
  },
};

export default GOOGLE_CONSTANT;
