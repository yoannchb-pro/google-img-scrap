const GOOGLE_CONSTANT = {
  url: 'https://www.google.com/search',
  inverse: {
    base: 'https://lens.google.com/',
    upload: 'https://lens.google.com/v3/upload',
    url: 'https://lens.google.com/uploadbyurl?url='
  },
  queryParam: 'tbs',
  forceGoogleImage: {
    tbm: 'isch' //needed to search on google image instead of google
  },
  headers: {
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
  }
};

export default GOOGLE_CONSTANT;
