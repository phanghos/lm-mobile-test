import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Filters from 'components/Filters/Filters';
import useAppStore from 'store';

const FilterScreen = () => {
  const { setOptions } = useNavigation();
  const resetFilters = useAppStore(state => state.resetFilters);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={resetFilters} style={{ marginRight: 16 }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Reset all</Text>
        </TouchableOpacity>
      ),
    });
  }, [setOptions, resetFilters]);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#F8F1FF' }}>
      <Filters />
    </View>
  );
};

export default FilterScreen;
