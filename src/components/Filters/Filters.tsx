import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAppStore from 'store';
import {
  getFilterValue,
  getNewFilteredConfig,
  numberFilter,
  textFilter,
} from 'utils/filters';
import useFilterHotels from 'hooks/useFilterHotels';
import HotelStars from 'components/HotelStars/HotelStars';
import Button from 'components/Button/Button';
import FilterItem from './FilterItem';
import { FilterConfig } from './types';

const Filters = () => {
  const { goBack } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const filters = useAppStore(state => state.filters);
  const setFilters = useAppStore(state => state.setFilters);
  const removeFilter = useAppStore(state => state.removeFilter);
  const hotels = useAppStore(state => state.hotels);

  const [localFilters, setLocalFilters] = useState<FilterConfig>(filters);
  const [name, setName] = useState(getFilterValue('name', filters) || '');
  const [stars, setStars] = useState(getFilterValue('stars', filters) || 0);

  const preFilteredResults = useFilterHotels(hotels, localFilters);
  const preFilteredResultsCount = preFilteredResults.length;

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    setLocalFilters({
      name: textFilter(name),
      stars: numberFilter(stars),
    });
  }, [name, stars]);

  const onApplyFilters = () => {
    setFilters(getNewFilteredConfig(localFilters));
    goBack();
  };

  const onResetHotelNameFilter = () => removeFilter('name');

  const onResetStarFilter = () => removeFilter('stars');

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
        disabled={!preFilteredResultsCount}
        style={{ marginBottom: bottom }}
      />
    </>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filtersContainer: { flex: 1 },
  textInput: { fontSize: 16 },
});
