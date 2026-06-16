import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Domains test', function () {
  it('All result should be one of those specific domains', async function () {
    const domains = ['wikipedia.org', 'alphacoders.com'];
    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      domains
    });
    expect(result.length).toBeGreaterThan(0);
    for (const img of result) {
      expect(domains.some(domain => img.url.includes(domain.split('.')[0]))).toBeTruthy();
    }
  });
});
