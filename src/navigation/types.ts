import type { Hotel } from 'types';

export type RootStackParamList = {
  HOTEL_LIST_SCREEN: undefined;
  HOTEL_DETAILS_SCREEN: Hotel;
  FILTER_SCREEN: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
