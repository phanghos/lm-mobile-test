/* eslint-disable curly */
import { isString, isNumber, isObject } from 'radash';
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
  ([key, filter]: FilterEntry) => {
    const value = hotel[key];

    if (value === undefined) return false;

    if (isString(value) && isString(filter.value)) {
      return value.toLocaleLowerCase().includes(filter.value.toLowerCase());
    } else if (isNumber(value) && isNumber(filter.value)) {
      return value === filter.value;
    } else if (isNumber(value) && isObject(filter.value)) {
      const [min, max] = filter.value;
      return value >= min && value <= max;
    }

    return false;
  };

export const filterOutInactiveFilters = ([_, val]: FilterEntry): boolean => {
  const value = val.value;

  if (isString(value)) return !!value.trim();
  else if (isNumber(value)) return !!value;

  return false;
};

export const getNewFilteredConfig = (filters: FilterConfig): FilterConfig =>
  (Object.entries(filters) as FilterEntry[])
    .filter(filterOutInactiveFilters)
    .reduce<FilterConfig>((acc, [key, val]) => ({ ...acc, [key]: val }), {});

type FilterValueMap = {
  name: string;
  stars: number;
  price: [number, number];
};

export const getFilterValue = <K extends FilterableKey>(
  name: K,
  filters: FilterConfig,
) => filters[name]?.value as FilterValueMap[K];
