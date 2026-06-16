import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Url match test', function () {
  it('All url should match a specific regex', async function () {
    //will build something like this "(cdn or wikipedia) and (cdn or istockphoto)"
    const urlMatch = [
      ['cdn', 'wikipedia'],
      ['cdn', 'istockphoto']
    ];

    function hasWord(url: string, words: string[]): boolean {
      return words.some(word => url.includes(word));
    }

    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      urlMatch
    });
    expect(result.length).toBeGreaterThan(0);
    for (const img of result) {
      expect(hasWord(img.url, urlMatch[0]) && hasWord(img.url, urlMatch[1])).toBeTruthy();
    }
  });
});
