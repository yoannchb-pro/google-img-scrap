import ImageResultItem from '../types/imageResultItem';

/**
 * Limit the result size
 * @param config
 * @param imagesItems
 * @returns
 */
function limitResultSize(
  limit: number | undefined,
  imagesItems: ImageResultItem[]
): ImageResultItem[] {
  let slicedResult: ImageResultItem[] = [];

  if (limit && limit > 0 && imagesItems.length > limit) {
    slicedResult = imagesItems.slice(0, limit);
  }

  return slicedResult.length > 0 ? slicedResult : imagesItems;
}

export default limitResultSize;
