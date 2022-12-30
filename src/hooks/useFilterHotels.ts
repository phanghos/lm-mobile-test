import { useMemo } from 'react';
import useAppStore from 'store';
import type { Hotel } from 'types';
import { filterHotel } from 'utils/filters';

const useFilterHotels = (hotels: Hotel[]) => {
  const filters = useAppStore(state => state.filters);

  return useMemo(
    () =>
      hotels.filter(hotel => Object.entries(filters).every(filterHotel(hotel))),
    [hotels, filters],
  );
};

export default useFilterHotels;
