import { AxiosProxyConfig } from "axios";
import ImageResultItem from "../types/imageResultItem";
/**
 * Parse the html from google image to get the images links
 * @param url
 * @returns
 */
declare function parseGoogleImages(url: string, proxy?: AxiosProxyConfig): Promise<ImageResultItem[]>;
export default parseGoogleImages;
