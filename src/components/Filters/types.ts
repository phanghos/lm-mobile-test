import type { Hotel } from 'types';

export type FilterableKey = keyof Pick<
  Hotel,
  'name' | 'stars' | 'userRating' | 'price'
>;

type FilterValue<T extends string | number | RangeFilterType> = { value: T };

export type RangeFilterType = [number, number];

export type TextFilter = FilterValue<string>;
export type NumberFilter = FilterValue<number>;
export type RangeFilter = FilterValue<RangeFilterType>;

export type FilterType = TextFilter | NumberFilter | RangeFilter;

export type FilterConfig = Partial<Record<FilterableKey, FilterType>>;

export type FilterEntry = [FilterableKey, FilterType];
