import { HttpError } from "./HttpError";


export async function searchCountries(query: string, signal?: AbortSignal) {
    const response = await fetch(
        `https://countries.dev/name/${query.trim()}`,
        { signal: signal })

    if (response.status === 404) {
        return [];
    }
    if (!response.ok) {
        throw new HttpError(response.status);

    }

    const data = await response.json();
    return data;
}