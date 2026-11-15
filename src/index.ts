import { getCountryList } from './api/getCountryList.js';
import { debounce } from './utils/debounce.js';
import { createCountryCard } from './ui/card.js';
import {
  createSearchInput,
  createSearchWrapper,
  createSpinner,
  createCardsContainer,
  createNotFoundMessage,
  createErrorBlock,
} from './ui/view.js';

const header = document.createElement('header');
header.className = 'app-header';

const input = createSearchInput();
const searchWrapper = createSearchWrapper(input);
const spinner = createSpinner();
const container = createCardsContainer();

document.body.append(header, searchWrapper, spinner, container);

let currentController: AbortController | null = null;
let lastQuery = '';

async function handleSearch(query: string): Promise<void> {
  const trimmed = query.trim();

  if (!trimmed) {
    currentController?.abort();
    container.replaceChildren();
    spinner.classList.add('hidden');
    return;
  }

  lastQuery = trimmed;
  spinner.classList.remove('hidden');
  container.replaceChildren();

  try {
    currentController = new AbortController();

    const countries = await getCountryList(trimmed, currentController.signal);

    if (countries.length === 0) {
      container.replaceChildren(createNotFoundMessage());
      return;
    }

    container.replaceChildren();
    countries.forEach((country) => {
      container.append(createCountryCard(country));
    });
  } catch (error: unknown) {
    const err = error as Error;

    if (err.name === 'AbortError') {
      return;
    }

    container.replaceChildren(
      createErrorBlock(() => {
        handleSearch(lastQuery);
      }),
    );
  } finally {
    spinner.classList.add('hidden');
  }
}

const debouncedSearch = debounce(handleSearch, 400);

input.addEventListener('input', () => {
  currentController?.abort();
  debouncedSearch(input.value);
});

container.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null;
  const card = target?.closest('.country-card');
  if (!card) return;

  const details = card.querySelector('.country-details');
  if (details) {
    details.classList.toggle('hidden');
    card.classList.toggle('open');
  }
});
