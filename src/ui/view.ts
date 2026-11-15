export function createSearchInput(): HTMLInputElement {
  const input = document.createElement('input');
  input.className = 'search-country';
  input.id = 'input-search';
  input.placeholder = 'Search countries across the globe...';
  return input;
}

export function createSearchWrapper(input: HTMLInputElement): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'search-wrapper';

  const icon = document.createElement('span');
  icon.className = 'search-icon';
  icon.textContent = '🔍';

  wrapper.append(icon, input);
  return wrapper;
}

export function createSpinner(): HTMLDivElement {
  const spinner = document.createElement('div');
  spinner.id = 'loadingSpinner';
  spinner.className = 'spinner hidden';

  const globe = document.createElement('div');
  globe.className = 'globe-spinner';

  const text = document.createElement('span');
  text.className = 'spinner-text';
  text.textContent = 'Navigating the globe...';

  spinner.append(globe, text);
  return spinner;
}

export function createCardsContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.id = 'data-div';
  container.className = 'cards-container';
  return container;
}

export function createNotFoundMessage(): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'status-message not-found';

  const icon = document.createElement('span');
  icon.className = 'status-icon';
  icon.textContent = '🧭';

  const text = document.createElement('p');
  text.className = 'not-found-message';
  text.textContent = 'No countries found on this coordinates';

  wrapper.append(icon, text);
  return wrapper;
}

export function createErrorBlock(onRetry: () => void): HTMLDivElement {
  const errorWrapper = document.createElement('div');
  errorWrapper.className = 'status-message error-wrapper';

  const icon = document.createElement('span');
  icon.className = 'status-icon';
  icon.textContent = '🛰️';

  const message = document.createElement('p');
  message.textContent = 'Unable to reach satellite data. Please verify your connection.';

  const retryBtn = document.createElement('button');
  retryBtn.className = 'repeat';
  retryBtn.textContent = 'Retry Navigation';
  retryBtn.addEventListener('click', onRetry);

  errorWrapper.append(icon, message, retryBtn);
  return errorWrapper;
}
