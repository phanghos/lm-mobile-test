/* eslint-disable curly */
import type {
  FilterableKey,
  FilterConfig,
  FilterEntry,
  FilterType,
  NumberFilter,
  RangeFilter,
  TextFilter,
} from 'components/Filters/types';
import type { Hotel } from 'types';

const createFilterFunction =
  <T extends FilterType>() =>
  (value: T['value']) => ({ value });

export const textFilter = createFilterFunction<TextFilter>();
export const numberFilter = createFilterFunction<NumberFilter>();
export const rangeFilter = createFilterFunction<RangeFilter>();

export const filterHotel =
  (hotel: Hotel) =>
  ([key, filter]: [string, FilterType]) => {
    const value = hotel[key as FilterableKey];

    if (value === undefined) return false;

    if (typeof value === 'string' && typeof filter.value === 'string') {
      return value.toLocaleLowerCase().includes(filter.value.toLowerCase());
    } else if (typeof value === 'number' && typeof filter.value === 'number') {
      return value === filter.value;
    } else if (typeof filter.value === 'object') {
      const [min, max] = filter.value;
      return +value >= min && +value <= max;
    }

    return false;
  };

export const filterOutInactiveFilters = ([_, val]: FilterEntry) => {
  const value = val.value;

  if (typeof value === 'string') return !!value.trim();
  else if (typeof value === 'number') return !!value;
  else return false;
};

export const getNewFilteredConfig = (filters: FilterConfig) =>
  (Object.entries(filters) as FilterEntry[])
    .filter(filterOutInactiveFilters)
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
