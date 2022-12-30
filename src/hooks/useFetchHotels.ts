import { useCallback, useEffect, useState } from 'react';
import useAppStore from 'store';
import type { HotelResponse } from 'types';

const useFetchHotels = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const hotels = useAppStore(state => state.hotels);
  const setHotels = useAppStore(state => state.setHotels);

  const getHotels = useCallback(async () => {
    setHasError(false);
    setIsLoading(true);

    try {
      const res: HotelResponse = await (
        await fetch(
          'https://run.mocky.io/v3/eef3c24d-5bfd-4881-9af7-0b404ce09507',
        )
      ).json();

      setHotels(res);
    } catch (e) {
      console.error(e);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [setHotels]);

  useEffect(() => {
    getHotels();
  }, [getHotels]);

  return { isLoading, hotels, hasError, refetch: getHotels };
};

export default useFetchHotels;
