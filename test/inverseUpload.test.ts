import { GOOGLE_IMG_INVERSE_ENGINE_UPLOAD } from '../dist';
import fs from 'fs';
import path from 'path';

// Not working anymore for now :(
describe.skip('Inverse Upload test', function () {
  it('Should return 5 results', async function () {
    const imageBuffer = fs.readFileSync(path.resolve(__dirname, '../assets/demonSlayer.png'));
    const { result } = await GOOGLE_IMG_INVERSE_ENGINE_UPLOAD(imageBuffer, {
      limit: 5
    });
    expect(result.length).toBe(5);
  });
});
