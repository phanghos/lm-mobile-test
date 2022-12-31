import {
  isString,
  isNumber,
  isArray,
  min as minFn,
  max as maxFn,
} from 'radash';
import type {
  FilterableKey,
  FilterConfig,
  FilterEntry,
  FilterType,
  NumberFilter,
  RangeFilter,
  RangeFilterType,
  TextFilter,
} from 'components/Filters/types';
import type { Hotel } from 'types';

type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

type FilterKeyValueTypeMap = {
  name: string;
  stars: number;
  userRating: RangeFilterType;
  price: RangeFilterType;
};

type NumberKey = keyof PickByType<Pick<Hotel, FilterableKey>, number>;

const createFilterFunction =
  <T extends FilterType>() =>
  (value: T['value']) => ({ value });

export const createTextFilter = createFilterFunction<TextFilter>();
export const createNumberFilter = createFilterFunction<NumberFilter>();
export const createRangeFilter = createFilterFunction<RangeFilter>();

export const filterHotel =
  (hotel: Hotel) =>
  ([key, filter]: FilterEntry) => {
    const value = hotel[key];

    if (value === undefined) return false;

    if (isString(value) && isString(filter.value)) {
      return value.toLocaleLowerCase().includes(filter.value.toLowerCase());
    } else if (isNumber(value) && isNumber(filter.value)) {
      return value === filter.value;
    } else if (isNumber(value) && isArray(filter.value)) {
      const [min, max] = filter.value;
      return value >= min && value <= max;
    }

    return false;
  };

export const findMinValueInListByKey = (hotels: Hotel[], key: NumberKey) =>
  minFn(hotels, h => h[key])?.[key];

export const findMaxValueInListByKey = (hotels: Hotel[], key: NumberKey) =>
  maxFn(hotels, h => h[key])?.[key];

const filterOutInactiveFilter =
  (hotels: Hotel[]) =>
  ([key, val]: FilterEntry): boolean => {
    const value = val.value;
    if (isString(value)) return !!value.trim();
    else if (isNumber(value)) return !!value;
    else if (isArray(value)) {
      const [min, max] = value;

      if (key === 'userRating') {
        return !(min === 0 && max === 10);
      } else if (key === 'price') {
        return !(
          min ===
          (findMinValueInListByKey(hotels, 'price') ??
            (0 && max === findMaxValueInListByKey(hotels, 'price')) ??
            0)
        );
      }

      return false;
    }

    return false;
  };

export const getActiveFiltersConfig = (
  filters: FilterConfig,
  hotels: Hotel[],
): FilterConfig =>
  (Object.entries(filters) as FilterEntry[])
    .filter(filterOutInactiveFilter(hotels))
    .reduce<FilterConfig>((acc, [key, val]) => ({ ...acc, [key]: val }), {});

export const getFilterValue = <K extends FilterableKey>(
  name: K,
  filters: FilterConfig,
) => filters[name]?.value as FilterKeyValueTypeMap[K];

export const areFilterValuesEqual = (f1: FilterType, f2: FilterType) =>
  typeof f1 === typeof f2 && `${f1.value}` === `${f2.value}`;

export const areFilterConfigsEqual = (f1: FilterConfig, f2: FilterConfig) => {
  const f1Entries = Object.entries(f1) as FilterEntry[];
  const f2Entries = Object.entries(f2) as FilterEntry[];

  if (f1Entries.length !== f2Entries.length) return false;

  return f1Entries.every(([, val], index) =>
    areFilterValuesEqual(val, f2Entries[index][1]),
  );
};
