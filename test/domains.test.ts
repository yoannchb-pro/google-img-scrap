import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Domains test', function () {
  it('All result should be one of those specific domains', async function () {
    const domains = ['https://fr.wikipedia.org/', 'https://wall.alphacoders.com/'];
    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      domains
    });
    for (const img of result) {
      expect(domains.some(domain => img.url.includes(domain))).toBeTruthy();
    }
  });
});
