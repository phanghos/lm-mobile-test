import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAppStore from 'store';
import {
  areFilterConfigsEqual,
  getFilterValue,
  getNewFilteredConfig,
  numberFilter,
  textFilter,
} from 'utils/filters';
import useFilterHotels from 'hooks/useFilterHotels';
import HotelStars from 'components/HotelStars/HotelStars';
import Button from 'components/Button/Button';
import FilterItem from './FilterItem';

const Filters = () => {
  const { goBack, setOptions } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const filters = useAppStore(state => state.filters);
  const setFilters = useAppStore(state => state.setFilters);
  const hotels = useAppStore(state => state.hotels);

  const [localFilters, setLocalFilters] = useState(filters);
  const [name, setName] = useState(getFilterValue('name', filters) || '');
  const [stars, setStars] = useState(getFilterValue('stars', filters) || 0);

  const localFiltersFiltered = useMemo(
    () => getNewFilteredConfig(localFilters),
    [localFilters],
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

  const onResetAllFilters = useCallback(() => {
    onResetHotelNameFilter();
    onResetStarFilter();
  }, []);

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
    setLocalFilters({
      name: textFilter(name),
      stars: numberFilter(stars),
    });
  }, [name, stars]);

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
