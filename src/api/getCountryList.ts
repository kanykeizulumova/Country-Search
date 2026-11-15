import { searchCountries } from './searchCountries.js';
import { mapCountryResponse } from '../utils/mapCountryResponse.js';
import type { CountryData, RawCountry } from '../types/country.js';

export async function getCountryList(
  query: string,
  signal: AbortSignal,
  timeoutMs = 5000,
): Promise<CountryData[]> {
  const combinedSignal = AbortSignal.any([signal, AbortSignal.timeout(timeoutMs)]);

  const raw = (await searchCountries(query, combinedSignal)) as RawCountry[];
  return raw.map(mapCountryResponse);
}
