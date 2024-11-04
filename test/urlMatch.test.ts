import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Url match test', function () {
  it('All url should match a specific regex', async function () {
    //will build something like this "(cdn and wikipedia) or (cdn istockphoto)"
    const urlMatch = [
      ['cdn', 'wikipedia'],
      ['cdn', 'istockphoto']
    ];
    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      urlMatch
    });

    for (const img of result) {
      expect(urlMatch.flat().some(word => img.url.includes(word))).toBeTruthy();
    }
  });
});
