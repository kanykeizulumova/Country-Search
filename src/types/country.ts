export interface RawCountry {
  name: string;
  flag?: string;
  flags?: {
    png?: string;
    svg?: string;
  };
  capital?: string;
  region?: string;
  population?: number;
  area?: number;
  borders?: string[];
  languages?: Array<{
    name: string;
    nativeName?: string;
    iso639_1?: string;
    iso639_2?: string;
  }>;
  currencies?: Array<{
    code?: string;
    name?: string;
    symbol?: string;
  }>;
}

export interface CountryData {
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  languages: string[];
  currencies: string[];
  area: number;
  borders: string[];
}

