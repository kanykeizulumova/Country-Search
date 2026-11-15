import { describe, it, expect, vi } from 'vitest';
import { searchCountries } from './searchCountries';

describe('Race condition and abort handling', () => {
  it('aborts the first request when a second request is triggered', async () => {
    const mockFetch = vi
      .fn()
      .mockImplementation((url: string, options?: { signal?: AbortSignal }) => {
        const signal = options?.signal;
        const isFirstRequest = url.endsWith('/sp');

        return new Promise((resolve, reject) => {
          if (signal?.aborted) {
            reject(new DOMException('The user aborted a request.', 'AbortError'));
            return;
          }

          const timeoutId = setTimeout(
            () => {
              resolve({
                ok: true,
                status: 200,
                json: async () =>
                  isFirstRequest ? [{ name: 'Spain' }, { name: 'Somalia' }] : [{ name: 'Spain' }],
              });
            },
            isFirstRequest ? 100 : 10,
          );

          signal?.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new DOMException('The user aborted a request.', 'AbortError'));
          });
        });
      });

    vi.stubGlobal('fetch', mockFetch);

    const controller1 = new AbortController();
    const promise1 = searchCountries('sp', controller1.signal);

    controller1.abort();

    const controller2 = new AbortController();
    const promise2 = searchCountries('spain', controller2.signal);

    await expect(promise1).rejects.toMatchObject({ name: 'AbortError' });
    const result2 = await promise2;

    expect(result2).toEqual([{ name: 'Spain' }]);

    vi.restoreAllMocks();
  });
});
