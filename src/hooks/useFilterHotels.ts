import { useMemo } from 'react';
import useAppStore from 'store';
import type { Hotel } from 'types';
import type { FilterConfig } from 'components/Filters/types';
import { filterHotel } from 'utils/filters';

const useFilterHotels = (hotels: Hotel[], filters?: FilterConfig) => {
  const filtersInStore = useAppStore(state => state.filters);

  return useMemo(
    () =>
      hotels.filter(hotel =>
        Object.entries(filters || filtersInStore).every(filterHotel(hotel)),
      ),
    [hotels, filters, filtersInStore],
  );
};

export default useFilterHotels;
