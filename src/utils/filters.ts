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

const filterOutInactiveFilters = ([_, val]: FilterEntry): boolean => {
  const value = val.value;

  if (isString(value)) return !!value.trim();
  else if (isNumber(value)) return !!value;

  return false;
};

export const getNewFilteredConfig = (filters: FilterConfig): FilterConfig =>
  (Object.entries(filters) as FilterEntry[])
    .filter(filterOutInactiveFilters)
    .reduce<FilterConfig>((acc, [key, val]) => ({ ...acc, [key]: val }), {});

type FilterKeyValueTypeMap = {
  name: string;
  stars: number;
  price: [number, number];
};

export const getFilterValue = <K extends FilterableKey>(
  name: K,
  filters: FilterConfig,
) => filters[name]?.value as FilterKeyValueTypeMap[K];

export const areFilterValuesEqual = (f1: FilterType, f2: FilterType) =>
  typeof f1 === typeof f2 && f1.value === f2.value;

export const areFilterConfigsEqual = (f1: FilterConfig, f2: FilterConfig) => {
  const f1Entries = Object.entries(f1) as FilterEntry[];
  const f2Entries = Object.entries(f2) as FilterEntry[];

  if (f1Entries.length !== f2Entries.length) return false;

  return f1Entries.every(([, val], index) =>
    areFilterValuesEqual(val, f2Entries[index][1]),
  );
};
