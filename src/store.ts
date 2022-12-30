import create from 'zustand';
import type { Hotel } from 'types';
import type { FilterType } from 'components/Filters/types';

type StoreState = {
  filters: Record<string, FilterType>;
  addFilter: (filter: FilterType, name: keyof Hotel) => void;
  removeFilter: (name: keyof Hotel) => void;
  resetFilters: () => void;
};

const useAppStore = create<StoreState>(set => ({
  filters: {},
  addFilter: (filter, name) =>
    set(({ filters }) => ({ filters: { ...filters, [name]: filter } })),
  removeFilter: name =>
    set(state => {
      // eslint-disable-next-line curly
      if (!state.filters[name]) return state;
      const { [name]: _, ...restFilters } = state.filters;
      return { filters: restFilters };
    }),
  resetFilters: () => set(_ => ({ filters: {} })),
}));

export default useAppStore;
