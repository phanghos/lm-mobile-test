import type { Hotel } from 'types';

type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

export type FilterKeyValueTypeMap = {
  name: string;
  stars: number;
  userRating: RangeFilterType;
  price: RangeFilterType;
};

export type FilterableKey = keyof Pick<Hotel, keyof FilterKeyValueTypeMap>;

export type NumericFilterKey = keyof PickByType<
  Pick<Hotel, FilterableKey>,
  number
>;

type FilterValue<T extends string | number | RangeFilterType> = { value: T };

export type RangeFilterType = [number, number];

export type TextFilter = FilterValue<string>;
export type NumberFilter = FilterValue<number>;
export type RangeFilter = FilterValue<RangeFilterType>;

export type FilterType = TextFilter | NumberFilter | RangeFilter;

export type FilterConfig = Partial<Record<FilterableKey, FilterType>>;

export type FilterEntry = [FilterableKey, FilterType];
