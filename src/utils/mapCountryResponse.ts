import type { CountryData, RawCountry } from '../types/country.js';

export function mapCountryResponse(raw: RawCountry): CountryData {
  const name = raw.name || 'Unknown';
  const flag = raw.flag || raw.flags?.svg || raw.flags?.png || '🏳️';
  const capital = raw.capital || 'N/A';
  const region = raw.region || 'N/A';
  const population = typeof raw.population === 'number' ? raw.population : 0;
  const area = typeof raw.area === 'number' ? raw.area : 0;
  const borders = Array.isArray(raw.borders) ? raw.borders : [];

  const languages = Array.isArray(raw.languages)
    ? raw.languages
        .map((lang) => lang.name)
        .filter((langName): langName is string => Boolean(langName))
    : [];

  const currencies = Array.isArray(raw.currencies)
    ? raw.currencies
        .map((currency) => {
          if (currency.name && currency.code) {
            return `${currency.name} (${currency.code})`;
          }
          return currency.name || currency.code || '';
        })
        .filter(Boolean)
    : [];

  return {
    name,
    flag,
    capital,
    region,
    population,
    area,
    borders,
    languages,
    currencies,
  };
}
