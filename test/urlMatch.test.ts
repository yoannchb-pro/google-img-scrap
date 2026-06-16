import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Url match test', function () {
  it('All url should match a specific regex', async function () {
    const urlMatch = ['istockphoto', 'wikipedia'];

    function hasWord(url: string, words: string[]): boolean {
      return words.some(word => url.toLowerCase().includes(word.toLowerCase()));
    }

    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      limit: 5,
      urlMatch
    });
    expect(result.length).toBeGreaterThan(0);
    for (const img of result) {
      expect(hasWord(img.url, urlMatch)).toBeTruthy();
    }
  });
});
