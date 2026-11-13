import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('defers the function call and resets the timer in the event of frequent calls', () => {
        const mockFn = vi.fn();
        const debouncedFn = debounce(mockFn, 300);

        debouncedFn('s');
        debouncedFn('sp');
        debouncedFn('spa');

        expect(mockFn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(300);

        expect(mockFn).toHaveBeenCalledOnce();

        expect(mockFn).toHaveBeenCalledWith('spa');
    });
});