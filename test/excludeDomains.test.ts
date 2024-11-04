import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Exclude domains test', function () {
  it("All result shouldn't includes those domains", async function () {
    const excludeDomains = ['https://fr.wikipedia.org/', 'https://wall.alphacoders.com/'];
    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      excludeDomains
    });
    for (const img of result) {
      expect(excludeDomains.some(domain => img.url.includes(domain))).toBeFalsy();
    }
  });
});
