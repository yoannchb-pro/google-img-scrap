import { GOOGLE_IMG_SCRAP } from '../dist';

describe('Filter by titles test', function () {
  it("All title shouldn't have a specific word", async function () {
    //will build something like this "(draw and white) or (albino and white)"
    const filterByTitles = [
      ['draw', 'white'],
      ['albino', 'white']
    ];
    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      filterByTitles
    });
    for (const img of result) {
      expect(filterByTitles.flat().some(word => img.title.includes(word))).toBeTruthy();
    }
  });
});
