import { useMemo } from 'react';
import type { Hotel } from 'types';
import type { FilterConfig, FilterEntry } from 'components/Filters/types';
import { filterHotel } from 'utils/filters';

const useFilterHotels = (hotels: Hotel[], filters: FilterConfig) =>
  useMemo(
    () =>
      hotels.filter(hotel =>
        (Object.entries(filters) as FilterEntry[]).every(filterHotel(hotel)),
      ),
    [hotels, filters],
  );

export default useFilterHotels;
