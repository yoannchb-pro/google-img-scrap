import { GOOGLE_IMG_SCRAP } from '../dist';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Rate Limiting test', function () {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should retry on 429 error', async function () {
    mockedAxios.get
      .mockRejectedValueOnce({ response: { status: 429 } })
      .mockResolvedValueOnce({ data: 'success' });

    await GOOGLE_IMG_SCRAP({ search: 'test', limit: 1 });
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });

  it('Should throw after max retries', async function () {
    mockedAxios.get
      .mockRejectedValueOnce({ response: { status: 429 } })
      .mockRejectedValueOnce({ response: { status: 429 } })
      .mockRejectedValueOnce({ response: { status: 429 } });

    await expect(GOOGLE_IMG_SCRAP({ search: 'test', limit: 1 })).rejects.toThrow(
      'Too many requests'
    );
  });
});
