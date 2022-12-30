type ScreenNameMap = Record<string, `${Uppercase<string>}_SCREEN`>;

export const Screen = {
  HotelList: 'HOTEL_LIST_SCREEN',
  HotelDetails: 'HOTEL_DETAILS_SCREEN',
  Filter: 'FILTER_SCREEN',
} as const satisfies ScreenNameMap;
