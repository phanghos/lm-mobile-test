import type {
  FilterableKey,
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

    // eslint-disable-next-line curly
    if (value === undefined) return false;

    if (typeof filter.value === 'string') {
      return `${value}`
        .toLocaleLowerCase()
        .includes(filter.value.toLowerCase());
    } else if (typeof filter.value === 'number') {
      return +value === filter.value;
    } else if (typeof filter.value === 'object') {
      const [min, max] = filter.value;
      return +value >= min && +value <= max;
    }

    return false;
  };
