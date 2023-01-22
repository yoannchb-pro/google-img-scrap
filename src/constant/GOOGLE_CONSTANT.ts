const GOOGLE_CONSTANT = {
  url: "https://images.google.com/search",
  inverse: {
    base: "https://lens.google.com/",
    upload: "https://lens.google.com/upload",
    url: "https://lens.google.com/uploadbyurl?url=",
  },
  queryParam: "tbs",
  forceGoogleImage: {
    tbm: "isch", //needed to search on google image instead of google
  },
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
  },
};

export default GOOGLE_CONSTANT;
