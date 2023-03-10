import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from 'components/Button/Button';
import HotelStars from 'components/HotelStars/HotelStars';
import useFilterHotels from 'hooks/useFilterHotels';
import useAppStore from 'store';
import {
  areFilterConfigsEqual,
  createFilters,
  findMaxValueInListByKey,
  findMinValueInListByKey,
  getActiveFiltersConfig,
  getFilterValue,
} from 'utils/filters';

import { useNavigation } from '@react-navigation/native';

import Slider from '../Slider';
import FilterItem from './FilterItem';

import type { RangeFilterType } from './types';

const MIN_USER_RATING = 0;
const MAX_USER_RATING = 10;
const INITIAL_USER_RATING: RangeFilterType = [MIN_USER_RATING, MAX_USER_RATING];

const Filters = () => {
  const { goBack, setOptions } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const filters = useAppStore(state => state.filters);
  const setFilters = useAppStore(state => state.setFilters);
  const hotels = useAppStore(state => state.hotels);

  const minPrice = useMemo(
    () => (findMinValueInListByKey(hotels, 'price') as number) ?? 0,
    [hotels],
  );
  const maxPrice = useMemo(
    () => (findMaxValueInListByKey(hotels, 'price') as number) ?? 0,
    [hotels],
  );
  const initialPriceFilter: RangeFilterType = useMemo(
    () => [minPrice, maxPrice],
    [minPrice, maxPrice],
  );

  const [localFilters, setLocalFilters] = useState(filters);
  const [name, setName] = useState(getFilterValue('name', filters) || '');
  const [stars, setStars] = useState(getFilterValue('stars', filters) || 0);
  const [userRating, setUserRating] = useState(
    getFilterValue('userRating', filters) || INITIAL_USER_RATING,
  );
  const [price, setPrice] = useState(
    getFilterValue('price', filters) || initialPriceFilter,
  );

  const localFiltersFiltered = useMemo(
    () => getActiveFiltersConfig(localFilters, hotels),
    [localFilters, hotels],
  );

  const areOldAndNewFiltersEqual = useMemo(
    () => areFilterConfigsEqual(filters, localFiltersFiltered),
    [filters, localFiltersFiltered],
  );

  const preFilteredResults = useFilterHotels(hotels, localFiltersFiltered);
  const preFilteredResultsCount = preFilteredResults.length;

  const onApplyFilters = () => {
    setFilters(localFiltersFiltered);
    goBack();
  };

  const onResetHotelNameFilter = () => setName('');

  const onResetStarFilter = () => setStars(0);

  const onResetRatingFilter = () => setUserRating(INITIAL_USER_RATING);

  const onResetPriceFilter = useCallback(
    () => setPrice(initialPriceFilter),
    [initialPriceFilter],
  );

  const onResetAllFilters = useCallback(() => {
    onResetHotelNameFilter();
    onResetStarFilter();
    onResetRatingFilter();
    onResetPriceFilter();
  }, [onResetPriceFilter]);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={onResetAllFilters}
          style={styles.headerContainer}>
          <Text style={styles.headerText}>Reset all</Text>
        </TouchableOpacity>
      ),
    });
  }, [setOptions, onResetAllFilters]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    setLocalFilters(createFilters({ name, stars, userRating, price }));
  }, [name, stars, userRating, price]);

  return (
    <>
      <View style={styles.filtersContainer}>
        <FilterItem title="Name" canReset onResetPress={onResetHotelNameFilter}>
          <TextInput
            value={getFilterValue('name', localFilters) || ''}
            placeholder="Property name"
            onChangeText={setName}
            style={styles.textInput}
          />
        </FilterItem>

        <FilterItem title="Stars" canReset onResetPress={onResetStarFilter}>
          <HotelStars
            count={getFilterValue('stars', localFilters) || 0}
            onStarPress={setStars}
          />
        </FilterItem>

        <FilterItem title="Rating" canReset onResetPress={onResetRatingFilter}>
          <Slider
            values={userRating}
            min={MIN_USER_RATING}
            max={MAX_USER_RATING}
            step={0.1}
            onValuesChange={setUserRating}
          />
        </FilterItem>

        <FilterItem title="Price" canReset onResetPress={onResetPriceFilter}>
          <Slider
            values={price}
            min={minPrice}
            max={maxPrice}
            onValuesChange={setPrice}
          />
        </FilterItem>
      </View>
      <Button
        text={`Apply (${preFilteredResultsCount})`}
        onPress={onApplyFilters}
        variant="fullWidth"
        disabled={!preFilteredResultsCount || areOldAndNewFiltersEqual}
        style={{ marginBottom: bottom }}
      />
    </>
  );
};

export default Filters;

const styles = StyleSheet.create({
  headerContainer: { marginRight: 16 },
  headerText: { color: 'white', fontWeight: '600' },
  filtersContainer: { flex: 1 },
  textInput: { fontSize: 16 },
});
