import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Exclude words test', function () {
  it("All title shouldn't have a specific word", async function () {
    const excludeWords = ['white', 'black'];
    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      excludeWords
    });
    expect(result.length).toBeGreaterThan(0);
    for (const img of result) {
      expect(excludeWords.some(word => img.title.includes(word))).toBeFalsy();
    }
  });
});
