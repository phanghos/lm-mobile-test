import type { Hotel } from 'types';

export type FilterableKey = keyof Pick<Hotel, 'name' | 'stars'>;

type FilterValue<T extends string | number | [number, number]> = { value: T };

export type TextFilter = FilterValue<string>;
export type NumberFilter = FilterValue<number>;
export type RangeFilter = FilterValue<[number, number]>;

export type FilterType = TextFilter | NumberFilter | RangeFilter;

export type FilterConfig = Partial<Record<FilterableKey, FilterType>>;

export type FilterEntry = [FilterableKey, FilterType];
