import { GOOGLE_IMG_INVERSE_ENGINE_URL } from '../dist';

describe('Inverse URL test', function () {
  it('Should return 5 results', async function () {
    const { result } = await GOOGLE_IMG_INVERSE_ENGINE_URL(
      'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg',
      { limit: 5 }
    );
    expect(result.length).toBe(5);
  });
});
