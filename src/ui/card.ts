import type { CountryData } from '../types/country.js';

function createRow(label: string, value: string): HTMLParagraphElement {
  const p = document.createElement('p');
  p.className = 'country-row';

  const strong = document.createElement('strong');
  strong.className = 'country-label';
  strong.textContent = `${label}: `;

  const span = document.createElement('span');
  span.className = 'country-value';
  span.textContent = value;

  p.append(strong, span);
  return p;
}

export function createCountryCard(country: CountryData): HTMLDivElement {
  const card = document.createElement('div');
  card.className = 'country-card';

  const header = document.createElement('div');
  header.className = 'card-header';

  const title = document.createElement('h3');
  title.className = 'country-title';

  const flag = document.createElement('span');
  flag.className = 'country-flag';
  flag.textContent = country.flag;

  const name = document.createElement('span');
  name.textContent = country.name;

  title.append(flag, name);

  const regionTag = document.createElement('span');
  regionTag.className = 'region-tag';
  regionTag.textContent = country.region || 'World';

  header.append(title, regionTag);

  const mainGrid = document.createElement('div');
  mainGrid.className = 'card-grid';

  const capital = createRow('Capital', country.capital);
  const population = createRow(
    'Population',
    country.population ? country.population.toLocaleString() : '—',
  );
  mainGrid.append(capital, population);

  const hint = document.createElement('div');
  hint.className = 'card-expand-hint';

  const hintText = document.createElement('span');
  hintText.textContent = 'Explore details';

  const chevron = document.createElement('span');
  chevron.className = 'expand-chevron';
  chevron.textContent = '▾';

  hint.append(hintText, chevron);

  const details = document.createElement('div');
  details.className = 'country-details hidden';

  const languages = createRow(
    'Languages',
    country.languages.length ? country.languages.join(', ') : 'No data',
  );
  const currencies = createRow(
    'Currency',
    country.currencies.length ? country.currencies.join(', ') : 'No data',
  );
  const area = createRow('Area', country.area ? `${country.area.toLocaleString()} km²` : '—');
  const borders = createRow(
    'Borders',
    country.borders.length ? country.borders.join(', ') : 'No land borders',
  );

  details.append(languages, currencies, area, borders);
  card.append(header, mainGrid, hint, details);

  return card;
}
