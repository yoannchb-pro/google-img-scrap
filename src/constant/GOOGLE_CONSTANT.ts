const GOOGLE_CONSTANT = {
  url: 'https://www.google.com/search',
  queryParam: 'tbs',
  //needed to search on google image instead of google
  forceGoogleImage: {
    tbm: 'isch',
    udm: '2'
  },
  headers: {
    accept: 'text/html',
    'accept-encoding': 'gzip, deflate',
    'accept-language': 'en-US,en',
    referer: 'https://www.google.com/',
    'upgrade-insecure-requests': '1',
    'user-agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
  }
};

export default GOOGLE_CONSTANT;
