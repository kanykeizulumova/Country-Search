import { describe, it, expect } from 'vitest';
import { mapCountryResponse } from './mapCountryResponse.js';
import type { RawCountry } from '../types/country.js';

describe('mapCountryResponse', () => {
  it('correctly maps a full raw country object', () => {
    const raw: RawCountry = {
      name: 'Spain',
      flag: '🇪🇸',
      capital: 'Madrid',
      region: 'Europe',
      population: 47351567,
      area: 505992,
      borders: ['AND', 'FRA', 'GIB', 'PRT', 'MAR'],
      languages: [{ name: 'Spanish', iso639_1: 'es', iso639_2: 'spa', nativeName: 'Español' }],
      currencies: [{ code: 'EUR', name: 'Euro', symbol: '€' }],
    };

    const result = mapCountryResponse(raw);

    expect(result).toEqual({
      name: 'Spain',
      flag: '🇪🇸',
      capital: 'Madrid',
      region: 'Europe',
      population: 47351567,
      area: 505992,
      borders: ['AND', 'FRA', 'GIB', 'PRT', 'MAR'],
      languages: ['Spanish'],
      currencies: ['Euro (EUR)'],
    });
  });

  it('handles fallback values when optional fields are missing', () => {
    const raw: RawCountry = {
      name: 'Unknown Land',
    };

    const result = mapCountryResponse(raw);

    expect(result.name).toBe('Unknown Land');
    expect(result.capital).toBe('N/A');
    expect(result.region).toBe('N/A');
    expect(result.population).toBe(0);
    expect(result.area).toBe(0);
    expect(result.languages).toEqual([]);
    expect(result.currencies).toEqual([]);
    expect(result.borders).toEqual([]);
    expect(result.flag).toBe('🏳️');
  });

  it('extracts flag from flags object if emoji flag is not provided', () => {
    const raw: RawCountry = {
      name: 'Island',
      flags: {
        svg: 'https://example.com/flag.svg',
        png: 'https://example.com/flag.png',
      },
    };

    const result = mapCountryResponse(raw);
    expect(result.flag).toBe('https://example.com/flag.svg');
  });

  it('handles multiple languages and currencies cleanly', () => {
    const raw: RawCountry = {
      name: 'Switzerland',
      languages: [{ name: 'German' }, { name: 'French' }, { name: 'Italian' }, { name: 'Romansh' }],
      currencies: [{ code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' }],
    };

    const result = mapCountryResponse(raw);
    expect(result.languages).toEqual(['German', 'French', 'Italian', 'Romansh']);
    expect(result.currencies).toEqual(['Swiss Franc (CHF)']);
  });
});
