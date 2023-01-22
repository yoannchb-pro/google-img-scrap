import { GOOGLE_IMG_SCRAP } from "../dist";

describe("Limit test", function () {
  it("Should return only 5 elements", async function () {
    const { result } = await GOOGLE_IMG_SCRAP({
      search: "cats",
      limit: 5,
    });
    expect(result.length).toBe(5);
  });
  it("Should return all elements", async function () {
    const { result } = await GOOGLE_IMG_SCRAP({
      search: "cats",
      limit: 0,
    });
    expect(result.length).toBeGreaterThan(0);
  });
});
