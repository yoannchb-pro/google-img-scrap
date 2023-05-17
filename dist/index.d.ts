/// <reference types="node" />
import Config from "./types/config";
import Results from "./types/results";
import GOOGLE_QUERY from "./constant/query/GOOGLE_QUERY";
/**
 * Inverse google image search engine with image buffer
 * @param imageData
 * @param proxy
 * @returns
 */
declare function GOOGLE_IMG_INVERSE_ENGINE_UPLOAD(imageData: Buffer, config?: Omit<Config, "search">): Promise<Results>;
/**
 * Inverse google image search engine with an image url
 * @param imageUrl
 * @param proxy
 * @returns
 */
declare function GOOGLE_IMG_INVERSE_ENGINE_URL(imageUrl: string, config?: Omit<Config, "search">): Promise<Results>;
/**
 * Search images on google image
 * @param config
 * @returns
 */
declare function GOOGLE_IMG_SCRAP(config: Config): Promise<Results>;
export { GOOGLE_IMG_SCRAP, GOOGLE_IMG_INVERSE_ENGINE_URL, GOOGLE_IMG_INVERSE_ENGINE_UPLOAD, GOOGLE_QUERY, };
