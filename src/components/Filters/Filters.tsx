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
import useAppStore from 'store';
import HotelStars from 'components/HotelStars/HotelStars';
import FilterItem from './FilterItem';
import { numberFilter, rangeFilter, textFilter } from 'utils/filters';
import Button from 'components/Button/Button';

const Filters = () => {
  const { goBack, setOptions } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const filters = useAppStore(state => state.filters);
  const addFilter = useAppStore(state => state.addFilter);

  const [name, setName] = useState<string>();
  const [starsCount, setStarsCount] = useState<number>();

  useEffect(() => {
    setName(filters.name?.value as string);
    setStarsCount(filters.stars?.value as number);
  }, [filters.name, filters.stars]);

  const onApplyFilters = () => {
    !!name && addFilter(textFilter(name), 'name');
    !!starsCount && addFilter(numberFilter(starsCount), 'stars');

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
      <Button
        text="Apply"
        onPress={onApplyFilters}
        variant="fullWidth"
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
