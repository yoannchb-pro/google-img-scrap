import ImageResultItem from "../types/imageResultItem";
/**
 * Limit the result size
 * @param config
 * @param imagesItems
 * @returns
 */
declare function limitResultSize(limit: number, imagesItems: ImageResultItem[]): ImageResultItem[];
export default limitResultSize;
