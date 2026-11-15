import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchCountries } from './searchCountries';
import { HttpError } from './HttpError';

describe('searchCountries', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns an array of countries upon a successful response', async () => {
    const fakeData = [{ name: 'Spain' }, { name: 'Somalia' }];
    const controller = new AbortController();

    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => fakeData,
    });

    const result = await searchCountries('spa', controller.signal);

    expect(mockFetch).toHaveBeenCalledWith('https://countries.dev/name/spa', {
      signal: controller.signal,
    });
    expect(result).toEqual(fakeData);
  });

  it('returns an empty array when the status is 404', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await searchCountries('UnknownCountry', new AbortController().signal);

    expect(result).toEqual([]);
  });

  it('throws an HttpError for statuses other than 200 and 404', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(searchCountries('ErrorCountry', new AbortController().signal)).rejects.toThrow(
      HttpError,
    );
  });

  it('throws an AbortError when the signal is aborted', async () => {
    const abortError = new DOMException('Aborted', 'AbortError');
    mockFetch.mockRejectedValue(abortError);

    await expect(searchCountries('Spain', new AbortController().signal)).rejects.toThrow('Aborted');
  });
});
