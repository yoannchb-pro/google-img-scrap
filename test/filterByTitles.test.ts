import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Filter by titles test', function () {
  it("All title shouldn't have a specific word", async function () {
    //will build something like this "(draw and white) or (albino and white)"
    const filterByTitles = [
      ['draw', 'white'],
      ['albino', 'white']
    ];

    function hasWords(str: string, words: string[]): boolean {
      return words.some(word => str.toLowerCase().includes(word.toLowerCase()));
    }

    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      limit: 5,
      filterByTitles
    });
    expect(result.length).toBeGreaterThan(0);
    for (const img of result) {
      expect(
        hasWords(img.title, filterByTitles[0]) || hasWords(img.title, filterByTitles[1])
      ).toBeTruthy();
    }
  });
});
