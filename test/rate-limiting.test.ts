import { GOOGLE_IMG_SCRAP } from '../dist';
import axios from 'axios';

describe('Rate Limiting test', function () {
  // Mock axios to simulate rate limit responses
  const mockAxios = jest.spyOn(axios, 'get');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should retry on 429 error and eventually succeed', async function () {
    // Mock sequence: 429 -> 429 -> success
    mockAxios
      .mockRejectedValueOnce({ response: { status: 429 } })
      .mockRejectedValueOnce({ response: { status: 429 } })
      .mockResolvedValueOnce({ data: '<html>...</html>' });

    const { result } = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      limit: 5
    });

    expect(mockAxios).toHaveBeenCalledTimes(3);
    expect(result.length).toBeGreaterThan(0);
  });

  it('Should throw error after max retries', async function () {
    // Mock sequence: 429 -> 429 -> 429 -> 429 (exceeds max retries)
    mockAxios
      .mockRejectedValue({ response: { status: 429 } });

    await expect(GOOGLE_IMG_SCRAP({
      search: 'cats',
      limit: 5
    })).rejects.toThrow('Too many requests. Please try again later.');
  });

  it('Should handle non-429 errors immediately', async function () {
    // Mock 500 error (should not retry)
    mockAxios.mockRejectedValue({ response: { status: 500 } });

    await expect(GOOGLE_IMG_SCRAP({
      search: 'cats',
      limit: 5
    })).rejects.toThrow();
    expect(mockAxios).toHaveBeenCalledTimes(1);
  });

  it('Should respect delay between retries', async function () {
    const startTime = Date.now();
    
    // Mock sequence: 429 -> success
    mockAxios
      .mockRejectedValueOnce({ response: { status: 429 } })
      .mockResolvedValueOnce({ data: '<html>...</html>' });

    await GOOGLE_IMG_SCRAP({
      search: 'cats',
      limit: 5
    });

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    // Should have waited at least 1 second (initial delay)
    expect(elapsedTime).toBeGreaterThanOrEqual(1000);
    expect(mockAxios).toHaveBeenCalledTimes(2);
  });
}); 