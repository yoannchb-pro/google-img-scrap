import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Proxy test', function () {
  it('Proxy for axios', async function () {
    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      //change proxy if not working
      proxy: {
        protocol: 'https',
        host: '201.229.250.19',
        port: 80
      }
    });
    expect(result.length).toBeGreaterThan(0);
  });
});
