import { useMemo } from 'react';
import { filterHotels } from 'utils/filters';

import type { Hotel } from 'types';
import type { FilterConfig } from 'components/Filters/types';

const useFilterHotels = (hotels: Hotel[], filters: FilterConfig) =>
  useMemo(() => filterHotels(hotels, filters), [hotels, filters]);

export default useFilterHotels;
