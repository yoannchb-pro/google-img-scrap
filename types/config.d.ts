type Config = {
  search: string;
  limit?: number;
  query?: {
    TYPE?: string;
    DATE?: string;
    COLOR?: string;
    SIZE?: string;
    LICENCE?: string;
    EXTENSION?: string;
  };
  urlMatch?: string[][];
  domains?: string[];
  excludeWords?: string[];
  custom?: string;
  safeSearch?: boolean;
  excludeDomains?: string[];
  filterByTitles?: string[][];
};

export default Config;
