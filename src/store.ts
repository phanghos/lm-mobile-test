import create from 'zustand';

import type { Hotel } from 'types';
import type { FilterConfig } from 'components/Filters/types';

type StoreState = {
  hotels: Hotel[];
  filters: FilterConfig;
  setHotels: (hotels: Hotel[]) => void;
  setFilters: (filters: FilterConfig) => void;
};

const useAppStore = create<StoreState>(set => ({
  hotels: [],
  filters: {},
  setHotels: hotels => set(state => ({ ...state, hotels })),
  setFilters: filters => set(state => ({ ...state, filters })),
}));

export default useAppStore;
