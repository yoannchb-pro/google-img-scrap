import axios from 'axios';
import GOOGLE_CONSTANT from '../constant/GOOGLE_CONSTANT';
import { unicodeToChar } from '../utils/utils';
import FormData from 'form-data';
import { AxiosProxyConfig } from 'axios';

/**
 * Return google images url from lens.google.com inverse search image engine
 * @param url
 * @param extraHeader
 * @returns
 */
async function inverseGetGoogleImageURL(
  url: string,
  proxy?: AxiosProxyConfig,
  formData?: FormData
): Promise<string> {
  if (formData) {
    //we send the image buffer to google
    const data = (
      await axios.post(url, formData, {
        headers: {
          ...GOOGLE_CONSTANT.headers,
          ...formData.getHeaders()
        },
        ...(proxy ?? {})
      })
    ).data;
    //we need to get the google lens url generated
    url = data.match(/https:\/\/lens.google.com\/[^"]+/gi)[0];
  }

  //we scrap google lens to get the original google image search
  const data = (
    await axios.get(url, {
      headers: GOOGLE_CONSTANT.headers,
      ...(proxy ?? {})
    })
  ).data;

  const urlStr = data.match(/https:\/\/www.google.com\/search\?q[^"]+/gi)[0];

  return (
    unicodeToChar(urlStr) + '&' + Object.entries(GOOGLE_CONSTANT.forceGoogleImage).flat().join('=')
  );
}

export default inverseGetGoogleImageURL;
