import { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } from "../dist";

describe("Query test", function () {
  it("Test query params like safeSearch, custom query and query object", async function () {
    const { url, result } = await GOOGLE_IMG_SCRAP({
      search: "cats",
      safeSearch: true,
      custom: "test=true",
      query: {
        EXTENSION: GOOGLE_QUERY.EXTENSION.PNG,
        TYPE: GOOGLE_QUERY.TYPE.DRAW,
      },
    });
    expect(result[0].url).toMatch("png");
    expect(url).toMatch("safe=active"); //safe search
    expect(url).toMatch("test=true"); //custom query
  });
});
