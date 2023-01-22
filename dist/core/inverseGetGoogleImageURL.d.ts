import FormData from "form-data";
import { AxiosProxyConfig } from "axios";
/**
 * Return google images url from lens.google.com inverse search image engine
 * @param url
 * @param extraHeader
 * @returns
 */
declare function inverseGetGoogleImageURL(url: string, proxy?: AxiosProxyConfig, formData?: FormData): Promise<string>;
export default inverseGetGoogleImageURL;
