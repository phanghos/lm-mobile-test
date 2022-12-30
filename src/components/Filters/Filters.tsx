import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Hotel } from 'types';
import useAppStore from 'store';
import HotelStars from 'components/HotelStars/HotelStars';
import FilterItem from './FilterItem';
import { numberFilter, rangeFilter, textFilter } from 'utils/filters';

const Filters = () => {
  const { goBack, setOptions } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const filters = useAppStore(state => state.filters);
  const addFilter = useAppStore(state => state.addFilter);
  const removeFilter = useAppStore(state => state.removeFilter);

  const [name, setName] = useState<string>();
  const [starsCount, setStarsCount] = useState<number>();
  const [priceRange, setPriceRange] = useState<[number, number]>();

  useEffect(() => {
    setName(filters.name?.value as string);
    setStarsCount(filters.stars?.value as number);
  }, [filters.name, filters.stars]);

  const onApplyFilters = () => {
    !!name && addFilter(textFilter(name), 'name');
    !!starsCount && addFilter(numberFilter(starsCount), 'stars');
    // !!priceRange && addFilter(rangeFilter(priceRange), 'price');

    goBack();
  };

  return (
    <>
      <View style={styles.filtersContainer}>
        <FilterItem title={'Name'}>
          <TextInput
            value={name}
            placeholder="Property name"
            onChangeText={setName}
            style={styles.textInput}
          />
        </FilterItem>
        <FilterItem title="Stars">
          <HotelStars count={starsCount || 0} onStarPress={setStarsCount} />
        </FilterItem>
      </View>
      <TouchableOpacity
        onPress={onApplyFilters}
        style={[styles.applyButtonContainer, { marginBottom: bottom }]}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </>
  );
};

export default Filters;

const styles = StyleSheet.create({
  filtersContainer: { flex: 1 },
  textInput: { fontSize: 16 },
  applyButtonContainer: {
    width: '100%',
    padding: 12,
    backgroundColor: '#D8315B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
