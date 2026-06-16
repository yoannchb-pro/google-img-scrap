import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Filter by titles test', function () {
  it("All title shouldn't have a specific word", async function () {
    //will build something like this "(draw or white) and (albino or white)"
    const filterByTitles = [
      ['draw', 'white'],
      ['albino', 'white']
    ];

    function hasWord(url: string, words: string[]): boolean {
      return words.some(word => url.includes(word));
    }

    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      filterByTitles
    });
    expect(result.length).toBeGreaterThan(0);
    for (const img of result) {
      expect(
        hasWord(img.title, filterByTitles[0]) && hasWord(img.title, filterByTitles[1])
      ).toBeTruthy();
    }
  });
});
